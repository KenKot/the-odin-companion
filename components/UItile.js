import Link from "next/link";

export default function UItile({ course }) {
  return (
    <Link href={`/courses/${course._id}`} passHref>
      <div className="p-2 m-2 border-2 border-white rounded cursor-pointer mx-auto md:w-3/4 lg:w-1/2">
        <h2 className="text-3xl">{course.title}</h2>
        <p>
          Lessons: {course.completedLessons}/{course.totalLessons}
        </p>
        <p>
          Flashcards: {course.completedFlashcards}/{course.totalFlashcards}
        </p>
      </div>
    </Link>
  );
}
