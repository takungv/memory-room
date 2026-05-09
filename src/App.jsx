import { useState } from "react";
import api from "./services/api";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Entrance from "./pages/Entrance";
import Room from "./pages/Room";
import LoadingScreen from "./pages/LoadingScreen";

function App() {
  const [entered, setEntered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState(null);

  const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getPublicUrl = (url) => {
    if (!url) return "";
  
    if (url.startsWith("http")) {
      return url;
    }
  
    return `${window.location.origin}${url}`;
  };
  
  const preloadMedia = (urls) => {
    const tasks = urls.map((url) => {
      return new Promise((resolve) => {
        if (!url) {
          resolve();
          return;
        }
  
        const finalUrl = getPublicUrl(url);
        const lowerUrl = finalUrl.toLowerCase();
  
        // =========================
        // IMAGE
        // =========================
        if (
          lowerUrl.endsWith(".jpg") ||
          lowerUrl.endsWith(".jpeg") ||
          lowerUrl.endsWith(".png") ||
          lowerUrl.endsWith(".webp")
        ) {
          const img = new Image();
  
          img.onload = resolve;
          img.onerror = resolve;
  
          img.src = finalUrl;
  
          return;
        }
  
        // =========================
        // VIDEO
        // =========================
        if (
          lowerUrl.endsWith(".mov") ||
          lowerUrl.endsWith(".mp4")
        ) {
          const video = document.createElement("video");
  
          video.preload = "metadata";
  
          video.onloadeddata = resolve;
          video.onerror = resolve;
  
          video.src = finalUrl;
  
          return;
        }
  
        resolve();
      });
    });
  
    return Promise.all(tasks);
  };

  const handleEnterRoom = async () => {
    setLoading(true);
  
    try {
      const [
        guitarRes,
        lettersRes,
        songsRes,
        photosRes,
        computerRes,
        catRes,
        boardRes,
      ] = await Promise.all([
        api.get("/Memories/guitar"),
        api.get("/Letters"),
        api.get("/Songs"),
        api.get("/Photos"),
        api.get("/Memories/computer"),
        api.get("/Memories/cat"),
        api.get("/Memories/board"),
      ]);

      const mediaUrls = [
        ...guitarRes.data.map((item) => item.imageUrl),
        ...photosRes.data.map((item) => item.imageUrl),
        ...computerRes.data.map((item) => item.imageUrl),
        ...catRes.data.map((item) => item.imageUrl),
        ...boardRes.data.map((item) => item.imageUrl),
      ];
      
      await Promise.all([
        preloadMedia(mediaUrls),
        wait(10000),
      ]);
  
      setRoomData({
        guitarMemories: guitarRes.data,
        letters: lettersRes.data,
        songs: songsRes.data,
        photos: photosRes.data,
        computerMemories: computerRes.data,
        catMemories: catRes.data,
        boardMemories: boardRes.data,
      });
  
      // โหลดครบแล้วค่อยเข้า
      setEntered(true);
      setLoading(false);
  
    } catch {
      setLoading(false);
  
      alert("โหลดข้อมูลไม่สำเร็จ");
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <LoadingScreen />
            ) : entered ? (
              <Navigate to="/room" />
            ) : (
              <Entrance onEnter={handleEnterRoom} />
            )
          }
        />

        <Route
          path="/room"
          element={
            entered ? (
              <div className="page-fade-in">
                <Room roomData={roomData} />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;