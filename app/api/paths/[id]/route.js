import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Path from "@/models/path";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    let pathId = params.id;

    const user = await User.findById(userId);
    if (!user) {
      console.log("USER NOT FOUND");
      return new Response("User not found", { status: 404 });
    }

    const path = await Path.findOne({
      _id: { $in: user.paths, $eq: pathId },
    }).populate({
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

    if (!path) {
      return new Response("Path not found", { status: 404 });
    }

    const pathWithMasteredFlashcards = {
      ...path._doc,
      courses: path.courses.map((course) => ({
        ...course._doc,
        masteredFlashcards: course.lessons
          .flatMap((lesson) => lesson.flashcards)
          .filter((flashcard) => flashcard.isMastered).length,
        totalFlashcards: course.lessons.flatMap((lesson) => lesson.flashcards)
          .length,
      })),
    };

    return NextResponse.json(pathWithMasteredFlashcards, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch path" },
      { status: 500 }
    );
  }
};
