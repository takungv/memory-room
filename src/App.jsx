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

      setRoomData({
        guitarMemories: guitarRes.data,
        letters: lettersRes.data,
        songs: songsRes.data,
        photos: photosRes.data,
        computerMemories: computerRes.data,
        catMemories: catRes.data,
        boardMemories: boardRes.data,
      });

      setTimeout(() => {
        setEntered(true);
        setLoading(false);
      }, 2200);
    } catch {
      setLoading(false);
      alert("โหลดข้อมูลไม่สำเร็จ ลองเข้าใหม่อีกครั้งนะครับ");
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