// import { connectMongoDB } from "@/lib/mongodb";
// import Course from "@/models/course";
// import User from "@/models/user";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";
// import { NextResponse } from "next/server";
// import Link from "next/link";

// async function getLessons(session) {
//   try {
//     await connectMongoDB();
//     const session = await getServerSession(authOptions);
//     const userId = session.user.id;

//     let courseId = params.id;

//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // Fetch the course and check if it exists
//     const course = await Course.findOne({
//       _id: { $in: user.courses, $eq: courseId },
//     }).populate({
//       path: "lessons",
//       model: "Lesson",
//       populate: {
//         path: "flashcards",
//         model: "Flashcard",
//       },
//     });

//     if (!course) {
//       return NextResponse.json(
//         { message: "Course not found" },
//         { status: 404 }
//       );
//     }

//     const courseWithMasteredFlashcards = {
//       ...course._doc,
//       lessons: course.lessons.map((lesson) => ({
//         ...lesson._doc,
//         masteredFlashcards: lesson.flashcards.filter(
//           (flashcard) => flashcard.isMastered
//         ).length,
//       })),
//     };
//     return NextResponse.json(courseWithMasteredFlashcards, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to fetch courseWithMasteredFlashcards" },
//       { status: 500 }
//     );
//   }
// }

// export default function CourseDetail({ params }) {

//   useEffect(() => {
//     fetch(`/api/courses/${params.id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setCourse(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!course) {
//     return <div>Course not found</div>;
//   }

//   return (
//     <div>
//       <h1 className="text-3xl text-center mb-4">{course.title}</h1>
//       {course.lessons.map((lesson, index) => (
//         <Link key={index} href={`/lessons/${lesson._id}`} passHref>
//           <div className="border-2 border-white m-2 p-2 cursor-pointer rounded">
//             <h2 className="text-3xl">{lesson.title}</h2>
//             <p>
//               Flashcards: {lesson.masteredFlashcards} /{" "}
//               {lesson.flashcards.length}{" "}
//             </p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CourseDetail({ params }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${params.id}`)
      .then((response) => {
        console.log("API Response Status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("API Data:", data);
        setCourse(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center mb-4">{course.title}</h1>
      {course.lessons.map((lesson, index) => (
        <Link key={index} href={`/lessons/${lesson._id}`} passHref>
          <div className="border-2 border-white m-2 p-2 cursor-pointer rounded">
            <h2 className="text-3xl">{lesson.title}</h2>
            <p>
              Flashcards: {lesson.masteredFlashcards} /{" "}
              {lesson.flashcards.length}{" "}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
