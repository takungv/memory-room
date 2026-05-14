import { useEffect, useRef, useState } from "react";

const keyAudio =
  "https://res.cloudinary.com/dwcwppo6n/video/upload/q_auto/f_auto/v1778768682/key_y8i8ri.mp3";

function Entrance({ onEnter }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hintIndex, setHintIndex] = useState(0);

  const audioRef = useRef(null);

  const SECRET_CODES = [
    "love",
    "1407",
    "0714",
    "loved",
    "ta",
    "tee",
    "บี๋",
    "ที่รัก",
    "เค้ารักเธอ",
    "รัก",
  ];

  const hints = [
    "บางทีอาจเป็นวันที่อะไรบางอย่าง",
    "บางรหัสไม่ได้เป็นตัวเลขเสมอไป",
    "ลองนึกถึงชื่อที่เราใช้เรียกกัน",
    "อาจเป็นวันที่เราเจอกันครั้งแรก (xx/xx)",
    "บางคำยังอยู่ที่เดิมเสมอ",
    "เธอน่าจะรู้คำตอบอยู่แล้วนะ",
  ];

  useEffect(() => {
    audioRef.current = new Audio(keyAudio);

    audioRef.current.volume = 1;
    audioRef.current.preload = "auto";

    const interval = setInterval(() => {
      setHintIndex((prev) =>
        prev === hints.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playKeySound = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0.09;

    audioRef.current.play().catch(() => {});
  };

  const handleEnter = () => {
    const normalizedPassword =
      password.trim().toLowerCase();

    const matched = SECRET_CODES.some(
      (code) =>
        code.toLowerCase() === normalizedPassword
    );

    if (matched) {
      onEnter();
    } else {
      setError("รหัสไม่ถูกนะ");
    }
  };

  return (
    <div className="entrance-page">
      <div className="entrance-card">

        <p className="entrance-kicker">
          บางอย่างยังอยู่ที่เดิม
        </p>

        <h1>
          ห้องนี้
          <br />
          เป็นของเธอ
        </h1>

        <p className="entrance-text">
          ถ้าเธอยังจำรหัสได้
          ข้างในยังมีทุกอย่างรออยู่
        </p>

        <input
          type="text"
          placeholder="ใส่รหัสของเรา"
          value={password}
          onChange={(e) => {
            playKeySound();

            setPassword(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEnter();
            }
          }}
          className="entrance-input"
        />

        <button
          className="entrance-button"
          onClick={handleEnter}
        >
          เข้าไปข้างใน
        </button>

        <p className="entrance-hint">
          {hints[hintIndex]}
        </p>

        {error && (
          <p className="entrance-error">
            {error}
          </p>
        )}

      </div>
    </div>
  );
}

export default Entrance;