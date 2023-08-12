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

    // Return the updated property state
    return NextResponse.json(
      {
        message: `${property} updated successfully.`,
        [property]: userFlashcard[property],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH Flashcard Relation Error:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to update flashcard's property" },
      { status: 500 }
    );
  }
};
