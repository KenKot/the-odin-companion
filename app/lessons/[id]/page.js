import FlashcardViewer from "@/components/FlashcardViewer";
import { getLesson } from "@/app/utils/getLesson";

export default async function LessonDetail({ params }) {
  let res = await getLesson(params.id);
  let lessonData = await res.json();

  return (
    <FlashcardViewer
      lessonTitle={lessonData.title}
      shuffledflashcards={lessonData.flashcards}
    />
  );
}
