import { connectMongoDB } from "@/lib/mongodb";
import UserFlashcardRelation from "@/models/userFlashcard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    let flashcardId = params.id;

    console.log("flashcardId", flashcardId);
    console.log("userId", userId);

    // Find the UserFlashcardRelation for the given user and flashcard
    let userFlashcard = await UserFlashcardRelation.findOne({
      user: userId,
      flashcard: flashcardId,
    });

    // If the relation does not exist, create a new one
    if (!userFlashcard) {
      userFlashcard = new UserFlashcardRelation({
        user: userId,
        flashcard: flashcardId,
        isMastered: false,
      });
    }

    // Toggle the isMastered property
    userFlashcard.isMastered = !userFlashcard.isMastered;

    // Save the updated UserFlashcardRelation
    await userFlashcard.save();

    return NextResponse.json(userFlashcard, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update flashcard" },
      { status: 500 }
    );
  }
};
