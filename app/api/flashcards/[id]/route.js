import { connectMongoDB } from "@/lib/mongodb";
import Flashcard from "@/models/flashcard";
import Lesson from "@/models/lesson";
import Course from "@/models/course";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    let flashcardId = params.id;

    const flashcard = await Flashcard.findById(flashcardId);

    if (!flashcard) {
      return NextResponse.json(
        { message: "Flashcard not found" },
        { status: 404 }
      );
    }

    // Find the lesson containing the flashcard.
    const lesson = await Lesson.findOne({ flashcards: flashcardId });
    if (!lesson) {
      return NextResponse.json(
        { message: "Lesson not found" },
        { status: 404 }
      );
    }

    // Fetch the user
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the user has a course that includes the lesson of the flashcard.
    const userOwnsFlashcard = user.courses.some(async (courseId) => {
      const course = await Course.findById(courseId);
      return course.lessons.includes(lesson._id);
    });

    if (!userOwnsFlashcard) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Toggle isMastered field.
    flashcard.isMastered = !flashcard.isMastered;

    // Save the updated flashcard.
    await flashcard.save();
    return NextResponse.json(flashcard, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update flashcard" },
      { status: 500 }
    );
  }
};
