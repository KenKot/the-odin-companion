import mongoose, { Schema } from "mongoose";

const userFlashcardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  flashcard: { type: mongoose.Schema.Types.ObjectId, ref: "Flashcard" },
  isMastered: { type: Boolean, default: false },
  starred: { type: Boolean, default: false },
});

const UserFlashcard =
  mongoose.models.UserFlashcard ||
  mongoose.model("UserFlashcard", userFlashcardSchema);

export default UserFlashcard;
