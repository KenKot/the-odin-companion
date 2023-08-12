import FlashcardViewer from "@/components/FlashcardViewer";
import { getStarredFlashcards } from "@/app/utils/getStarredFlashcards";

export default async function Starred() {
  const res = await getStarredFlashcards();
  const starredCards = await res.json();

  return (
    <FlashcardViewer
      lessonTitle={"Starred Flashcards"}
      shuffledflashcards={starredCards}
    />
  );
}
