import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Recipe from "./recipe";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Recipe />} />
          <Route path="/recipe/:id" element={<Recipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
