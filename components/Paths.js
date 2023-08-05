"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Paths() {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/paths")
      .then((response) => response.json())
      .then((data) => {
        setPaths(data);
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
      <h1>Paths</h1>
      {paths.map((path, index) => (
        <Link key={index} href={`/paths/${path._id}`} passHref>
          <div className="border-2 border-black m-2 p-2 cursor-pointer">
            <h2>{path.title}</h2>
            <p>Total Courses: {path.totalCourses}</p>
            <p>Completed Flashcards: {path.completedFlashcards}</p>
            <p>Total Flashcards: {path.totalFlashcards}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
