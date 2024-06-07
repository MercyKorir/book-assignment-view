import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./components/Home";
import ReadingList from "./components/BookList/ReadingList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reading-list" element={<ReadingList />} />
      </Routes>
    </div>
  );
}

export default App;
