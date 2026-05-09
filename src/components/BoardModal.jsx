import { useState } from "react";

function BoardModal({ open, onClose, boards = [] }) {
  const [selectedBoard, setSelectedBoard] = useState(null);

  if (!open) return null;

  const getDate = (board) => {
    return new Date(
      board.createAt || board.createdAt || 0
    ).getTime();
  };

  const sortedBoards = [...boards].sort(
    (a, b) => getDate(a) - getDate(b)
  );

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div
          className="board-card"
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Made During Sleepless Nights</h1>

          <p className="board-subtitle">
            tiny projects, long conversations,
            and the comfort of having you there while everything felt difficult
          </p>

          <div className="board-grid">
            {sortedBoards.map((board) => (
              <div
                key={board.id}
                className="board-note"
                onClick={() => setSelectedBoard(board)}
              >
                <div className="board-pin" />

                <img
                  src={board.imageUrl}
                  alt=""
                  className="board-image"
                />

                <h2>{board.title}</h2>

                <p className="board-description">
                  {board.description}
                </p>

                <p className="board-date">
                  {new Date(
                    board.createAt || board.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedBoard && (
        <div
          className="preview-backdrop"
          onClick={() => setSelectedBoard(null)}
        >
          <div
            className="board-preview-card"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedBoard.imageUrl}
              alt=""
              className="board-preview-image"
            />

            <h2>{selectedBoard.title}</h2>

            <p className="board-preview-description">
              {selectedBoard.description}
            </p>

            <button
              className="preview-close"
              onClick={() => setSelectedBoard(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BoardModal;