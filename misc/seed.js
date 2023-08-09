import mongoose from "mongoose";
import Course from "@/models/course";
import Lesson from "@/models/lesson";
import Flashcard from "@/models/flashcard";
import flashcardJSONData from "@/misc/flashcardData";
import { connectMongoDB } from "@/lib/mongodb";

// async function connectMongoDB() {
//   if (mongoose.connection.readyState === 0) {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//     });
//   }
// }

export default async function seedDatabase() {
  console.log("@/misc/seed ran");
  await connectMongoDB();

  for (const courseData of flashcardJSONData.courses) {
    const course = new Course({ title: courseData.title });

    for (const lessonData of courseData.lessons) {
      const lesson = new Lesson({ title: lessonData.title });

      for (const flashcardData of lessonData.flashcards) {
        const flashcard = new Flashcard({
          question: flashcardData.question,
          answer: flashcardData.answer,
        });

        await flashcard.save();
        lesson.flashcards.push(flashcard._id);
      }

      await lesson.save();
      course.lessons.push(lesson._id);
    }

    await course.save();
  }

  console.log("Seeding complete!");
}
