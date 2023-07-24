import mongoose, { Schema } from "mongoose";

const flashcardSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      min: 0,
      max: 2,
      default: 0,
    },
  },
  { timestamps: true }
);

const Flashcard =
  mongoose.models.Flashcard || mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
