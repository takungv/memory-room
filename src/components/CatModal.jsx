import { useState } from "react";

function CatModal({ open, onClose, memories = [] }) {
  const [preview, setPreview] = useState(null);

  const isVideo = (url) => {
    return (
      url?.toLowerCase().endsWith(".mp4") ||
      url?.toLowerCase().endsWith(".mov") ||
      url?.toLowerCase().endsWith(".webm")
    );
  };

  return (
    <>
      <div
        className={`modal-backdrop ${open ? "modal-show" : "modal-hide"}`}
        onClick={onClose}
      >
        <div className="cat-card" onClick={(e) => e.stopPropagation()}>
          <h1>🐾 Her & The Cat</h1>

          <p className="cat-subtitle">
            soft little moments I was lucky enough to keep
          </p>

          <div className="cat-list">
            {memories.map((memory) => (
              <div
                key={memory.id}
                className="cat-memory"
                onClick={() => setPreview(memory)}
              >
                <div className="cat-media-wrap">
                  {isVideo(memory.imageUrl) ? (
                    <video
                      src={memory.imageUrl}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="cat-media"
                    />
                  ) : (
                    <img
                      src={memory.imageUrl}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="cat-media"
                    />
                  )}
                </div>

                <div className="cat-info">
                  <p className="cat-label">cat diary</p>

                  <h2>{memory.title}</h2>

                  <p className="cat-date">
                    {new Date(
                      memory.createdAt || memory.createAt
                    ).toLocaleString()}
                  </p>

                  <p className="cat-description">
                    {memory.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {preview && (
        <div className="preview-backdrop" onClick={() => setPreview(null)}>
          <div className="preview-card" onClick={(e) => e.stopPropagation()}>
            {isVideo(preview.imageUrl) ? (
              <video
                src={preview.imageUrl}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="preview-media"
              />
            ) : (
              <img src={preview.imageUrl} alt="" className="preview-media" />
            )}

            <h2>{preview.title}</h2>
            <p>{preview.description}</p>

            <button
              className="preview-close"
              onClick={() => setPreview(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CatModal;