import { useEffect, useState } from "react";

function TypewriterText({ text, speed = 40 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");

    let i = 0;

    const getDelay = (char) => {
      if (char === "\n") return 400;   // เว้นบรรทัด = คิด
      if (char === ".") return 350;    // จบประโยค = หยุดคิด
      if (char === ",") return 200;    // เว้นจังหวะ
      return speed;
    };

    let timeout;

    const type = () => {
      if (i >= text.length) return;

      const char = text[i];

      setDisplayed((prev) => prev + char);

      i++;

      timeout = setTimeout(type, getDelay(char));
    };

    type();

    return () => clearTimeout(timeout);
  }, [text, speed]);

  return (
    <p className="letter-content">
      {displayed}
      <span className="typing-cursor">|</span>
    </p>
  );
}

export default TypewriterText;