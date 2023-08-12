import { connectMongoDB } from "@/lib/mongodb";
import UserFlashcardRelation from "@/models/userFlashcard";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import organizeFlashcardArray from "./organizeFlashcardArray";

export async function getStarredFlashcards() {
  console.log("getUserStarredFlashcards is called");

  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    console.log("11111 getStarred", session, userId);

    // Fetch flashcards that the user has starred
    const starredRelations = await UserFlashcardRelation.find({
      user: userId,
      starred: true,
    }).populate({
      path: "flashcard",
      model: "Flashcard",
      select: ["question", "answer", "_id"],
    });

    // Extract flashcards from the relations and merge the UserFlashcardRelation data
    let starredFlashcards = starredRelations.map((relation) => {
      const flashcard = relation.flashcard;
      return {
        ...flashcard._doc,
        isMastered: relation.isMastered,
        starred: relation.starred,
      };
    });

    starredFlashcards = organizeFlashcardArray(starredFlashcards);

    return NextResponse.json(starredFlashcards, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch starred flashcards" },
      { status: 500 }
    );
  }
}
