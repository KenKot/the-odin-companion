import { getStarredFlashcards } from "@/app/utils/getStarredFlashcards";
import FlashcardViewer from "@/components/FlashcardViewer";

export default async function Starred() {
  console.log("reee");
  const res = await getStarredFlashcards();
  const starredCards = await res.json();

  console.log(starredCards);
  console.log("starredCards is", starredCards);
  return (
    <FlashcardViewer
      lessonTitle={"Starred Flashcards"}
      shuffledflashcards={starredCards}
    />
  );
}
