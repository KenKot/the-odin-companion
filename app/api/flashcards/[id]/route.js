import { connectMongoDB } from "@/lib/mongodb";
import Flashcard from "@/models/flashcard";
import UserFlashcardRelation from "@/models/userFlashcard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  console.log("/flashcards/id fired");
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const flashcardId = params.id;

    const { property } = await request.json();

    // Validate provided property
    const validProperties = ["isMastered", "starred"];
    if (!validProperties.includes(property)) {
      return NextResponse.json(
        { message: "Invalid property provided" },
        { status: 400 }
      );
    }

    // Find or create the UserFlashcardRelation for the given user and flashcard
    let userFlashcard = await UserFlashcardRelation.findOne({
      user: userId,
      flashcard: flashcardId,
    });

    if (!userFlashcard) {
      userFlashcard = new UserFlashcardRelation({
        user: userId,
        flashcard: flashcardId,
        isMastered: false,
        starred: false,
      });
    }

    // Toggle the provided property
    userFlashcard[property] = !userFlashcard[property];

    // Save the changes
    await userFlashcard.save();

    // Fetch the corresponding flashcard
    const flashcard = await Flashcard.findById(flashcardId);
    if (!flashcard) {
      return NextResponse.json(
        { message: "Flashcard not found." },
        { status: 404 }
      );
    }

    // Merge UserFlashcardRelation data with the flashcard data
    const mergedFlashcard = {
      ...flashcard._doc,
      isMastered: userFlashcard.isMastered,
      starred: userFlashcard.starred,
    };

    // Return the merged flashcard object
    return NextResponse.json(mergedFlashcard, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update flashcard's property" },
      { status: 500 }
    );
  }
};
