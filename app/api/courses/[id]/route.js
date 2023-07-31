import { connectMongoDB } from "@/lib/mongodb";
import Course from "@/models/course";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (request) => {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    let urlCoursenameArray = request.url.split("/");
    let coursename = urlCoursenameArray[urlCoursenameArray.length - 1];
    const courseTitle = coursename.replace(/-/g, " ");

    const user = await User.findById(userId);

    if (!user) {
      console.log("USER NOT FOUND");
      return new Response("User not found", { status: 404 });
    }

    const course = await Course.findOne({
      _id: { $in: user.courses },
      title: courseTitle,
    }).populate({
      path: "lessons",
      model: "Lesson",
      populate: {
        path: "flashcards",
        model: "Flashcard",
      },
    });

    if (!course) {
      return new Response("Course not found", { status: 404 });
    }

    const courseWithMasteredFlashcards = {
      ...course._doc,
      lessons: course.lessons.map((lesson) => ({
        ...lesson._doc,
        masteredFlashcards: lesson.flashcards.filter(
          (flashcard) => flashcard.isMastered
        ).length,
      })),
    };

    return new Response(JSON.stringify(courseWithMasteredFlashcards), {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to fetch course: ", error);
    return new Response("Failed to fetch course", { status: 500 });
  }
};
