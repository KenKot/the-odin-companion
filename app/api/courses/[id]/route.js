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

    const user = await User.findById(userId).populate({
      path: "paths",
      model: "Path",
    });

    if (!user) {
      console.log("USER NOT FOUND");
      return new Response("User not found", { status: 404 });
    }

    let course;

    for (let path of user.paths) {
      course = path.courses.find(
        (course) => course._id.toString() === courseId
      );
      if (course) break;
    }

    if (!course) {
      return new Response("Course not found", { status: 404 });
    }

    course = await Course.findById(courseId).populate({
      path: "lessons",
      model: "Lesson",
      populate: {
        path: "flashcards",
        model: "Flashcard",
      },
    });

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
