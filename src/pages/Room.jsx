import { useEffect, useState } from "react";
import api from "../services/api";

import roomDay from "../assets/light.png";
import roomNight from "../assets/night.png";

import guitarHitbox from "../assets/guitar-hitbox-light.png";

import modeHitbox_day from "../assets/mode-hitbox-day.png";
import modeHitbox_night from "../assets/mode-hitbox-night.png";

import songHitbox_day from "../assets/song-hitbox-day.png";
import songHitbox_night from "../assets/song-hitbox-night.png";

import giftHitbox_day from "../assets/giftHitbox-day.png";
import giftHitbox_night from "../assets/giftHitbox-night.png";

import letterHitbox_day from "../assets/letterHitbox-day.png";
import letterHitbox_night from "../assets/letterHitbox-night.png";

import photoHitbox_day from "../assets/photoHitbox-day.png";
import photoHitbox_night from "../assets/photoHitbox-night.png";

import computerHitbox_day from "../assets/computerHitbox-day.png";
import computerHitbox_night from "../assets/computerHitbox-night.png";

import catHitbox_day from "../assets/catHitbox-day.png";
import catHitbox_night from "../assets/catHitbox-night.png";

import boardHitbox_day from "../assets/boardHitbox-day.png";
import boardHitbox_night from "../assets/boardHitbox-night.png";

import GuitarModal from "../components/GuitarModal";
import LettersModal from "../components/LettersModal";
import SongModal from "../components/SongModal";
import PhotoModal from "../components/PhotoModal";
import ComputerModal from "../components/ComputerModal";
import CatModal from "../components/CatModal";
import GiftModal from "../components/GiftModal";
import BoardModal from "../components/BoardModal";

function Room({ roomData }) {

  const [endingMode, setEndingMode] = useState(false);

  const [holdTimeout, setHoldTimeout] =
    useState(null);

  const [bgMusicOn, setBgMusicOn] = useState(false);
  const [nightMode, setNightMode] = useState(false);

  const [guitarMemories, setGuitarMemories] = useState(
    roomData?.guitarMemories || []
  );
  
  const [letters, setLetters] = useState(
    roomData?.letters || []
  );
  
  const [songs, setSongs] = useState(
    roomData?.songs || []
  );
  
  const [photos, setPhotos] = useState(
    roomData?.photos || []
  );
  
  const [computerMemories, setComputerMemories] = useState(
    roomData?.computerMemories || []
  );
  
  const [catMemories, setCatMemories] = useState(
    roomData?.catMemories || []
  );
  
  const [boardMemories, setBoardMemories] = useState(
    roomData?.boardMemories || []
  );

  const [guitarOpen, setGuitarOpen] = useState(false);
  const [lettersOpen, setLettersOpen] = useState(false);
  const [songsOpen, setSongsOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [computerOpen, setComputerOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [boardOpen, setBoardOpen] = useState(false);

  const [roomImagesReady, setRoomImagesReady] = useState(false);

  const normalPhotos = photos.filter((p) => p.category === "photo");
  const giftPhotos = photos.filter((p) => p.category === "gift");

  // =========================
// LOAD ONLY WHEN OPEN
// =========================

const loadGuitarMemories = async () => {
  if (guitarMemories.length > 0) return;

  const res = await api.get("/Memories/guitar");
  setGuitarMemories(res.data);
};

const loadLetters = async () => {
  if (letters.length > 0) return;

  const res = await api.get("/Letters");
  setLetters(res.data);
};

const loadSongs = async () => {
  if (songs.length > 0) return;

  const res = await api.get("/Songs");
  setSongs(res.data);
};

const loadPhotos = async () => {
  if (photos.length > 0) return;

  const res = await api.get("/Photos");
  setPhotos(res.data);
};

const loadComputerMemories = async () => {
  if (computerMemories.length > 0) return;

  const res = await api.get("/Memories/computer");
  setComputerMemories(res.data);
};

const loadCatMemories = async () => {
  if (catMemories.length > 0) return;

  const res = await api.get("/Memories/cat");
  setCatMemories(res.data);
};

const loadBoardMemories = async () => {
  if (boardMemories.length > 0) return;

  const res = await api.get("/Memories/board");
  setBoardMemories(res.data);
};

  useEffect(() => {
    const moveRoom = (e) => {
      const roomImage = document.querySelector(".room-image");
  
      if (!roomImage) return;
  
      const x = (window.innerWidth / 2 - e.clientX) / 120;
      const y = (window.innerHeight / 2 - e.clientY) / 120;
  
      roomImage.style.transform = `translate(${x}px, ${y}px) scale(1.01)`;
    };
  
    window.addEventListener("mousemove", moveRoom);
  
    return () => {
      window.removeEventListener("mousemove", moveRoom);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const roomImage = document.querySelector(".room-image");
  
      if (!roomImage) return;
  
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
  
      roomImage.style.transform = `translate(${-x}px, ${-y}px) scale(1.015)`;
    };
  
    window.addEventListener("mousemove", handleMouseMove);
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  useEffect(() => {
    const nightAmbient =
      document.getElementById("night-ambient");
  
    if (!nightAmbient) return;
  
    let fadeInterval;
  
    // ถ้าเพลงหลักยังไม่เล่น
    if (!bgMusicOn) {
      nightAmbient.pause();
      return;
    }
  
    // NIGHT MODE → fade in
    if (nightMode) {
      nightAmbient.volume = 0;
  
      nightAmbient.play();
  
      fadeInterval = setInterval(() => {
        if (nightAmbient.volume < 0.09) {
          nightAmbient.volume += 0.01;
        } else {
          clearInterval(fadeInterval);
        }
      }, 120);
    }
  
    // DAY MODE → fade out
    else {
      fadeInterval = setInterval(() => {
        if (nightAmbient.volume > 0.01) {
          nightAmbient.volume -= 0.01;
        } else {
          clearInterval(fadeInterval);
  
          nightAmbient.pause();
        }
      }, 120);
    }
  
    return () => clearInterval(fadeInterval);
  
  }, [nightMode, bgMusicOn]);
  useEffect(() => {
    const bgAudio =
      document.getElementById("bg-audio");
  
    const nightAmbient =
      document.getElementById("night-ambient");
  
    if (!bgAudio) return;
  
    bgAudio.volume = 0.24;
  
    bgAudio.play();
  
    if (nightMode && nightAmbient) {
      nightAmbient.volume = 0.09;
      nightAmbient.play();
    }
  
    setBgMusicOn(true);
  
  }, []);

  useEffect(() => {
    const images = [roomDay, roomNight];
  
    Promise.all(
      images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
  
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src;
        });
      })
    ).then(() => {
      setRoomImagesReady(true);
    });
  }, []);

  const toggleBackgroundMusic = () => {
    const bgAudio =
      document.getElementById("bg-audio");
  
    const nightAmbient =
      document.getElementById("night-ambient");
  
    if (!bgAudio || !nightAmbient) return;
  
    bgAudio.volume = 0.19;
    nightAmbient.volume = 0.09;
  
    if (bgMusicOn) {
      bgAudio.pause();
      nightAmbient.pause();
    } else {
      bgAudio.play();
  
      if (nightMode) {
        nightAmbient.play();
      }
    }
  
    setBgMusicOn(!bgMusicOn);
  };

  const openGuitar = async () => {
    await loadGuitarMemories();
  
    const audio = document.getElementById("bg-audio");
  
    if (audio && bgMusicOn) {
      audio.pause();
    }
  
    setGuitarOpen(true);
  };

  const playHoverSound = () => {
    const audio = new Audio("/audio/hover.mp3");
  
    audio.volume = 0.3;
    audio.currentTime = 0;
  
    audio.play();
  };

  const triggerEnding = () => {
    setEndingMode(true);
  
    const bgAudio =
      document.getElementById("bg-audio");
  
    const nightAmbient =
      document.getElementById("night-ambient");
  
    const fadeAudio = (audio) => {
      if (!audio) return;
  
      let volume = audio.volume;
  
      const fade = setInterval(() => {
        if (volume > 0.02) {
          volume -= 0.01;
  
          audio.volume = volume;
        } else {
          clearInterval(fade);
  
          audio.pause();
        }
      }, 120);
    };
  
    fadeAudio(bgAudio);
    fadeAudio(nightAmbient);
  };

  return (
    
    <div className="room">
      {!roomImagesReady && (
        <div className="room-waiting">
          preparing the room...
        </div>
      )}
      <div
          className="room-stage"
          style={{
            opacity: roomImagesReady ? 1 : 0,
            pointerEvents: roomImagesReady ? "auto" : "none",
          }}
        >
      <div className="room-particles">
        {[...Array(28)].map((_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 37) % 100}%`,
              animationDuration: `${10 + (i % 8)}s`,
              animationDelay: `${(i % 6) * 0.8}s`,
            }}
          />
        ))}
      </div>
      <div className="room-scene">
        <img
          src={roomDay}
          alt=""
          className={`room-image ${
            nightMode ? "fade-out" : "fade-in"
          }`}
        />

        <img
          src={roomNight}
          alt=""
          className={`room-image ${
            nightMode ? "fade-in" : "fade-out"
          }`}
        />
      </div>

      {/* AUDIO */}
      <audio
        id="bg-audio"
        src="/audio/cozy.mp3"
        loop
        autoPlay
      />

      <audio
        id="night-ambient"
        src="/audio/night.mp3"
        loop
      />

      <button className="bg-music-button" onClick={toggleBackgroundMusic}>
        {bgMusicOn
          ? "♪ The room is quietly playing"
          : "♪ Play the songs left in this room"}
      </button>

      {/* COMPUTER */}
      <div
        className="object-wrapper"
        onMouseEnter={playHoverSound}
        style={{
          left: nightMode ? "8%" : "7.5%",
          top: nightMode ? "24%" : "27%",
          width: nightMode ? "22.2%" : "24.5%",
        }}
      >
        <div className="object-label">late night games</div>

        <img
          src={nightMode ? computerHitbox_night : computerHitbox_day}
          alt=""
          
          className="object-hover"
          onClick={async () => {
            await loadComputerMemories();

            setComputerOpen(true);
          }}
        />
      </div>

      {/* BOARD */}
      <div
        className="object-wrapper"
        onMouseEnter={playHoverSound}
        style={{
          left: nightMode ? "79%" : "83.5%",
          top: nightMode ? "22.4%" : "22.1%",
          width: nightMode ? "21%" : "17%",
        }}
      >
        <div className="object-label">things we made</div>

        <img
          src={nightMode ? boardHitbox_night : boardHitbox_day}
          alt=""
          className="object-hover"
          onClick={async () => {
            await loadBoardMemories();
            setBoardOpen(true)
          }}
        />
      </div>

      {/* CAT */}
      <div
        className="object-wrapper"
        onMouseEnter={playHoverSound}
        style={{
          left: nightMode ? "1%" : "0%",
          top: nightMode ? "68%" : "67%",
          width: nightMode ? "22.5%" : "26.5%",
        }}
      >
        <div className="object-label">little sleepy cat</div>

        <img
          src={nightMode ? catHitbox_night : catHitbox_day}
          alt=""
          className="object-hover"
          onClick={async () => {
            await loadCatMemories();
            setCatOpen(true)

          }}
        />
      </div>

      {/* GUITAR */}
      <div
        className="object-wrapper"
        onMouseEnter={playHoverSound}
        style={{
          left: nightMode ? "64%" : "68%",
          top: nightMode ? "22%" : "24%",
          width: nightMode ? "13.3%" : "14.3%",
        }}
      >
        <div className="object-label">strings that remember</div>

        <img
          src={guitarHitbox}
          alt=""
          className="object-hover"
          onClick={openGuitar}
        />
      </div>

      {/* GIFT */}
      <div
        className="object-wrapper"
        onMouseEnter={playHoverSound}
        style={{
          left: nightMode ? "39%" : "43.5%",
          top: nightMode ? "42.5%" : "43.5%",
          width: nightMode ? "31%" : "32%",
        }}
      >
        <div className="object-label">pieces of her</div>

        <img
          src={nightMode ? giftHitbox_night : giftHitbox_day}
          alt=""
          className="object-hover"
          onClick={async () => {
            await loadPhotos();
            setGiftOpen(true);
          }}
        />
      </div>

      {/* PHOTOS */}
      <div
        className="object-wrapper object-wrapper-bottom"
        onMouseEnter={playHoverSound}
        style={{
          left: nightMode ? "30%" : "32.5%",
          top: nightMode ? "2%" : "1%",
          width: nightMode ? "42%" : "46.5%",
        }}
      >
        <div className="object-label">
          pieces of us
        </div>

        <img
          src={
            nightMode
              ? photoHitbox_night
              : photoHitbox_day
          }
          alt=""
          className="object-hover"
          onClick={async () => {
            await loadPhotos();
            setPhotosOpen(true);
          }}
        />
      </div>

      {/* NIGHT MODE */}
      <div
        className="object-wrapper"
        onMouseEnter={playHoverSound}
        style={{
          left: nightMode ? "91%" : "92.2%",
          top: nightMode ? "72%" : "78.5%",
          width: nightMode ? "8%" : "8%",
        }}
      >
        <div className="object-label">change the light</div>

        <img
          src={nightMode ? modeHitbox_night : modeHitbox_day}
          alt=""
          className="object-hover"
          onClick={() => setNightMode(!nightMode)}

          onMouseDown={() => {
            const timeout = setTimeout(() => {
              triggerEnding();
            }, 6000);

            setHoldTimeout(timeout);
          }}

          onMouseUp={() => {
            clearTimeout(holdTimeout);
          }}

          onMouseLeave={() => {
            clearTimeout(holdTimeout);
          }}
        />
      </div>

      {/* LETTERS */}
      <div
        className="object-wrapper"
        onMouseEnter={playHoverSound}
        style={{
          left: nightMode ? "27.5%" : "44%",
          top: nightMode ? "76%" : "79%",
          width: nightMode ? "31%" : "32%",
        }}
      >
        <div className="object-label">words I kept</div>

        <img
          src={nightMode ? letterHitbox_night : letterHitbox_day}
          alt=""
          className="object-hover"
          onClick={async () => {
            await loadLetters();
            setLettersOpen(true)}}
        />
      </div>

      {/* MUSIC */}
      <div
        className="object-wrapper"
        onMouseEnter={playHoverSound}
        style={{
          left: nightMode ? "49%" : "51.5%",
          top: nightMode ? "36.5%" : "35.7%",
          width: nightMode ? "16%" : "17.5%",
        }}
      >
        <div className="object-label">songs we left</div>

        <img
          src={nightMode ? songHitbox_night : songHitbox_day}
          alt=""
          className="object-hover"
          onClick={async () => {
            await loadSongs();
            setSongsOpen(true)}}
        />
      </div> 
      </div>

      <GuitarModal
        open={guitarOpen}
        onClose={() => {
          setGuitarOpen(false);

          const audio = document.getElementById("bg-audio");

          if (audio && bgMusicOn) {
            audio.play();
          }
        }}
        memories={guitarMemories}
      />

      <LettersModal
        open={lettersOpen}
        onClose={() => setLettersOpen(false)}
        letters={letters}
      />

      <SongModal
        open={songsOpen}
        onClose={() => setSongsOpen(false)}
        songs={songs}
      />

      <PhotoModal
        open={photosOpen}
        onClose={() => setPhotosOpen(false)}
        photos={normalPhotos}
      />

      <ComputerModal
        open={computerOpen}
        onClose={() => setComputerOpen(false)}
        memories={computerMemories}
      />

      <CatModal
        open={catOpen}
        onClose={() => setCatOpen(false)}
        memories={catMemories}
      />

      <GiftModal
        open={giftOpen}
        onClose={() => setGiftOpen(false)}
        photos={giftPhotos}
      />

      <BoardModal
        open={boardOpen}
        onClose={() => setBoardOpen(false)}
        boards={boardMemories}
      />

      {endingMode && (
        <div className="ending-overlay">

          <p className="ending-small">
            ห้องนี้มันจะปิดลงแล้วนะ
          </p>

          <h1>
            แต่บางอย่าง
            <br />
            จะยังอยู่ตรงนี้เสมอเลยนะครับ
          </h1>

        </div>
      )}
    </div>
  );
}

export default Room;