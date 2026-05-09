import { useState } from "react";
import MemoryGame from "./MemoryGame";

function ComputerModal({ open, onClose, memories = [] }) {
  const [activeTab, setActiveTab] = useState("memories");


  const isVideo = (url) => {
    return (
      url?.toLowerCase().endsWith(".mp4") ||
      url?.toLowerCase().endsWith(".mov") ||
      url?.toLowerCase().endsWith(".webm")
    );
  };

  const getDateValue = (memory) => {
    const dateText =
      memory.createdAt ||
      memory.createAt ||
      memory.CreatedAt ||
      memory.CreateAt;

    const time = new Date(dateText).getTime();

    return Number.isNaN(time) ? 0 : time;
  };

  const sortedMemories = [...memories].sort(
    (a, b) => getDateValue(a) - getDateValue(b)
  );

  return (
    <div
        className={`modal-backdrop ${open ? "modal-show" : "modal-hide"}`}
        onClick={onClose}
      >
      <div className="computer-card" onClick={(e) => e.stopPropagation()}>
        <h1>Late Nights & Loading Screens</h1>

        <p className="computer-subtitle">
          somehow every game became softer
          when you were there with me
        </p>

        <div className="computer-tabs">
          <button
            className={activeTab === "memories" ? "active-computer-tab" : ""}
            onClick={() => setActiveTab("memories")}
          >
            Memories
          </button>

          <button
            className={activeTab === "game" ? "active-computer-tab" : ""}
            onClick={() => setActiveTab("game")}
          >
            Little Game
          </button>
        </div>

        {activeTab === "memories" ? (
          <div className="computer-grid">
            {sortedMemories.map((memory) => (
              <div key={memory.id} className="computer-memory">
                {isVideo(memory.imageUrl) ? (
                  <video
                    src={memory.imageUrl}
                    controls
                    className="computer-media"
                  />
                ) : (
                  <img
                    src={memory.imageUrl}
                    alt=""
                    className="computer-media"
                  />
                )}

                <h2>{memory.title}</h2>

                <p className="computer-date">
                  {new Date(
                    memory.createdAt || memory.createAt
                  ).toLocaleString()}
                </p>

                <p className="computer-description">
                  {memory.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <MemoryGame />
        )}
      </div>
    </div>
  );
}

export default ComputerModal;