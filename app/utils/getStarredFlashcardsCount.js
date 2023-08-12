import { connectMongoDB } from "@/lib/mongodb";
import UserFlashcardRelation from "@/models/userFlashcard"; // Assuming this is the model for UserFlashcardRelation schema
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function getStarredFlashcardsCount() {
  console.log("getStarredFlashcardsCount is called");

  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    // Fetch flashcards that the user has starred
    const starredFlashcards = await UserFlashcardRelation.find({
      user: userId,
      starred: true,
    });

    // Return the count of starred flashcards

    return starredFlashcards.length;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch starred flashcards count" },
      { status: 500 }
    );
  }
}
