import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Course from "@/models/course";
import { getServerSession } from "next-auth/next";
import UserFlashcard from "@/models/userFlashcard";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    // Fetch the user's flashcard relations
    const userFlashcards = await UserFlashcard.find({ user: userId }).populate(
      "flashcard"
    );

    let starredFlashcardsCount = 0;
    userFlashcards.forEach((userFlashcard) => {
      if (userFlashcard.starred) starredFlashcardsCount++;
    });

    // Create a map of mastered flashcards for easy checking
    const masteredFlashcards = {};
    userFlashcards.forEach((relation) => {
      if (relation.isMastered) {
        masteredFlashcards[relation.flashcard._id.toString()] = true;
      }
    });

    // Fetch all courses, lessons, and flashcards
    let coursesInfo = [];

    const allCourses = await Course.find({}).populate({
      path: "lessons",
      populate: {
        path: "flashcards",
      },
    });

    allCourses.forEach((course) => {
      let lessons = course.lessons;

      let courseInfo = {
        _id: course._id.toString(),
        title: course.title,
        totalLessons: lessons.length,
        completedFlashcards: 0,
        totalFlashcards: 0,
        completedLessons: 0,
      };

      lessons.forEach((lesson) => {
        let isLessonComplete = true;

        lesson.flashcards.forEach((flashcard) => {
          courseInfo.totalFlashcards++;
          if (masteredFlashcards[flashcard._id.toString()]) {
            courseInfo.completedFlashcards++;
          } else {
            isLessonComplete = false; // If a single flashcard is not mastered, the lesson is not complete
          }
        });

        if (isLessonComplete) {
          courseInfo.completedLessons++;
        }
      });

      coursesInfo.push(courseInfo);
    });

    return NextResponse.json(
      { coursesInfo, starredFlashcardsCount },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all courses" },
      { status: 500 }
    );
  }
};
