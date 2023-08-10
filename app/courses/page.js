import Link from "next/link";
import getCourses from "@/app/utils/getCourses";

export default async function Courses() {
  const courses = await getCourses(); // put in try/catch block?

  return (
    <div>
      <h1>Courses</h1>
      {courses?.map((course, index) => (
        <Link key={index} href={`/courses/${course._id}`} passHref>
          <div className="p-2 m-2 border-2 border-black cursor-pointer">
            <h2>{course.title}</h2>
            <p>Total Lessons: {course.totalLessons}</p>
            <p>Completed Flashcards: {course.completedFlashcards}</p>
            <p>Total Flashcards: {course.totalFlashcards}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
