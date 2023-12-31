import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import Home from "./Home";
import Chat from "./Chat";
import Sidepane from "./Sidepane";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <Sidepane />
      <NotificationContainer />
      <Routing />
    </div>
  );
}

export default App;
