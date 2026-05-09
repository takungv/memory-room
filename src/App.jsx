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

function App() {
  const [entered, setEntered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEnterRoom = () => {
    setLoading(true);

    setTimeout(() => {
      setEntered(true);
      setLoading(false);
    }, 2200);
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
                <Room />
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