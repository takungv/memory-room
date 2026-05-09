import { useState } from "react";

function SongModal({ open, onClose, songs }) {
  const [activeTab, setActiveTab] = useState("her_playlist");
  const [selectedSongId, setSelectedSongId] = useState(null);

  const visibleSongs = songs.filter((song) => song.category === activeTab);

  return (
    <div
        className={`modal-backdrop ${open ? "modal-show" : "modal-hide"}`}
        onClick={onClose}
      >
      <div className="song-card" onClick={(e) => e.stopPropagation()}>
        <p className="song-label">music always remembers people</p>
        <div className="song-top">
          <div className="vinyl-disc" />

          <div>
            <p className="song-now-playing">
              songs left in this room
            </p>

            <h1>Now Playing</h1>
          </div>
        </div>

        <div className="song-tabs">
          <button
            className={activeTab === "her_playlist" ? "active-song-tab" : ""}
            onClick={() => {
              setActiveTab("her_playlist");
              setSelectedSongId(null);
            }}
          >
            Her Playlist
          </button>

          <button
            className={
              activeTab === "remind_me_of_you" ? "active-song-tab" : ""
            }
            onClick={() => {
              setActiveTab("remind_me_of_you");
              setSelectedSongId(null);
            }}
          >
            Reminds me of you
          </button>
        </div>

        {visibleSongs.map((song) => {
          const isOpen =
            activeTab === "her_playlist" || selectedSongId === song.id;

          return (
            <div key={song.id} className="song-item">
              <div
                className="song-header"
                onClick={() =>
                  setSelectedSongId(isOpen ? null : song.id)
                }
              >
                <div>
                  <h2>{song.title}</h2>
                  {song.artist && <p className="song-artist">{song.artist}</p>}
                </div>

                {activeTab === "remind_me_of_you" && (
                  <span className="song-toggle">{isOpen ? "−" : "+"}</span>
                )}
              </div>

              {song.message && <p className="song-message">{song.message}</p>}

              {isOpen && song.musicUrl && (
                <iframe
                  src={song.musicUrl}
                  width="100%"
                  height={song.category === "her_playlist" ? "380" : "152"}
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="spotify-frame"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SongModal;