import shuffleArray from "./shuffleArray";

export default function organizeFlashcardArray(flashcardData) {
  let tempUnmasteredCards = []; //to be shuffled
  let tempMasteredCards = [];

  flashcardData.forEach((card) => {
    if (card.isMastered) {
      tempMasteredCards.push(card);
    } else {
      tempUnmasteredCards.push(card);
    }
  });

  tempUnmasteredCards = shuffleArray(tempUnmasteredCards);
  tempMasteredCards = shuffleArray(tempMasteredCards);

  return tempUnmasteredCards.concat(tempMasteredCards);
}
