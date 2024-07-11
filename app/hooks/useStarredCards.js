import { useEffect, useState } from "react";

const useStarredCards = () => {
  const [starredCards, setStarredCards] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/starred`)
      .then((response) => response.json())
      .then((data) => {
        setStarredCards(data.starredFlashcards);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return { starredCards, loading };
};

export default useStarredCards;
