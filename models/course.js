import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
