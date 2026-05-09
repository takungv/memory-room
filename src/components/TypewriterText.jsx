import { useEffect, useState } from "react";

function TypewriterText({ text, speed = 25 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");

    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index));

      index++;

      if (index > text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p className="letter-content">
        {displayedText}
        <span className="typing-cursor">|</span>
    </p>
  );
}

export default TypewriterText;