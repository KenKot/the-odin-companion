import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Lesson from "@/models/lesson";
import Path from "@/models/path";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const lessonId = params.id;

    // Fetch the lesson using its id and populate flashcards
    const lesson = await Lesson.findById(lessonId).populate("flashcards");

    if (!lesson) {
      return new Response("Lesson not found", { status: 404 });
    }

    // Fetch the user
    const user = await User.findById(userId).populate({
      path: "paths",
      model: "Path",
      populate: {
        path: "courses",
        model: "Course",
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Check if the lesson belongs to one of the user's courses in a path
    let lessonExists = false;
    for (let path of user.paths) {
      for (let course of path.courses) {
        if (course.lessons.includes(lessonId)) {
          lessonExists = true;
          break;
        }
      }
      if (lessonExists) break;
    }

    if (!lessonExists) {
      return new Response("User does not have access to this lesson", {
        status: 403,
      });
    }

    return NextResponse.json(lesson, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch lesson " },
      { status: 500 }
    );
  }
};
