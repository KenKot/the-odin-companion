import { connectMongoDB } from "@/lib/mongodb";
import Course from "@/models/course";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export const GET = async (request) => {
  try {
    await connectMongoDB();

    const user = await User.findById("64c1d335ce614842596daeef").populate({
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
