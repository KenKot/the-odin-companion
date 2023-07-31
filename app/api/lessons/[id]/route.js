import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user"; // You will need the User model
import Course from "@/models/course"; // You will need the Course model
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

    // Fetch the user
    const user = await User.findById(userId);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Get the courses for the user
    const courses = await Course.find({
      _id: { $in: user.courses },
    });

    for (let course of courses) {
      // Check if the requested lesson is in the course lessons
      const lesson = await Lesson.findOne({
        _id: { $in: course.lessons },
        title: lessonTitle,
      }).populate("flashcards");

      if (lesson) {
        // If lesson is found, return it
        return new Response(JSON.stringify(lesson), { status: 200 });
      }
    }

    // If no matching lesson is found in any course, return a 404 error
    return new Response("Lesson not found", { status: 404 });
  } catch (error) {
    console.error("Failed to fetch lesson: ", error);
    return new Response("Failed to fetch lesson", { status: 500 });
  }
};
