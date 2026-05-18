import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TypewriterText from "../components/TypewriterText";

import "./SecretRoom.css";

const nightAudio = "https://res.cloudinary.com/dwcwppo6n/video/upload/q_auto/f_auto/v1778768848/night_nymfzi.mp3"

const hoverAudio =
  "https://res.cloudinary.com/dwcwppo6n/video/upload/q_auto/f_auto/v1778769050/hover_xk4vxd.mp3";

function SecretRoom() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const mainAudioRef = useRef(null);
  const nightAudioRef = useRef(null);

  const [fadeIn, setFadeIn] = useState(false);

  const [windowOpen, setWindowOpen] = useState(false);
  const [carpetOpen, setCarpetOpen] = useState(false);
  const [carpetHover, setCarpetHover] = useState(false);

  const [welcomeMessage, setWelcomeMessage] = useState(true);



  const playHoverSound = () => {
    const audio = new Audio(hoverAudio);
    audio.volume = 0.3;
    audio.currentTime = 0;
    audio.play();x
  };

  useEffect(() => {
    const main = mainAudioRef.current;
    const night = nightAudioRef.current;
  
    if (!main || !night) return;
  
    main.volume = 0.02;   // ambience เบา
    night.volume = 0.03;  // layer อีกชั้น
  
    const play = async () => {
      try {
        await main.play();
        await night.play();
      } catch (err) {
        console.log("Autoplay blocked");
      }
    };
  
    play();
  
    return () => {
      main.pause();
      night.pause();
    };
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeMessage(false);
    }, 11000); // ปรับเวลาได้
  
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100); // หน่วงนิดเดียวให้ render ก่อน
  
    return () => clearTimeout(timer);
  }, []);

  const carpetText = `
สิ่งที่มันอยู่ใต้พรม
--------------------------
เค้าฟังคลิปที่เธอส่งให้หมดแล้วนะ เค้ารู้สึกผิดมากอย่างบอกไม่ถูก
เค้าได้แต่นั่งฟังมันซ้ำๆ แล้วก็คิดว่าทำไมเค้าไม่อยู่กับเธอนะ
ทำไมคนที่เค้าบอกว่ารักถึงร้องไห้ขนาดนี้

ตรงนี้…ไม่ใช่ที่สำหรับซ่อนอะไรอีกแล้ว

เค้าเคยคิดว่าแค่ “เงียบไว้” มันจะทำให้ทุกอย่างดีขึ้นเอง

แต่มันไม่ได้ดีขึ้นเลย  
มันแค่ถูกเหยียบไว้ข้างใต้พรมนี้

เค้าขอโทษนะ  
สำหรับทุกความรู้สึกที่เธอต้องแบกไว้

เค้าไม่ได้อยากให้เธอรู้สึกไม่ปลอดภัยกับเค้าเลย
ถ้ามันเคยทำให้เธอเสียใจ  
เค้าขอโทษจริงๆ

จากนี้ไป  
เค้าจะไม่ซ่อนอะไรไว้อีกแล้ว

ถ้าเธอจะร้องไห้ เค้าก็จะอยู่ตรงนั้นข้างๆเธอ
จะนั่งฟังเธอร้องไห้ ต่อให้เค้าจะปลอบไม่ได้
เค้าก็จะนั่งร้องไห้ไปพร้อมกับเธอ
ไม่ปล่อยให้เธออยู่คนเดียวอีกแล้วนะ

เค้าเลือกจะพูดมัน แม้มันจะยาก  
เพราะเค้าไม่อยากเสียเธอไปเพราะความเงียบของตัวเอง

มันไม่มีปัญหาอะไรที่อยู่ใต้พรมแล้วนะครับ
เค้าไม่รู้ว่าอ่านมาถึงจุดนี้เธอจะมีน้ำตาไหม
แต่เค้าอยากให้เธอรู้ว่าเค้าเสียใจมากจริงๆ
ถ้ากำลังร้องไห้อยู่ตอนที่อ่าน (เค้าไม่ได้อยากให้ร้องไห้)
เค้าขอโทษนะครับ ที่สุดท้ายเค้าก็ทำให้เธอต้องร้องไห้แบบนี้
.
.
.
.
มาถึงจุดล่างสุดของพรมแล้วนะ
จุดล่างสุดของพรมมันก็ยังมีความรักศึกที่เค้ามีให้เธอจริงๆนะ
เค้ารักเธอนะ
`;

  const windowText = `
ส่ิงที่เค้าอยากไปแก้ไข
___________________
เค้าคิดอยู่บ่อยมากเลยนะ ในหลายๆคืน

ว่าถ้าย้อนกลับไปได้จริงๆ
เค้าจะทำทุกอย่างให้มันดีกว่านี้

อยากทำให้เธอรู้สึกปลอดภัยมากกว่านี้
อยากจะย้อนกลับไปให้ตัวเองไม่ทำเรื่องแย่ๆ
อยากจะย้อนกลับไปบอกรักเธอมากกว่านี้
อยากจะย้อนกลับไปดูแลเธอให้ดีกว่านี้
อยากจะย้อนกลับไปอยู่กับเธอในคืนที่เธอร้องไห้
อยากย้อนกลับไปเที่ยวกับเธอให้มากกว่านี้
อยากถ่ายรูปกับเธอมากกว่านี้จัง

อยากจะย้อนกลับไปทำให้มันดีกว่านี้จังเลยนะ
เค้าอยากกลับไปเป็นคนที่ไม่ทำให้เธอต้องเสียใจแบบนี้

บางคืนเค้าก็ได้แต่นั่งคิดเงียบๆ นอนคิดอยู่เงียบๆ
ว่าถ้าวันนั้นเค้าดีกว่านี้ ทุกอย่างจะเปลี่ยนไหมนะ

เค้ามองหน้าต่างนี้ไปถึงอนาคตด้วยนะ
เค้าอยากมีเธออยู่ในอนาคตของเค้า

อยากกอดเธอจังเลยครับ
มองหน้าต่างบานนี้แล้วมันก็คิดถึงนะ
คิดถึงวันที่ไปคาเฟ่ด้วยกัน วันที่เราไปซื้อของกินกัน
วันที่เค้านั่งรถไปหาเธอ
วันที่เธอนั่งรถมาหาเค้า
วันที่ไปหาหมอด้วยกัน
วันที่เค้านั่งช่วยเธอทำงาน
ถึงแม้ความทรงจำพวกนี้มันจะมีรสขมบ้าง
แต่เค้าคิดถึงมันมากๆเลยนะ

คิดถึงจังเลยนะ
คิดถึงเธอจังครับ...


`;

  return (
    
    <div className={`secret-room ${fadeIn ? "fade-in" : ""}`}>

      {/* ROOM IMAGE */}
      <img
        src="/images/hidden-room.PNG"
        alt=""
        className="secret-room-image"
      />

      {/* AUDIO */}
      <audio
        ref={mainAudioRef}
        src="/audio/secret-room.mp3"
        loop
      />

      <audio
        ref={nightAudioRef}
        src={nightAudio}
        loop
      />

      {/* ===== BG MOOD LAYERS ===== */}
      <div className="secret-noise" />
      <div className="secret-vignette" />
      <div className="secret-fog" />
      <div className="secret-light" />
      <div className="secret-dust" />

      {welcomeMessage && (
      <div className="welcome-overlay">
        <div className="welcome-box">

          <p className="welcome-small">
            before you go inside...
          </p>

          <h1>
            เค้าไม่รู้ว่าตอนนี้เธอกำลังรู้สึกยังไง<br />
            แต่ขอบคุณที่ยังเปิดเข้ามานะ
          </h1>

          <p className="welcome-text">
            ที่นี่อาจมีบางอย่างที่ทำให้เธอเจ็บอยู่  
            เค้าไม่ได้ตั้งใจให้มันเป็นแบบนั้นเลย  

            <br /><br />

            ถ้ามันหนักไป  
            ปิดมันเมื่อไหร่ก็ได้นะ  
            เค้าเข้าใจ
          </p>

          <p className="welcome-end">
            เค้าอยู่ตรงนี้เหมือนเดิม
          </p>

        </div>
      </div>
    )}

      {/* ===== CARPET ===== */}
      <div
        className="object-wrapper carpet-zone"
        onMouseEnter={() => {
          playHoverSound();
          setCarpetHover(true);
        }}
        onMouseLeave={() => setCarpetHover(false)}
        style={{
          left: "11%",
          top: "55%",
          width: "50%",
        }}
      >
        <div className="object-label">
          {carpetHover
            ? "don’t hide it anymore..."
            : "something under the surface"}
        </div>

        <img
          src="/images/carpet-hitbox.png"
          alt=""
          className="object-hover"
          onClick={() => setCarpetOpen(true)}
        />
      </div>

      {/* ===== WINDOW ===== */}
      <div
        className="object-wrapper window-wrapper"
        onMouseEnter={playHoverSound}
        style={{
          position: "absolute",
          left: "8%",
          top: "0%",
          width: "25%",
          zIndex: 50,
        }}
      >
        <div className="object-label">
          things i wish i fixed sooner
        </div>

        <img
          src="/images/window-hitbox.png"
          alt=""
          className="object-hover"
          onClick={() => setWindowOpen(true)}
        />
      </div>

      {/* ===== WINDOW MODAL ===== */}
      {windowOpen && (
        <div
          className="window-memory-backdrop"
          onClick={() => setWindowOpen(false)}
        >
          <div
            className="window-memory-card"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="window-memory-small">
              outside was raining that night
            </p>

            <div className="window-scroll-area">
              <TypewriterText text={windowText} speed={20} />
            </div>

            <button
              className="secret-close-button"
              onClick={() => setWindowOpen(false)}
            >
              close
            </button>
          </div>
        </div>
      )}

      {/* ===== CARPET MODAL ===== */}
      {carpetOpen && (
        <div
          className="window-memory-backdrop"
          onClick={() => setCarpetOpen(false)}
        >
          <div
            className="window-memory-card carpet-card"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="window-memory-small">
              something was always under our steps
            </p>

            <div className="window-scroll-area">
              <TypewriterText text={carpetText} speed={22} />
            </div>

            <button
              className="secret-close-button"
              onClick={() => setCarpetOpen(false)}
            >
              close
            </button>
          </div>
        </div>
      )}

      {/* BACK */}
      <button
        className="secret-back-button"
        onClick={() => navigate("/room")}
      >
        ← back
      </button>
    </div>
  );
}

export default SecretRoom;