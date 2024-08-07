import { connectMongoDB } from "@/lib/mongodb";
import Lesson from "@/models/lesson";
import UserFlashcardRelation from "@/models/userFlashcard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import organizeFlashcardArray from "@/app/utils/organizeFlashcardArray";

export const GET = async (request, { params }) => {
  console.log("/lessons/:id fired");
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

    const organizedCards = organizeFlashcardArray(flashcardsWithUserData);

    return NextResponse.json({
      title: lesson.title,
      flashcards: organizedCards,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch lesson. Internal Server Error." },
      { status: 500 }
    );
  }
};
