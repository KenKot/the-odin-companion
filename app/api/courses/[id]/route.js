import { connectMongoDB } from "@/lib/mongodb";
import Course from "@/models/course";
import UserFlashcard from "@/models/userFlashcard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  console.log("/courses/:id fired");
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const courseId = params.id;

    // Fetch the course with populated lessons
    const course = await Course.findById(courseId).populate("lessons").exec();

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    // Fetch all mastered flashcards for the user
    const masteredFlashcards = await UserFlashcard.find({
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

    return NextResponse.json(
      {
        ...course._doc,
        lessons: lessonsWithStats,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch course details" },
      { status: 500 }
    );
  }
};
