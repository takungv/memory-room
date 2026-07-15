export default function GalleryModal({
  timeline,
  onClose
}) {

  const description = timeline.description || timeline.Description;

  return (
    <div className="gallery-backdrop">
      <div className="gallery-container">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

        <h1>
          {timeline.title}
        </h1>

        <p className="gallery-date">
          {timeline.month}/{timeline.year}
        </p>

        {description && (
          <p className="gallery-description">
            {description}
          </p>
        )}

        <div className="gallery-grid">
          {
            timeline.media.map((media) => (
              <div className="gallery-item-wrap" key={media.id}>

                <span className="gallery-item-tape" />

                {media.type === "video" ? (
                  <video
                    src={media.url}
                    controls
                    className="gallery-item"
                  />
                ) : (
                  <img
                    src={media.url}
                    className="gallery-item"
                  />
                )}

              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}