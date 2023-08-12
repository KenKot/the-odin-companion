import { connectMongoDB } from "@/lib/mongodb";
import Course from "@/models/course";
import User from "@/models/user";
import UserFlashcardRelation from "@/models/userFlashcard"; // Assuming this is the model for UserFlashcardRelation schema
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function getLessons(courseId) {
  console.log("getLessons is called");
  // imitate delay
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    // const courseId = params.id;

    // Fetch the course with populated lessons
    const course = await Course.findById(courseId).populate("lessons").exec();

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    // Fetch all mastered flashcards for the user
    const masteredFlashcards = await UserFlashcardRelation.find({
      user: userId,
      isMastered: true,
    });

    const masteredFlashcardIds = masteredFlashcards.map((rel) =>
      rel.flashcard.toString()
    );

    // Calculate statistics for each lesson
    const lessonsWithStats = course.lessons.map((lesson) => {
      const masteredCount = lesson.flashcards.filter((flashcard) =>
        masteredFlashcardIds.includes(flashcard._id.toString())
      ).length;
      return {
        ...lesson._doc,
        masteredFlashcards: masteredCount,
      };
    });

    // Return the course with lessons containing flashcard statistics
    return {
      ...course._doc,
      lessons: lessonsWithStats,
    };

    // return NextResponse.json(
    //   {
    //     ...course._doc,
    //     lessons: lessonsWithStats,
    //   },
    //   { status: 200 }
    // );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch course details" },
      { status: 500 }
    );
  }
}
