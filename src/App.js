import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Create from "./create";
import Choose from "./choose";
import Select from "./select";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Create />} exact={true} />
          <Route path="/create/:id" element={<Choose />} exact={true} />
          <Route path="/select/:id" element={<Select />} exact={true} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
