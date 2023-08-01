import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Lesson from "@/models/lesson";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

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
    const user = await User.findById(userId).populate("courses");

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Check if the lesson belongs to one of the user's courses
    let lessonExists = user.courses.some((course) =>
      course.lessons.includes(lessonId)
    );

    if (!lessonExists) {
      return new Response("User does not have access to this lesson", {
        status: 403,
      });
    }

    return new Response(JSON.stringify(lesson), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch lesson: ", error);
    return new Response("Failed to fetch lesson", { status: 500 });
  }
};
