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

    // let urlCourseIdArray = request.url.split("/");
    // let courseId = urlCourseIdArray[urlCourseIdArray.length - 1];

    let courseId = params.id;

    const user = await User.findById(userId);

    if (!user) {
      console.log("USER NOT FOUND");
      return new Response("User not found", { status: 404 });
    }

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
      return new Response("Course not found", { status: 404 });
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
    return NextResponse.json(courseWithMasteredFlashcards, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch courseWithMasteredFlashcards" },
      { status: 500 }
    );
  }
};
