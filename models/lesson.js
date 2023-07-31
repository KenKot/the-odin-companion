import mongoose, { Schema } from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: String,
  flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flashcard" }],
});

const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);

export default Lesson;
