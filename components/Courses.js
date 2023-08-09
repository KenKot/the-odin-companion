// // ASYNC F(X) ISNT FOR CLIENT COMPONENTS
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

//this f(x) should be in a /utils folder
async function getCourses(session) {
  try {
    await connectMongoDB();

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
    let coursesInfo = [];

    userCourses.forEach((course) => {
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
          if (flashcard.isMastered) {
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

export default async function Courses({ session }) {
  const courses = await getCourses(session);

  return (
    <div>
      <h1 className="text-3xl text-center">Courses</h1>
      {courses?.map((course, index) => (
        <Link key={index} href={`/courses/${course._id}`} passHref>
          <div className="border-2 border-white m-2 p-2 cursor-pointer rounded">
            <h2>{course.title}</h2>
            {/* <p>Total Lessons: {course.totalLessons}</p>
            <p>Completed Lessons: {course.completedLessons}</p> */}
            <p>
              {course.completedLessons}/{course.totalLessons} Lessons Completed
            </p>
            <p>
              {course.completedFlashcards}/{course.totalFlashcards} Flashcards
              Completed
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
