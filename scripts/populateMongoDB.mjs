import { connectMongoDB } from "./lib/mongodb";
import Course from "./models/course";
import Lesson from "./models/lesson";
import Flashcard from "./models/flashcard";
import flashcardJSONData from "./misc/flashcardData";

async function populateData() {
  console.log("populateData ran");
  // await connectMongoDB();

  // // Loop through the courses in your JSON data
  // for (const courseData of flashcardJSONData.courses) {
  //   const course = new Course({ title: courseData.title });

  //   for (const lessonData of courseData.lessons) {
  //     const lesson = new Lesson({ title: lessonData.title });

  //     for (const flashcardData of lessonData.flashcards) {
  //       const flashcard = new Flashcard({
  //         question: flashcardData.question,
  //         answer: flashcardData.answer,
  //       });

  //       await flashcard.save();
  //       lesson.flashcards.push(flashcard._id);
  //     }

  //     await lesson.save();
  //     course.lessons.push(lesson._id);
  //   }

  //   await course.save();
  //   console.log("populateData finished");
  // }
}

populateData();
