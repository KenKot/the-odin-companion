import { connectMongoDB } from "@/lib/mongodb";
import UserFlashcardRelation from "@/models/userFlashcard"; // Assuming this is the model for UserFlashcardRelation schema
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function getStarredFlashcards() {
  console.log("getUserStarredFlashcards is called");

  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    // return [];
    // Fetch flashcards that the user has starred
    const starredFlashcards = await UserFlashcardRelation.find({
      user: userId,
      starred: true,
    }).populate("flashcard"); // Assuming you want full flashcard details and not just the relation. Remove if not necessary.

    // Return the array of starred flashcards
    return starredFlashcards;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch starred flashcards" },
      { status: 500 }
    );
  }
}
