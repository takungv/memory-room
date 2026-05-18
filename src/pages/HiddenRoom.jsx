import "../styles/hidden-room.css";

import hiddenRoom from "../assets/hidden-room.PNG";

function HiddenRoom() {
  return (
    <div className="hidden-room-page">

      <img
        src={hiddenRoom}
        alt=""
        className="hidden-room-bg"
      />

      <div className="hidden-room-overlay" />

      <div className="hidden-room-content">

        <p className="hidden-room-small">
          there’s something
          i should’ve told you earlier
        </p>

        <h1>
          บางเรื่อง
          <br />
          ผมควรพูดกับเธอตั้งนานแล้ว
        </h1>

        <p className="hidden-room-text">
          ผมไม่ได้อยากซ่อนมันอีกแล้ว
        </p>

      </div>

    </div>
  );
}

export default HiddenRoom;