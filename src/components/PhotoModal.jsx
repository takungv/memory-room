import { useState, useEffect } from "react";

function PhotoModal({ open, onClose, photos = [] }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const isVideo = (url) => {
    return (
      url?.toLowerCase().endsWith(".mp4") ||
      url?.toLowerCase().endsWith(".mov") ||
      url?.toLowerCase().endsWith(".webm")
    );
  };

  const getDate = (photo) => {
    return new Date(
      photo.createAt ||
        photo.createdAt ||
        photo.CreateAt ||
        photo.CreatedAt ||
        0
    ).getTime();
  };
  

  const sortedPhotos = [...photos].sort(
    (a, b) => getDate(a) - getDate(b)
  );


  return (
    <div
        className={`modal-backdrop ${open ? "modal-show" : "modal-hide"}`}
        onClick={onClose}
      >
      <div
        className="photo-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="photo-header">
          <h1>Things That Stayed</h1>

          <p className="photo-subtitle">
            some moments disappeared quietly,
            fading into ordinary days before we even realized it,
            but the feelings inside them never really left.
            they stayed in small places —
            in late night conversations,
            blurry photos,
            familiar songs,
            and the kind of silence that still feels warm somehow.
          </p>
        </div>

        <div className="photo-grid">
          {sortedPhotos.map((photo) => (
            <div
              key={photo.id}
              className="polaroid"
              onClick={() => setSelectedPhoto(photo)}
            >
              {isVideo(photo.imageUrl) ? (
                <video
                src={photo.imageUrl}
                muted
                playsInline
                controls
                preload="auto"
                className="polaroid-media"
                onError={(e) => {
                  console.log("video failed:", e);
                }}
              />
              ) : (
                <div className="photo-media-wrapper">
                  <div className="photo-skeleton" />

                  <img
                    src={photo.imageUrl}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="polaroid-media"
                    onLoad={(e) => {
                      e.target.style.opacity = 1;
                    }}
                  />
                </div>
              )}

              <h2>{photo.title}</h2>

              <p>{photo.caption}</p>

              <p className="photo-date">
                {new Date(
                  photo.createAt ||
                  photo.createdAt ||
                  photo.CreateAt ||
                  photo.CreatedAt
                ).toLocaleDateString()}
              </p>
            </div>
          ))}
      
        </div>
      
      </div>
    


      {selectedPhoto && (
        <div
          className="preview-backdrop"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPhoto(null);
          }}
        >
          <div
            className="preview-card"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo(selectedPhoto.imageUrl) ? (
              <video
                src={selectedPhoto.imageUrl}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="preview-media"
                webkit-playsinline="true"
              />
            ) : (
              <img
                src={selectedPhoto.imageUrl}
                alt=""
                className="preview-media"
              />
            )}

            <h2>{selectedPhoto.title}</h2>

            <p>{selectedPhoto.caption}</p>

            <button
              className="preview-close"
              onClick={() => setSelectedPhoto(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoModal;