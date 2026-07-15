import { useEffect, useState } from "react";
import api from "../services/api";

export default function Timeline() {
  const [timelines, setTimelines] = useState([]);

  useEffect(() => {
    loadTimeline();
  }, []);

  const loadTimeline = async () => {
    try {
      const res = await api.get("/api/Timeline");
      setTimelines(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Timeline</h1>

      {timelines.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: 10,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <h2>
            {item.title} ({item.month}/{item.year})
          </h2>

          <p>{item.description}</p>

          <p>
            จำนวนรูป/วิดีโอ : {item.media.length}
          </p>
        </div>
      ))}
    </div>
  );
}