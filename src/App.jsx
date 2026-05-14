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
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/room" />}
        />

        <Route
          path="/room"
          element={
            <div className="page-fade-in">
              <Room />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;