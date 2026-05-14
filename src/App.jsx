import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Entrance from "./pages/Entrance";
import Room from "./pages/Room";
import LoadingScreen from "./pages/LoadingScreen";
import Admin from "./pages/Admin";

function App() {
  const [entered, setEntered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEnterRoom = async () => {
    setLoading(true);

    setTimeout(() => {
      setEntered(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* หน้าแรก */}
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

        {/* ห้อง */}
        <Route
          path="/room"
          element={
            entered ? (
              <div className="page-fade-in">
                <Room />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <div className="page-fade-in">
              <Admin />
            </div>
          }
        />

        {/* กัน route แปลก */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;