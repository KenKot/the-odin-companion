// // ASYNC F(X) ISNT FOR CLIENT COMPONENTS
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

//this f(x) should be in a /utils folder
export default async function getCourses() {
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

    // Extract courses from user object
    const userCourses = user.courses;
    let coursesInfo = []; //data to return. Holds course names + statistics

    userCourses.forEach((course) => {
      let lessons = course.lessons;

      let courseInfo = {
        _id: course._id.toString(),
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
    // return NextResponse.json(coursesInfo, { status: 201 });
    return coursesInfo;
  } catch (error) {
    console.log("COURSES API ERROR!!!");
    return NextResponse.json(
      { message: "Failed to fetch all courses" },
      { status: 500 }
    );
  }
  // const session = await getServerSession(authOptions); //only works when page.js has "use client"?
  // const userId = session.user.id;

  // const res = await fetch("http://localhost:3000/api/courses", {
  //   cache: "no-cache",
  //   cache: "no-store",
  // });

  // if (!res.ok) {
  //   throw new Error("failed to fetch courses");
  // }
  // console.log(res.body);
  // const courses = await res.json();
  // return courses;
}
