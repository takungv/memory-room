import { useEffect, useState, Fragment } from "react";
import api from "../services/api";
import GalleryModal from "./GalleryModal";

export default function TimelineModal({ open = true, onClose }) {
  const [timeline, setTimeline] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState(null);

  useEffect(() => {
    if (open) loadTimeline();
  }, [open]);

  const loadTimeline = async () => {
    try {
      const res = await api.get("/api/Timeline");
      setTimeline(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const openTimeline = async (id) => {
    try {
      const res = await api.get(`/api/Timeline/${id}`);
      setSelectedTimeline(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---- สร้างช่องเดือนต่อเนื่องกันตั้งแต่เดือน/ปีน้อยสุด -> ล่าสุด ----
  const keyOf = (y, m) => y * 12 + m;
  const monthOf = (k) => ((k - 1) % 12) + 1;
  const yearOf = (k) => Math.floor((k - 1) / 12);

  const buildMonths = () => {
    if (timeline.length === 0) return [];

    const keys = timeline.map((i) => keyOf(i.year, i.month));
    const minKey = Math.min(...keys);
    const maxKey = Math.max(...keys);

    const map = new Map(timeline.map((i) => [keyOf(i.year, i.month), i]));

    const months = [];
    for (let k = minKey; k <= maxKey; k++) {
      months.push({
        year: yearOf(k),
        month: monthOf(k),
        item: map.get(k) || null,
      });
    }
    return months;
  };

  const months = buildMonths();

  if (!open) return null;

  return (
    <>
      <div className="timeline-backdrop">
        <div className="timeline-container">
          {onClose && (
            <button className="letter-modal-close" onClick={onClose}>
              ×
            </button>
          )}

          <h1 className="timeline-title">Our Timeline</h1>
          <p className="timeline-subtitle">every little month we've lived together</p>

          <div className="calendar-grid">
            {months.map(({ year, month, item }, idx) => (
              <Fragment key={`${year}-${month}`}>
                {(idx === 0 || year !== months[idx - 1].year) && (
                  <div className="calendar-year-marker">{year}</div>
                )}

                <div
                  className={`month-card ${!item ? "month-card-empty" : ""}`}
                  onClick={() => item && openTimeline(item.id)}
                >
                  {item ? (
                    <>
                      <div className="photo-stack">
                        <div className="back-photo" />
                        <div className="middle-photo" />

                        {item.coverType === "video" ? (
                          <video
                            src={item.cover}
                            className="stack-cover"
                            muted
                            loop
                            playsInline
                          />
                        ) : (
                          <img
                            src={item.cover}
                            className="stack-cover"
                            alt=""
                          />
                        )}
                      </div>

                      <div className="cal-desc-box">
                      <div className="cal-desc-track">
                        {item.description || item.Description}
                      </div>
                    </div>
                    </>
                  ) : (
                    <div className="photo-stack-empty" />
                  )}

                  <h3>{month}</h3>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {selectedTimeline && (
        <GalleryModal
          timeline={selectedTimeline}
          onClose={() => setSelectedTimeline(null)}
        />
      )}
    </>
  );
}