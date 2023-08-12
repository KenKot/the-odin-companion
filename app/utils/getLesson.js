import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Lesson from "@/models/lesson";
import Course from "@/models/course";
import Flashcard from "@/models/flashcard";
import UserFlashcardRelation from "@/models/userFlashcard";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import organizeFlashcardArray from "./organizeFlashcardArray";

export async function getLesson(lessonId) {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    // const lessonId = params.id;

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

    // sort flashcards so 'mastered' cards are at the end

    // Sorting the flashcards directly after data fetching
    // let tempUnmasteredCards = []; //to be shuffled
    // let tempMasteredCards = [];

    // flashcardsWithUserData.forEach((card) => {
    //   if (card.isMastered) {
    //     tempMasteredCards.push(card);
    //   } else {
    //     tempUnmasteredCards.push(card);
    //   }
    // });

    // tempUnmasteredCards = shuffleArray(tempUnmasteredCards);
    // tempMasteredCards = shuffleArray(tempMasteredCards);

    // const rejoinedCards = tempUnmasteredCards.concat(tempMasteredCards);

    const organizedCards = organizeFlashcardArray(flashcardsWithUserData);

    return NextResponse.json({
      title: lesson.title,
      flashcards: organizedCards,
    });
  } catch (error) {
    console.error("GET Lesson Error:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to fetch lesson. Internal Server Error." },
      { status: 500 }
    );
  }
}
