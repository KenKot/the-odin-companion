import { getStarredFlashcards } from "@/app/utils/getStarredFlashcards";

export default async function Starred() {
  const starredCards = await getStarredFlashcards();
  console.log("starredCards is", starredCards);
  return <div>Starred</div>;
}
