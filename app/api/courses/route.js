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

    // Extract courses from user object
    const userCourses = user.courses;

    return new Response(JSON.stringify(userCourses), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
