import { useEffect, useState } from "react";

export default function AniversaryCLIPModal({ open, onClose, src }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (open) {
      setRevealed(false);
      const timer = setTimeout(() => setRevealed(true), 250);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop clip-backdrop">
      <div className="clip-card">

        <button className="letter-modal-close" onClick={onClose}>
          ×
        </button>

        <div className="clip-hearts">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="clip-heart"
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 5) * 0.6}s`,
                animationDuration: `${6 + (i % 4)}s`,
              }}
            >
              ♡
            </span>
          ))}
        </div>

        <p className="clip-kicker">a little something, just for you</p>

        <h1 className="clip-title">happy anniversary, my love</h1>

        <p className="clip-subtitle">
          ทุกวันที่ผ่านมากับเธอ มันมีความหมายกับเค้ามากจริง ๆ นะครับ
        </p>

        <div className={`clip-frame ${revealed ? "clip-frame-show" : ""}`}>
          {src ? (
            <video
              src={src}
              controls
              autoPlay
              className="clip-video"
            />
          ) : (
            <div className="clip-placeholder">
              เตรียมคลิปไว้เร็ว ๆ นี้นะครับ...
            </div>
          )}
        </div>

        <p className="clip-footer">
          ขอบคุณที่เดินมาด้วยกันจนถึงวันนี้นะครับ 🤍
        </p>

      </div>
    </div>
  );
}