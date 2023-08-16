import Link from "next/link";
import RadialProgressBar from "./RadialProgressBar";

export default function Tile({ item, type }) {
  const url =
    type === "course" ? `/courses/${item._id}` : `/lessons/${item._id}`;
  const title = item.title;
  const completed =
    type === "course" ? item.completedFlashcards : item.masteredFlashcards;
  const total =
    type === "course" ? item.totalFlashcards : item.flashcards.length;

  return (
    <div className="m-2 mx-auto md:w-3/4 lg:w-1/2">
      <Link href={url} passHref>
        <div className="flex items-center justify-between p-2 border-2 border-white rounded cursor-pointer card inline-block">
          <div className="">
            <h2 className="text-3xl">{title}</h2>
            <p>
              Flashcards: {completed} / {total}
            </p>
          </div>

          <RadialProgressBar completed={completed} total={total} />
        </div>
      </Link>
    </div>
  );
}
