import { useEffect, useState } from "react";

const baseCards = [
  { id: 1, emoji: "🎮", text: "game" },
  { id: 2, emoji: "🐱", text: "cat" },
  { id: 3, emoji: "🎸", text: "guitar" },
  { id: 4, emoji: "🎁", text: "gift" },
];

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [opened, setOpened] = useState([]);
  const [matched, setMatched] = useState([]);

  const startGame = () => {
    const duplicated = [...baseCards, ...baseCards].map((card, index) => ({
      ...card,
      uniqueId: `${card.id}-${index}`,
    }));

    const shuffled = duplicated.sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setOpened([]);
    setMatched([]);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleClick = (card) => {
    if (
      opened.length === 2 ||
      opened.some((item) => item.uniqueId === card.uniqueId) ||
      matched.includes(card.id)
    ) {
      return;
    }

    const nextOpened = [...opened, card];
    setOpened(nextOpened);

    if (nextOpened.length === 2) {
      if (nextOpened[0].id === nextOpened[1].id) {
        setMatched((prev) => [...prev, card.id]);
        setOpened([]);
      } else {
        setTimeout(() => {
          setOpened([]);
        }, 700);
      }
    }
  };

  const isOpen = (card) => {
    return (
      opened.some((item) => item.uniqueId === card.uniqueId) ||
      matched.includes(card.id)
    );
  };

  const finished = matched.length === baseCards.length;

  return (
    <div className="memory-game">
      <h2>Little Memory Game</h2>

      <p className="memory-game-subtitle">
        find the matching little memories
      </p>

      <div className="memory-game-board">
        {cards.map((card) => (
          <button
            key={card.uniqueId}
            className={
              isOpen(card)
                ? "memory-game-card memory-game-card-open"
                : "memory-game-card"
            }
            onClick={() => handleClick(card)}
          >
            {isOpen(card) ? card.emoji : "?"}
          </button>
        ))}
      </div>

      {finished && (
        <p className="memory-game-finished">
          you found all the little memories ♡
        </p>
      )}

      <button className="memory-game-reset" onClick={startGame}>
        Restart
      </button>
    </div>
  );
}

export default MemoryGame;