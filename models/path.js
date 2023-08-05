import mongoose, { Schema } from "mongoose";

const pathSchema = new mongoose.Schema({
  title: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const Path = mongoose.models.Path || mongoose.model("Path", pathSchema);

export default Path;
