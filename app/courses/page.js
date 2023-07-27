"use client";

import { useEffect, useState } from "react";
// import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
function Courses() {
  //   const { data: session } = useSession();
  //   const userId = session.user.id;

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch courses from the API
    fetch("/api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Courses</h1>
      {courses.map((course) => (
        <li key={course._id}>
          <h2>{course.title}</h2>
          {course.lessons.map((lesson) => (
            <div key={lesson._id}>
              <h3>{lesson.title}</h3>
              {lesson.flashcards.map((flashcard) => (
                <div key={flashcard._id}>
                  <p>{flashcard.question}</p>
                  <p>{flashcard.answer}</p>
                </div>
              ))}
            </div>
          ))}
        </li>
      ))}
    </div>
  );
}

export default Courses;
