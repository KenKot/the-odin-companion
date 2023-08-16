import React from "react";
import Link from "next/link";

export default function StarredCourseTile({ starredFlashcardsCount }) {
  return (
    <div className="p-2 m-2 mx-auto border-2 border-white rounded cursor-pointer card md:w-3/4 lg:w-1/2">
      <Link href="/starred" passHref>
        <h2 className="text-3xl">Favorited</h2>

        <p>Flashcards: {starredFlashcardsCount}</p>
      </Link>
    </div>
  );
}
