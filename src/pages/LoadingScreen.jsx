import { useMemo } from "react";

function LoadingScreen() {

  const loadingMessage = useMemo(() => {
    const messages = [
      "กำลังเปิดประตู...",
      "บางอย่างยังรออยู่ข้างใน",
      "เสียงเพลงกำลังกลับมา",
      "ห้องนี้ยังจำเธอได้",
      "กำลังปลุกความทรงจำขึ้นมา",
      "คืนนี้ยังมีแสงไฟอยู่",
      "กำลังกลับไปในคืนเดิม ๆ",
      "บางอย่างไม่เคยหายไปไหน",
      "ฝนกำลังเริ่มตกเบา ๆ",
      "ยังมีหลายอย่างอยู่ที่เดิม",
    ];

    return messages[
      Math.floor(Math.random() * messages.length)
    ];
  }, []);

  return (
    <div className="loading-page">

      <p className="loading-kicker">
        {loadingMessage}
      </p>

      <h1>loading...</h1>

      <div className="loading-dots">
        <span />
        <span />
        <span />
      </div>

    </div>
  );
}

export default LoadingScreen;