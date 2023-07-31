import { connectMongoDB } from "@/lib/mongodb";
import Lesson from "@/models/lesson";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (request) => {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    let urlLessonnameArray = request.url.split("/");
    let lessonname = urlLessonnameArray[urlLessonnameArray.length - 1];
    const lessonTitle = lessonname.replace(/-/g, " ");

    const lesson = await Lesson.findOne({
      title: lessonTitle,
    }).populate("flashcards");

    if (!lesson) {
      return new Response("Lesson not found", { status: 404 });
    }

    return new Response(JSON.stringify(lesson), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch lesson: ", error);
    return new Response("Failed to fetch lesson", { status: 500 });
  }
};
