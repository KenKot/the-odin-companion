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
    console.log(coursename, "!!!req!!");

    const user = await User.findById(userId);

    if (!user) {
      console.log("USER NOT FOUND");
      return new Response("User not found", { status: 404 });
    }

    const course = await Course.findOne({
      _id: { $in: user.courses },
      title: courseTitle,
    });

    console.log("pre-wowwee");
    console.log(course, "wowwee");

    if (!course) {
      return new Response("Course not found", { status: 404 });
    }

    return new Response(JSON.stringify(course), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch course: ", error);
    return new Response("Failed to fetch course", { status: 500 });
  }
};
