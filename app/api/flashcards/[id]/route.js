import { connectMongoDB } from "@/lib/mongodb";
import UserFlashcardRelation from "@/models/userFlashcard";
import Flashcard from "@/models/flashcard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    let flashcardId = params.id;

    // Find the UserFlashcardRelation for the given user and flashcard
    let userFlashcard = await UserFlashcardRelation.findOne({
      user: userId,
      flashcard: flashcardId,
    });

    if (!userFlashcard) {
      return NextResponse.json(
        { message: "UserFlashcardRelation not found." },
        { status: 404 }
      );
    }

    // Toggle the isMastered property
    userFlashcard.isMastered = !userFlashcard.isMastered;

    // Save the updated UserFlashcardRelation
    await userFlashcard.save();

    // Fetch the actual flashcard
    const flashcard = await Flashcard.findById(flashcardId).select([
      "question",
      "answer",
      "_id",
    ]);
    if (!flashcard) {
      return NextResponse.json(
        { message: "Flashcard not found." },
        { status: 404 }
      );
    }

    // Merge the UserFlashcardRelation's isMastered attribute into the flashcard
    const flashcardWithUserData = {
      ...flashcard._doc,
      isMastered: userFlashcard.isMastered,
    };

    return NextResponse.json(flashcardWithUserData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update flashcard" },
      { status: 500 }
    );
  }
};
