import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
  console.log("/courses/page.js ran");
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions); //only works when page.js has "use client"?
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
    return NextResponse.json(coursesInfo, { status: 201 });
  } catch (error) {
    console.log("COURSES API ERROR!!!");
    return NextResponse.json(
      { message: "Failed to fetch all courses" },
      { status: 500 }
    );
  }
};
