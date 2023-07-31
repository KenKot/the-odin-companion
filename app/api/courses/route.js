import { connectMongoDB } from "@/lib/mongodb";
import Course from "@/models/course";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (request) => {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    const user = await User.findById(userId).populate({
      path: "courses",
      model: "Course",
      populate: {
        path: "lessons",
        model: "Lesson",
        populate: {
          path: "flashcards",
          model: "Flashcard",
        },
      },
    });

    // console.log("user=", user);

    // Extract courses from user object
    const userCourses = user.courses;
    let coursesInfo = []; //data to return. Holds course names + statistics

    userCourses.forEach((course) => {
      let lessons = course.lessons;

      let courseInfo = {
        title: course.title,
        totalLessons: lessons.length,
        completedFlashcards: 0,
        totalFlashcards: 0,
      }; // this is the data that pushes onto courseInfo[], to eventually return to user

      lessons.forEach((lesson) => {
        lesson.flashcards.forEach((flashcard) => {
          courseInfo.totalFlashcards++;
          if (flashcard.isMastered) {
            courseInfo.completedFlashcards++;
          }
        });
      });

      coursesInfo.push(courseInfo);
    });

    // console.log("!!!", coursesInfo);

    return new Response(JSON.stringify(coursesInfo), { status: 200 }); // Changed 'userCourses' to 'coursesInfo'

    // return new Response(JSON.stringify(userCourses), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
