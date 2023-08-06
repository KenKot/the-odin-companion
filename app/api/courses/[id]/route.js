import { connectMongoDB } from "@/lib/mongodb";
import Course from "@/models/course";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    let courseId = params.id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Fetch the course and check if it exists
    const course = await Course.findOne({
      _id: { $in: user.courses, $eq: courseId },
    }).populate({
      path: "lessons",
      model: "Lesson",
      populate: {
        path: "flashcards",
        model: "Flashcard",
      },
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const courseWithMasteredFlashcards = {
      ...course._doc,
      lessons: course.lessons.map((lesson) => ({
        ...lesson._doc,
        masteredFlashcards: lesson.flashcards.filter(
          (flashcard) => flashcard.isMastered
        ).length,
      })),
    };
    return NextResponse.json(courseWithMasteredFlashcards, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch courseWithMasteredFlashcards" },
      { status: 500 }
    );
  }
};
