import { connectMongoDB } from "@/lib/mongodb";
import Flashcard from "@/models/flashcard";
import Lesson from "@/models/lesson";
import Course from "@/models/course";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const PATCH = async (request) => {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    let urlFlashcardIdArray = request.url.split("/");
    let flashcardId = urlFlashcardIdArray[urlFlashcardIdArray.length - 1];

    const flashcard = await Flashcard.findById(flashcardId);

    if (!flashcard) {
      return new Response("Flashcard not found", { status: 404 });
    }

    // I'd need to change schema for this to work

    // const lesson = await Lesson.findById(flashcard.lessonId);

    // if (!lesson) {
    //   return new Response("Lesson not found", { status: 404 });
    // }

    // const course = await Course.findOne({
    //   _id: { $in: lesson.course },
    //   userId: userId,
    // });

    // if (!course) {
    //   return new Response("Unauthorized", { status: 403 });
    // }

    // toggle isMastered field
    flashcard.isMastered = !flashcard.isMastered;

    // save the updated flashcard
    await flashcard.save();

    return new Response(JSON.stringify(flashcard), { status: 200 });
  } catch (error) {
    console.error("Failed to update flashcard: ", error);
    return new Response("Failed to update flashcard", { status: 500 });
  }
};
