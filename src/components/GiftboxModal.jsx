import { useEffect, useState, useRef } from "react";

import "./GiftboxModal.css";

const openSound = "https://res.cloudinary.com/dwcwppo6n/video/upload/q_auto/f_auto/v1780167046/Happy_Birthday_Piano_Version_yrbrn0.mp3";

function GiftboxModal({ open, onClose, photos = [], onOpenGiftBox }) {

  const [showMessage, setShowMessage] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [collectPhotos, setCollectPhotos] = useState(false);
  const [showText, setShowText] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const audioRef = useRef(null);
  useEffect(() => {
    if (!open) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      return;
    }
  
    console.log("🎁 giftbox opened");
  
    const audio = new Audio(openSound);
  
    audio.volume = 0.4;
  
    audio.addEventListener("loadeddata", () => {
      console.log("🎵 audio loaded");
  
      audio.currentTime = 2.6;
  
      audio.play()
        .then(() => console.log("▶️ playing"))
        .catch((err) => console.log("❌ play error", err));
    });
  
    audioRef.current = audio;
  
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
  
    setShowMessage(true);
    setVisibleCount(0);
    setCollectPhotos(false);
    setShowText(false);
    setCanClose(false);
  
    let current = 0;
    
    if (!photos || photos.length === 0) return;
  
    const interval = setInterval(() => {
      current++;
  
      setVisibleCount(current);
  
      if (current >= photos.length) {
        clearInterval(interval);
        
        setTimeout(() => {

          setCollectPhotos(true);
        
        }, 10000);
        
        setTimeout(() => {
        
        }, 10000); // เริ่มลงกล่อง
        
        setTimeout(() => {
        
          setShowText(true);
          setCanClose(true);
        
        }, 13000); // ลงกล่องเสร็จแล้วค่อยโชว์ข้อความ
      }
    }, 2500);
  
    return () => clearInterval(interval);
  
  }, [open, photos]);

  if (!open) return null;

  return (
    <div
      className="giftbox-overlay"
      onClick={() => {
        console.log("overlay clicked", canClose);
      
        if (canClose) {
          onClose?.();
        }
      }}
    >

      <div
        className="giftbox-modal"
        onClick={(e) => e.stopPropagation()}
      >


        {/* BOX */}
        <div className={`giftbox-container ${
          collectPhotos ? "collecting" : ""
         }`} 
        >

          <div className="giftbox-lid" />

          <div className="giftbox-body" />

            <div className="giftbox-ribbon-vertical" />
            <div className="giftbox-ribbon-horizontal" />



        </div>

        {/* TEXT */}
        {showMessage && (
          <div
            className={`giftbox-photos ${
              collectPhotos ? "collecting" : ""
            }`}
          >
            {(() => {

              const currentPhotos = photos.slice(0, visibleCount);

              return currentPhotos.map((photo, index) => {

                const total = photos.length;

                const t = (index / total) * Math.PI * 2;

                const scale = 16;

                const x =
                  scale *
                  18 *
                  Math.pow(Math.sin(t), 3)
                  + -100;

                const y =
                  -scale *
                  (
                    13 * Math.cos(t)
                    - 5 * Math.cos(2 * t)
                    - 2 * Math.cos(3 * t)
                    - Math.cos(4 * t)
                  ) - 110;

                const rotate =
                  (index % 2 === 0 ? -1 : 1) *
                  (5 + Math.random() * 8);

                return (
                  <div
                    key={photo.id || index}
                    className="giftbox-polaroid"
                    style={{
                      "--x": `${x}px`,
                      "--y": `${y}px`,
                      "--rotate": `${rotate}deg`,
                      "--delay": `${index * 0.25}s`,
                    }}
                  >
                    {photo.mediaType === "video" ? (
                      <video
                        src={photo.url}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={photo.url}
                        alt=""
                      />
                    )}
                  </div>
                );
              });

            })()}
          </div>
        )}

          {showText && (
          <div className="giftbox-text">

            <p className="giftbox-small">
              one more thing before you go...
            </p>

            <h1>
              there’s something
              <br />
              waiting for you
              <br />
              outside this room
            </h1>

            <p className="giftbox-message">
              สุขสันต์วันเกิดนะครับ 🤍
              <br />
              เค้าอยากให้วันนี้
              <br />
              เป็นวันที่เธอยิ้มเยอะๆครับ

            </p>

          </div>
          )}

      </div>

    </div>
  );
}

export default GiftboxModal;