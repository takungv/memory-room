import { useState } from "react";

function GiftModal({ open, onClose, photos = [] }) {
  const [preview, setPreview] = useState(null);


  const isVideo = (url) => {
    return (
      url?.toLowerCase().endsWith(".mp4") ||
      url?.toLowerCase().endsWith(".mov") ||
      url?.toLowerCase().endsWith(".webm")
    );
  };

  const sortedPhotos = [...photos].sort(
    (a, b) =>
      new Date(a.createdAt || a.createAt) -
      new Date(b.createdAt || b.createAt)
  );

  const shelves = [];

  for (let i = 0; i < sortedPhotos.length; i += 4) {
    shelves.push(sortedPhotos.slice(i, i + 4));
  }

  return (
    <>
      <div
          className={`modal-backdrop ${open ? "modal-show" : "modal-hide"}`}
          onClick={onClose}
        >
        <div className="gift-card" onClick={(e) => e.stopPropagation()}>
          <h1>Pieces of Her, Still Here</h1>

          <p className="gift-subtitle">
            little things she once gave me,
            quietly resting in this room like small pieces of her heart.
            some are simple,
            some are worn by time,
            but every single one still carries the warmth
            of the moments we shared together.
          </p>

          {shelves.map((shelf, index) => (
            <div className="gift-shelf" key={index}>
              <div className="gift-grid">
                {shelf.map((photo) => (
                  <div
                    key={photo.id}
                    className="gift-item"
                    onClick={() => setPreview(photo)}
                  >
                    {isVideo(photo.imageUrl) ? (
                      <video
                        src={photo.imageUrl}
                        muted
                        className="gift-media"
                      />
                    ) : (
                      <img src={photo.imageUrl} alt="" className="gift-media" />
                    )}

                    <h2>{photo.title}</h2>

                    <p className="gift-description">
                      {photo.caption || photo.description}
                    </p>

                    {photo.note && (
                      <div className="gift-note">“{photo.note}”</div>
                    )}

                    <div className="gift-date">
                      {new Date(
                        photo.createdAt || photo.createAt
                      ).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {preview && (
        <div className="preview-backdrop" onClick={() => setPreview(null)}>
          <div
            className="gift-preview-card"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo(preview.imageUrl) ? (
              <video
                src={preview.imageUrl}
                controls
                autoPlay
                className="gift-preview-media"
              />
            ) : (
              <img
                src={preview.imageUrl}
                alt=""
                className="gift-preview-media"
              />
            )}

            <h2>{preview.title}</h2>

            <p className="gift-preview-description">
              {preview.caption || preview.description}
            </p>

            {preview.note && (
              <div className="gift-note">“{preview.note}”</div>
            )}

            <button className="preview-close" onClick={() => setPreview(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default GiftModal;