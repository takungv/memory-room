import { useEffect, useRef } from "react";

function GuitarModal({ open, onClose, memories }) {
  const guitarAudioRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const audio = new Audio("/audio/guitar-hover.mp3");

    audio.volume = 0.08;

    audio.loop = true;

    audio.play();

    guitarAudioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card guitar-card"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Letters Written In Chords</h1>

        <p className="guitar-subtitle">
          maybe music was the only way
          I ever knew how to hold on to a feeling
        </p>

        <div className="guitar-list">
          {memories.map((memory) => (
            <div
              key={memory.id}
              className="guitar-memory"
            >
              <img
                src={memory.imageUrl}
                alt=""
                className="guitar-image"
              />

              <div className="guitar-info">
                <h2>{memory.title}</h2>

                <p className="guitar-date">
                  {new Date(memory.createdAt).toLocaleString()}
                </p>

                {memory.playing && (
                  <p className="guitar-playing">
                    playing: {memory.playing}
                  </p>
                )}

                {memory.quote && (
                  <p className="guitar-quote">
                    “{memory.quote}”
                  </p>
                )}

                <p>{memory.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GuitarModal;