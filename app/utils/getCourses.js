// // ASYNC F(X) ISNT FOR CLIENT COMPONENTS
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import UserFlashcard from "@/models/userFlashcard";
import Course from "@/models/course";
import Flashcard from "@/models/flashcard";
import { getServerSession } from "next-auth/next";

//this f(x) should be in a /utils folder
export async function getCourses() {
  console.log("getCourses ran");
  // imitate delay
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);

    const userId = session.user.id;

    // Fetch the user's flashcard relations
    const userFlashcards = await UserFlashcard.find({ user: userId }).populate(
      "flashcard"
    );

    // Create a map of mastered flashcards for easy checking
    const masteredFlashcards = {};
    userFlashcards.forEach((relation) => {
      if (relation.isMastered) {
        masteredFlashcards[relation.flashcard._id.toString()] = true;
      }
    });

    // Fetch all courses, lessons, and flashcards
    const allCourses = await Course.find({}).populate({
      path: "lessons",
      populate: {
        path: "flashcards",
      },
    });

    let coursesInfo = [];

    allCourses.forEach((course) => {
      let lessons = course.lessons;

      let courseInfo = {
        _id: course._id.toString(),
        title: course.title,
        totalLessons: lessons.length,
        completedFlashcards: 0,
        totalFlashcards: 0,
        completedLessons: 0, // Initialize completedLessons count
      };

      lessons.forEach((lesson) => {
        let isLessonComplete = true; // Flag to determine if lesson is complete

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

    return coursesInfo;
  } catch (error) {
    console.log("COURSES API ERROR!!!");
    return NextResponse.json(
      { message: "Failed to fetch all courses" },
      { status: 500 }
    );
  }
}
