import mongoose, { Schema } from "mongoose";

const flashcardSchema = new mongoose.Schema({
  question: String,
  answer: String,
  // isMastered: { type: Boolean, default: false },
});

const Flashcard =
  mongoose.models.Flashcard || mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
