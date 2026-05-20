import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TypewriterText from "./TypewriterText";

const letterAudio =
  "https://res.cloudinary.com/dwcwppo6n/video/upload/q_auto/f_auto/v1778768665/letter-open_w9fprw.mp3";

function LettersModal({
  open,
  onClose,
  letters = [],
}) {

  const subtitles = {
    apology:
      "บางคำพูดมันติดอยู่ในใจเค้ามานาน\nแล้วเค้าก็อยากให้เธอได้ยินมันสักครั้ง",
  
    if_someday:
      "จดหมายสำหรับวันที่เค้าอาจไม่ได้อยู่ตรงนี้แล้ว\nแต่ความคิดถึงของเค้า ยังอยากเดินกลับมาหาเธอเสมอ",
  
    my_letter:
      "ความรู้สึกของเค้าที่มีต่อเธอ\nที่เค้าอยากจดบันทึกไว้\nไม่ว่าจะเกิดอะไรขึ้นก็ตาม",
  };

  const navigate = useNavigate();

  const [selectedLetter, setSelectedLetter] =
    useState(null);

  const [activeTab, setActiveTab] =
    useState("apology");

  const secretLetter = {
    id: "secret-room",
    title: "จดหมายที่เค้าไม่กล้าพูดต่อหน้าเธอ",
    category: "apology",
    isSecret: true,
    createdAt: new Date().toISOString(),
  };

  const visibleLetters = [
    ...letters.filter(
      (letter) => letter.category === activeTab
    ),

    ...(activeTab === "apology"
      ? [secretLetter]
      : []),
  ].sort(
    (a, b) =>
      new Date(
        a.createdAt || a.createAt
      ).getTime() -
      new Date(
        b.createdAt || b.createAt
      ).getTime()
  );

  const closeModal = () => {
    setSelectedLetter(null);
    onClose();
  };

  const playLetterSound = () => {
    const audio = new Audio(letterAudio);

    audio.volume = 0.8;

    audio.currentTime = 1.4;

    audio.play();

    const fadeOut = setInterval(() => {
      if (audio.volume > 0.02) {
        audio.volume -= 0.02;
      } else {
        audio.pause();
        clearInterval(fadeOut);
      }
    }, 80);
  };

  return (
    <div
      className={`modal-backdrop ${
        open ? "modal-show" : "modal-hide"
      }`}
      onClick={closeModal}
    >
      <div
        className={
          activeTab === "if_someday"
            ? "letter-card someday-card"
            : "letter-card"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {!selectedLetter ? (
          <>
            <h1>Letters for you</h1>

            <p className="letter-subtitle">
              {subtitles[activeTab]}
            </p>

            <div className="letter-tabs">
              <button
                className={
                  activeTab === "apology"
                    ? "active-tab"
                    : ""
                }
                onClick={() =>
                  setActiveTab("apology")
                }
              >
                ถึงเธอในตอนนี้
              </button>
              
              <button
                className={
                  activeTab === "my_letter"
                  ? "active-tab"
                  : ""
                }
                onClick={() =>
                  setActiveTab("my_letter")
                }
              >
                บันทึกของเค้า
              </button>

              <button
                className={
                  activeTab === "if_someday"
                    ? "active-tab someday-tab"
                    : "someday-tab"
                }
                onClick={() =>
                  setActiveTab("if_someday")
                }
              >
                If someday...
              </button>
            </div>

            <div className="letter-envelope-list">
              {visibleLetters.map((letter) => (
                <button
                  key={letter.id || letter._id}
                  className={`letter-envelope ${
                    letter.isSecret
                      ? "secret-envelope"
                      : ""
                  }`}
                  onClick={() => {
                    playLetterSound();

                    if (letter.isSecret) {

                      setTimeout(() => {
                        navigate("/secret-room");
                      }, 1200);

                      return;
                    }

                    setSelectedLetter(letter);
                  }}
                >
                  <span className="envelope-icon">
                    ✉
                  </span>

                  <span>
                    <strong>
                      {letter.title}
                    </strong>

                    <small>
                      {letter.isSecret
                        ? "เปิดเฉพาะตอนที่เธอพร้อมนะ"
                        : new Date(
                            letter.createdAt ||
                              letter.createAt
                          ).toLocaleString()}
                    </small>
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="letter-open-animation">
            <button
              className="letter-back"
              onClick={() =>
                setSelectedLetter(null)
              }
            >
              ← กลับไปเลือกจดหมาย
            </button>

            <div className="opened-letter-paper">
              <p className="letter-kicker">
                a letter for you
              </p>

              <h1>
                {selectedLetter.title}
              </h1>

              <p className="letter-date">
                {new Date(
                  selectedLetter.createdAt ||
                    selectedLetter.createAt
                ).toLocaleString()}
              </p>

              <TypewriterText
                text={selectedLetter.content}
              />

              {selectedLetter.pdfUrl?.trim() ? (
                <img
                  src={selectedLetter.pdfUrl}
                  alt="letter"
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    borderRadius: "12px",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.target.style.display =
                      "none";
                  }}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LettersModal;