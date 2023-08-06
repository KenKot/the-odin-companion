import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Lesson from "@/models/lesson";
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

    // Fetch the user
    const user = await User.findById(userId).populate("courses");

    // Check if the lesson belongs to one of the user's courses
    const lessonExists =
      user && user.courses.some((course) => course.lessons.includes(lessonId));

    if (!lesson || !user || !lessonExists) {
      return new Response("Access denied", { status: 403 });
    }

    return NextResponse.json(lesson, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch lesson " },
      { status: 500 }
    );
  }
};
