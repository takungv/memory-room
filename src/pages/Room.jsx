import { useEffect, useState } from "react";
import api from "../services/api";

const cozyAudio = "https://res.cloudinary.com/dwcwppo6n/video/upload/q_auto/f_auto/v1778768724/cozy_znbc51.mp3"
const nightAudio = "https://res.cloudinary.com/dwcwppo6n/video/upload/q_auto/f_auto/v1778768848/night_nymfzi.mp3"

const aniversaryAudio = "https://res.cloudinary.com/dwcwppo6n/video/upload/v1784128339/ani_kgggxb.mp3"

const hoverAudio = "https://res.cloudinary.com/dwcwppo6n/video/upload/q_auto/f_auto/v1778769050/hover_xk4vxd.mp3"

const roomDay =  "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765106/light_m0a890.png"
const roomNight = "https://res.cloudinary.com/dwcwppo6n/image/upload/v1778765108/night_wndh4z.png"

// BIRTHDAY EVENT
const birthdayRoomDay = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779724579/birthday-room-day_vpnpv7.png"
const birthdayRoomNight = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779724580/birthday-room-night_mrvgcw.png"

const catHitboxBDDay = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779732860/cat-bd-hitbox-day_ox8ti9.png"
const catHitboxBDNight = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779732862/cat-bd-hitbox-night_nj0oyo.png"

const songHitbox_day_bd = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779736273/song-bd-hitbox-day_wdhcw8.png"
const songHitbox_night_bd ="https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779737169/song-bd-hitbox-night_usuakx.png"

const letterHitbox_day_bd = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779736271/letter-bd-hitbox-day_hm6nnt.png"
const letterHitbox_night_bd ="https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779737057/letter-bd-hitbox-night_xphzpu.png"

const giftHitbox_day_bd = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779736268/gift-bd-hitbox-day_l363f8.png"
const giftHitbox_night_bd = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779738938/gift-bd-hitbox-night_roz8nv.png"

const boardHitbox_day_bd = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779736266/board-bd-hitbox-day_beycln.png"
const boardHitbox_night_bd = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779736991/board-bd-hitbox-night_gtk1ad.png"

const guitarHitbox_day_bd = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779736269/guitar-bd-hitbox-day_ekaq7z.png"
const guitarHitbox_night_bd = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779737054/guitar-bd-hitbox-night_wdzglz.png"

const computerHitbox_day_bd = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779736267/computer-bd-hitbox-day_cjtlmq.png"
const computerHitbox_night_bd = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779737050/computer-bd-hitbox-night_jgpo0h.png"

const giftboxHitbox_day = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779822070/giftbox-day_mdb31o.png"
const giftboxHitbox_night = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1779822071/giftbox-night_lzy5eu.png"

const birthdayMusic = "https://res.cloudinary.com/dwcwppo6n/video/upload/q_auto/f_auto/v1780167046/Happy_Birthday_Piano_Version_yrbrn0.mp3"

///////////////////
const aniversary_speaker = "https://res.cloudinary.com/dwcwppo6n/image/upload/v1784122738/speaker_jenn5c.png"
const aniversary_poloroid_day = "https://res.cloudinary.com/dwcwppo6n/image/upload/v1784122740/aniver_day_akzsao.png"
const aniversary_poloroid_night = "https://res.cloudinary.com/dwcwppo6n/image/upload/v1784122739/aniver_night_j5dfau.png"

const aniversary_ending = "https://res.cloudinary.com/dwcwppo6n/video/upload/v1784126604/output_pdtnza.mp4"

const guitarHitbox = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765158/guitar-hitbox-light_igspyv.png"

const modeHitbox_day = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765107/mode-hitbox-day_d1dkwp.png"
const modeHitbox_night = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765106/mode-hitbox-night_hhpdi2.png"

const songHitbox_day = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765107/song-hitbox-day_obtnhz.png"
const songHitbox_night = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765108/song-hitbox-night_luscdf.png"

const giftHitbox_day = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765105/giftHitbox-day_jrjeeb.png"
const giftHitbox_night = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765105/giftHitbox-night_ecc8wi.png"

const letterHitbox_day = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765105/letterHitbox-day_ykwzqp.png"
const letterHitbox_night = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765105/letterHitbox-night_j4m3xl.png"

const photoHitbox_day = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765107/photoHitbox-day_f9xcmp.png"
const photoHitbox_night = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765107/photoHitbox-night_t4irwa.png"

const computerHitbox_day = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765106/computerHitbox-day_ynuocj.png"
const computerHitbox_night = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765106/computerHitbox-night_skb2lh.png"

const catHitbox_day = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765106/catHitbox-day_hjcvbg.png"
const catHitbox_night = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765106/catHitbox-night_cxxzzp.png"

const boardHitbox_day = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765104/boardHitbox-day_rlsean.png"
const boardHitbox_night = "https://res.cloudinary.com/dwcwppo6n/image/upload/q_auto/f_auto/v1778765106/boardHitbox-night_btwewl.png"

//ANIVERSARY

import GuitarModal from "../components/GuitarModal";
import LettersModal from "../components/LettersModal";
import SongModal from "../components/SongModal";
import PhotoModal from "../components/PhotoModal";
import ComputerModal from "../components/ComputerModal";
import CatModal from "../components/CatModal";
import GiftModal from "../components/GiftModal";
import BoardModal from "../components/BoardModal";
import GiftboxModal from "../components/GiftboxModal";
import TimelineModal from "../components/TimelineModal";
import AniversaryCLIPModal from "../components/AniversaryCLIPModal";


function Room({ roomData }) {

  const [endingMode, setEndingMode] = useState(false);
  const [birthdayMode, setBirthdayMode] = useState(false);

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

  const [birthdayPhotos, setBirthdayPhotos] = useState(
    roomData?.birthdayPhotos || []
  );

  const [currentMusic, setCurrentMusic] = useState(cozyAudio);



  

  const switchToGiftboxMusic = () => {
    const bgAudio =
      document.getElementById("bg-audio");
  
    if (!bgAudio) return;
  
    bgAudio.src = birthdayMusic;
    bgAudio.load();
    bgAudio.play();
  };
  


  const [guitarOpen, setGuitarOpen] = useState(false);
  const [lettersOpen, setLettersOpen] = useState(false);
  const [songsOpen, setSongsOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [computerOpen, setComputerOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [boardOpen, setBoardOpen] = useState(false);

  const [giftboxOpen, setGiftboxOpen] = useState(false);
  const [giftboxPhotos, setGiftboxPhotos] = useState([]);

  const [roomImagesReady, setRoomImagesReady] = useState(false);

//ANIVEFSARY
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [aniversaryspeakerOpen, setAniversarySpeakerOpen] = useState(false);


  //welcome message
  const [welcomeMessage, setWelcomeMessage] = useState(false);

  const [birthdaySceneActive, setBirthdaySceneActive] = useState(false);

  const today = new Date();

  const isBirthdayToday =
  today.getMonth() + 1 === 6 &&
  today.getDate() === 1;

const effectiveBirthday =
  (birthdaySceneActive && isBirthdayToday) || birthdayMode;


  const normalPhotos = photos.filter((p) => p.category === "photo");
  const giftPhotos = photos.filter((p) => p.category === "gift");

  // =========================
// LOAD ONLY WHEN OPEN
// =========================

const loadGuitarMemories = async () => {
  if (guitarMemories.length > 0) return;

  const res = await api.get("api/Memories/guitar");
  setGuitarMemories(res.data);
};

const loadLetters = async () => {
  if (letters.length > 0) return;

  const res = await api.get("api/Letters");
  setLetters(res.data);
};

const loadSongs = async () => {
  if (songs.length > 0) return;

  const res = await api.get("api/Songs");
  setSongs(res.data);
};

const loadPhotos = async () => {
  if (photos.length > 0) return;

  const res = await api.get("api/Photos");
  setPhotos(res.data);
};

const loadComputerMemories = async () => {
  if (computerMemories.length > 0) return;

  const res = await api.get("api/Memories/computer");
  setComputerMemories(res.data);
};

const loadCatMemories = async () => {
  if (catMemories.length > 0) return;

  const res = await api.get("api/Memories/cat");
  setCatMemories(res.data);
};

const loadBoardMemories = async () => {
  if (boardMemories.length > 0) return;

  const res = await api.get("api/Memories/board");
  setBoardMemories(res.data);
};


const loadGiftboxPhotos = async () => {
  try {
    const res = await api.get("api/GiftboxPhotos");

    console.log(res.data);

    setGiftboxPhotos(res.data);
  } catch (err) {
    console.log(err);
  }
};


const handleLetterEvent = (Event) => {
  if (Event === "birthday_room_unlock") {
    const isBirthdayToday =
      new Date().getMonth() + 1 === 6 &&
      new Date().getDate() === 1;

    if (isBirthdayToday) {
      setBirthdaySceneActive(true);
    }
  }
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
    const images = [roomDay, roomNight, birthdayRoomDay, birthdayRoomNight];
  
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeMessage(false);
    }, 15000);
  
    return () => clearTimeout(timer);
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
    const audio = new Audio(hoverAudio);
  
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

  const changeMusic = (newMusic) => {

    const audio = document.getElementById("bg-audio");
  
    if (!audio) return;
  
    let volume = audio.volume;
  
    const fadeOut = setInterval(() => {
  
      if (volume > 0.02) {
  
        volume -= 0.02;
        audio.volume = volume;
  
      } else {
  
        clearInterval(fadeOut);
  
        audio.pause();
  
        audio.src = newMusic;
  
        audio.load();
  
        audio.volume = 0;
  
        audio.play();
  
        let fadeInVolume = 0;
  
        const fadeIn = setInterval(() => {
  
          if (fadeInVolume < 0.19) {
  
            fadeInVolume += 0.02;
  
            audio.volume = fadeInVolume;
  
          } else {
  
            clearInterval(fadeIn);
  
          }
  
        }, 120);
  
      }
  
    }, 120);
  
  };

  return (
    
    
    <div className="room">
      {!roomImagesReady && (
        <div className="room-waiting">
          preparing the room...
        </div>
        
      )}
      {welcomeMessage && (
        <div className="welcome-overlay">
          <div className="welcome-box">
            <div className="welcome-hydrangea">
              {[...Array(18)].map((_, i) => (
                <span
                  key={i}
                  className="hydrangea"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 12}s`,
                    animationDuration: `${12 + Math.random() * 8}s`,
                    transform: `scale(${0.6 + Math.random() * 0.8})`,
                  }}
                />
              ))}
          </div>
            <p className="welcome-small">
              before you stay here for a while...
            </p>

            <h1>
            เรื่องที่อยากบอกในวันที่เค้าทำพลาด...
            </h1>

            <p className="welcome-text">
              เค้ารู้ครับว่าเค้าทำพลาดแบบไหน
              <br />
              เค้าไม่มีอะไรจะบอกเธอนอกจาก..
              <br />
              เค้าขอโทษครับที่เค้าเลือกที่จะบอกเธอไม่หมด
              <br />
              ...ขอโทษจากใจจริงครับ
              <br />
              เค้าไม่ได้ทำอันนี้มาเพื่อขอให้เธอให้อภัยเค้า
              <br />
              เค้าแค่ต้องการให้เธอรู้ว่าเค้าเสียใจจริง ๆ และเค้าจะไม่ทำแบบนี้อีก
              <br />
              เค้ารักเธอนะครับ
              
            </p>

            <p className="welcome-end">
              จดหมายฉบับนี้...
              <br />
              เค้าใส่มันในกล่องจดหมายแล้วนะครับ 🤍
            </p>
          </div>
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
          src={
            effectiveBirthday ? birthdayRoomDay : roomDay
          }
          alt=""
          className={`room-image ${
            nightMode ? "fade-out" : "fade-in"
          }`}
        />

        <img
          src={
            effectiveBirthday ? birthdayRoomNight : roomNight
          }
          alt=""
          className={`room-image ${
            nightMode ? "fade-in" : "fade-out"
          }`}
        />
      </div>

      {/* AUDIO */}
      <audio
        id="bg-audio"
        src={currentMusic}
        loop
        autoPlay
      />

      <audio
        id="night-ambient"
        src={nightAudio}
        loop
      />

      <button className="bg-music-button" onClick={toggleBackgroundMusic}
      onMouseDown={() => {
        const timeout = setTimeout(() => {
          setBirthdayMode(true);
        }, 6000);

        setHoldTimeout(timeout);
      }}

      onMouseUp={() => {
        clearTimeout(holdTimeout);
      }}

      onMouseLeave={() => {
        clearTimeout(holdTimeout);
      }}
      
      >
        {bgMusicOn
          ? "♪ The room is quietly playing"
          : "♪ Play the songs left in this room"}
        
      </button>
      

      {/* COMPUTER */}
      <div
        className="object-wrapper"
        onMouseEnter={playHoverSound}
        style={{
          left : effectiveBirthday
            ? (nightMode ? "8%" : "6.8%") // BIRTHDAY EVENT
            : (nightMode ? "8%" : "7.5%"), //NORMAL
          top : effectiveBirthday
            ? (nightMode ? "24%" : "25.5%") //BIRTHDAY EVENT
            : (nightMode ? "24%" : "27%"), //NORMAL
          width : effectiveBirthday
            ? (nightMode ? "22.2%" : "20.5%") // BIRTHDAY EVENT
            : (nightMode ? "22.2%" : "24.5%"), //NORMAL

        }}
      >
        <div className="object-label">late night games</div>

        <img
          src={effectiveBirthday
            ? (nightMode
                ? computerHitbox_night_bd
                : computerHitbox_day_bd
            )
            : (nightMode
                ? computerHitbox_night
                : computerHitbox_day
            )
          }
          alt=""
          
          className="object-hover"
          onClick={async () => {
            await loadComputerMemories();

            setComputerOpen(true);
          }}
        />
      </div>

      {/* BIRTHDAY EVENT */}
      {/* BIRTHDAY GIFT */}
      {effectiveBirthday && (
        <div
          className="object-wrapper"
          onMouseEnter={playHoverSound}
          style={{
            left: nightMode ? "44.4%" : "43%",
            top: nightMode ? "59.6%" : "60%",
            width: nightMode ? "17%" :"19%",
          }}
        >
          <div className="object-label">
            for her birthday
          </div>

          <img
            src={nightMode ? giftboxHitbox_night : giftboxHitbox_day}
            alt=""
            className="object-hover"
            onClick={async () => {
              await loadGiftboxPhotos();
            
              setGiftboxOpen(true);
            }}
          />
        </div>
      )}

      {/* BOARD */}
      <div
        className="object-wrapper"
        onMouseEnter={playHoverSound}
        style={{
          left : effectiveBirthday
            ? (nightMode ? "79%" : "83%") // BIRTHDAY EVENT
            : (nightMode ? "79%" : "83.5%"), //NORMAL
          top : effectiveBirthday
            ? (nightMode ? "22.4%" : "24%") //BIRTHDAY EVENT
            : (nightMode ? "22.4%" : "22.1%"), //NORMAL
          width : effectiveBirthday
            ? (nightMode ? "21%" : "17%") // BIRTHDAY EVENT
            : (nightMode ? "21%" : "17%"), //NORMAL
        }}
      >
        <div className="object-label">things we made</div>

        <img
          src={
            effectiveBirthday
            ? (nightMode
                //BIRTHDAY EVENT
                ? boardHitbox_night_bd
                : boardHitbox_day_bd
            )
            : (nightMode
                //NORMAL
                ? boardHitbox_night
                : boardHitbox_day
            )
          }
          alt=""
          className="object-hover"
          onClick={async () => {
            await loadBoardMemories();
            setBoardOpen(true)
          }}
        />
      </div>
    

      {/*ANIVERSARY POLAROID*/}
      <div
        className="object-wrapper"
        onMouseEnter={playHoverSound}
        style={{
          left: nightMode ? "57%" : "27%",
          top: nightMode ? "86%" : "90%",
          width: nightMode ? "12%" : "16%",
        }}
      >
        <div className="object-label">
          for our anniversary
        </div>

        <img
          src={nightMode ? aniversary_poloroid_night : aniversary_poloroid_day}
          alt=""
          className="object-hover"
          onClick={() => {
            changeMusic(aniversaryAudio);
            setTimelineOpen(true);
          }}
        />
      </div>

      {/* ANIVERSARY SPEAKER */}
      {aniversary_speaker && nightMode && (
        <div
          className="object-wrapper"
          onMouseEnter={playHoverSound}
          style={{
            left: "77%",
            top: "55%",
            width: "18%",
          }}
        >
          <div className="object-label">
            My voice for you.
          </div>

          <img
            src={aniversary_speaker}
            alt=""
            className="object-hover"
            onClick={() => setAniversarySpeakerOpen(true)}
          />
        </div>
      )}

      {/* CAT */}
      <div
        className="object-wrapper"
        onMouseEnter={playHoverSound}
        style={{
          left : effectiveBirthday
            ? (nightMode ? "35%" : "35%") // BIRTHDAY EVENT
            : (nightMode ? "1%" : "0%"), //NORMAL
          top : effectiveBirthday
            ? (nightMode ? "52%" : "50%") //BIRTHDAY EVENT
            : (nightMode ? "68%" : "67%"), //NORMAL
          width : effectiveBirthday
            ? (nightMode ? "12%" : "13%") // BIRTHDAY EVENT
            : (nightMode ? "22.5%" : "26.5%"), //NORMAL

        }}
      >
        <div className="object-label">little sleepy cat</div>

        <img
          src={
            effectiveBirthday
            ? (nightMode
                ? catHitboxBDNight
                : catHitboxBDDay
            )
            : (
              nightMode
                ? catHitbox_night
                : catHitbox_day
            )

          }
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
          left : effectiveBirthday
            ? (nightMode ? "63%" : "66%") // BIRTHDAY EVENT
            : (nightMode ? "64%" : "68%"), //NORMAL
          top : effectiveBirthday
            ? (nightMode ? "22%" : "22%") //BIRTHDAY EVENT
            : (nightMode ? "22%" : "24%"), //NORMAL
          width : effectiveBirthday
            ? (nightMode ? "15.3%" : "15.5%") // BIRTHDAY EVENT
            : (nightMode ? "13.3%" : "14.3%"), //NORMAL
        }}
      >
        <div className="object-label">strings that remember</div>

        <img
          src={
            effectiveBirthday
            ? (nightMode
                ? guitarHitbox_night_bd
                : guitarHitbox_day_bd
            )
            : guitarHitbox
          }
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
          left : effectiveBirthday
            ? (nightMode ? "39%" : "43.5%") // BIRTHDAY EVENT
            : (nightMode ? "39%" : "43.5%"), //NORMAL
          top : effectiveBirthday
            ? (nightMode ? "42.5%" : "41.5%") //BIRTHDAY EVENT
            : (nightMode ? "42.5%" : "43.5%"), //NORMAL

          width : effectiveBirthday
            ? (nightMode ? "31%" : "32%") // BIRTHDAY EVENT
            : (nightMode ? "31%" : "32%"), //NORMAL
        }}
      >
        <div className="object-label">pieces of her</div>

        <img
          src={
            effectiveBirthday
            ? (nightMode
                ? giftHitbox_night_bd
                : giftHitbox_day_bd
            )
            : (
              nightMode
                ? giftHitbox_night
                : giftHitbox_day
            )
          }
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
          left : effectiveBirthday
            ? (nightMode ? "27.5%" : "48%") // BIRTHDAY EVENT
            : (nightMode ? "27.5%" : "44%"), //NORMAL
          top : effectiveBirthday
            ? (nightMode ? "76%" : "80%") // BIRTHDAY EVENT
            : (nightMode ? "76%" : "79%"), //NORMAL
          width : effectiveBirthday
            ? (nightMode ? "31%" : "33%") // BIRTHDAY EVENT
            : (nightMode ? "31%" : "32%"), //NORMAL

        }}
      >
        <div className="object-label">words I kept</div>

        <img
          src={
            effectiveBirthday
            ? (nightMode
                ? letterHitbox_night_bd
                : letterHitbox_day_bd
            )
            : (nightMode
                ? letterHitbox_night
                : letterHitbox_day
            )
          }
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
          left : effectiveBirthday
            ? (nightMode ? "49%" : "51.5%") // BIRTHDAY EVENT
            : (nightMode ? "49%" : "51.5%"), //NORMAL
          top : effectiveBirthday
            ? (nightMode ? "36.5%" : "33.7%") // BIRTHDAY EVENT
            : (nightMode ? "36.5%" : "35.7%"), //NORMAL
          width : effectiveBirthday
            ? (nightMode ? "16%" : "17.5%") // BIRTHDAY EVENT
            : (nightMode ? "16%" : "17.5%"), //NORMAL

        }}
      >
        <div className="object-label">songs we left</div>

        <img
          src={
            effectiveBirthday
            ? (nightMode
                ? songHitbox_night_bd
                : songHitbox_day_bd
            )
            : (nightMode
                ? songHitbox_night
                : songHitbox_day
            )
          }
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
        onLetterEvent={handleLetterEvent}
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

        <GiftboxModal
          open={giftboxOpen}
          onClose={() => setGiftboxOpen(false)}
          photos={giftboxPhotos}
          onOpenGiftBox={switchToGiftboxMusic}
        />
      <TimelineModal 
        open={timelineOpen}
        onClose={() => setTimelineOpen(false)}
      />
      <AniversaryCLIPModal
        open={aniversaryspeakerOpen}
        onClose={() => setAniversarySpeakerOpen(false)}
        src={aniversary_ending}
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