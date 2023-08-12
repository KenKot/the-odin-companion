import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Lesson from "@/models/lesson";
import Course from "@/models/course";
import Flashcard from "@/models/flashcard";
import UserFlashcardRelation from "@/models/userFlashcard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const lessonId = params.id;

    const lesson = await Lesson.findById(lessonId)
      .populate({
        path: "flashcards",
        model: "Flashcard",
        select: ["question", "answer", "_id"],
      })
      .exec();

    if (!lesson) {
      return NextResponse.json(
        { message: "Lesson not found." },
        { status: 404 }
      );
    }

    // Merge UserFlashcardRelation data into flashcards
    // Merge UserFlashcardRelation data into flashcards
    const flashcardsWithUserData = await Promise.all(
      lesson.flashcards.map(async (flashcard) => {
        const userFlashcard = await UserFlashcardRelation.findOne({
          user: userId,
          flashcard: flashcard._id,
        });

        return {
          ...flashcard._doc,
          isMastered: userFlashcard
            ? userFlashcard.isMastered
            : flashcard.isMastered,
          starred: userFlashcard ? userFlashcard.starred : false, // Adding the starred property
        };
      })
    );

    return NextResponse.json({
      title: lesson.title,
      flashcards: flashcardsWithUserData,
    });
  } catch (error) {
    console.error("GET Lesson Error:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to fetch lesson. Internal Server Error." },
      { status: 500 }
    );
  }
};
