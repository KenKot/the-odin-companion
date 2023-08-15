import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import Course from "@/models/course";
import Flashcard from "@/models/flashcard";
import { getServerSession } from "next-auth/next";
import UserFlashcard from "@/models/userFlashcard"; // Assuming this is the model for UserFlashcardRelation schema

import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
  console.log("/courses/page.js ran");
  console.log("getCourses ran");
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);

    const userId = session.user.id;

    console.log("+++++++++++++++");
    console.log(session, userId);
    console.log("+++++++++++++++");

    // Fetch the user's flashcard relations
    const userFlashcards = await UserFlashcard.find({ user: userId }).populate(
      "flashcard"
    );

    // Count the user's starred flashcards
    const starredFlashcardsCount = await UserFlashcard.find({
      user: userId,
      starred: true,
    }).countDocuments();

    console.log("Number of starred flashcards: ", starredFlashcardsCount);

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
    console.log("!!!!!!!!!!!!!11");
    console.log("coursesInfo", coursesInfo);
    console.log("!!!!!!!!!!!!!11");

    // Include starredFlashcardsCount in the NextResponse.json output
    return NextResponse.json(
      { coursesInfo, starredFlashcardsCount },
      { status: 201 }
    );
  } catch (error) {
    console.log("COURSES API ERROR!!!");
    return NextResponse.json(
      { message: "Failed to fetch all courses" },
      { status: 500 }
    );
  }
};
