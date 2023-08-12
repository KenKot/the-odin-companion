import Link from "next/link";
import { getCourses } from "@/app/utils/getCourses";
import { getStarredFlashcardsCount } from "@/app/utils/getStarredFlashcardsCount";

export default async function Courses() {
  const courses = await getCourses();
  const starredFlashcardsCount = await getStarredFlashcardsCount();
  return (
    <div>
      <h1 className="mb-4 text-5xl text-center ">Courses</h1>

      <div className="p-2 m-2 border-2 border-white rounded cursor-pointer ">
        <Link href="/starred" passHref>
          <h2 className="text-3xl">Favorited</h2>

          <p>Flashcards: {starredFlashcardsCount}</p>
        </Link>
      </div>

      {courses?.map((course, index) => (
        <Link key={index} href={`/courses/${course._id}`} passHref>
          <div className="p-2 m-2 border-2 border-white rounded cursor-pointer ">
            <h2 className="text-3xl">{course.title}</h2>

            <p>
              Lessons: {course.completedLessons}/{course.totalLessons}
            </p>
            <p>
              Flashcards: {course.completedFlashcards}/{course.totalFlashcards}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
