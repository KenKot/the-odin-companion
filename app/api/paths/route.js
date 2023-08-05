import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Course from "@/models/course";

import Path from "@/models/path";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    const user = await User.findById(userId).populate({
      path: "paths",
      model: "Path",
      populate: {
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
      },
    });

    const userPaths = user.paths;
    let pathsInfo = [];

    userPaths.forEach((path) => {
      let pathInfo = {
        _id: path._id.toString(),
        title: path.title,
        totalCourses: path.courses.length,
        completedFlashcards: 0,
        totalFlashcards: 0,
      };

      path.courses.forEach((course) => {
        course.lessons.forEach((lesson) => {
          lesson.flashcards.forEach((flashcard) => {
            pathInfo.totalFlashcards++;
            if (flashcard.isMastered) {
              pathInfo.completedFlashcards++;
            }
          });
        });
      });

      pathsInfo.push(pathInfo);
    });

    return NextResponse.json(pathsInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all paths" },
      { status: 500 }
    );
  }
};
