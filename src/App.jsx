import React from "react";
import './index.css'
import Navigation from "./components/navigation";
import Record from "./components/record";
import List from "./components/list";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <>
      <Router>
        <div className="body">
          <Navigation />
          <Routes>
            <Route path={"/"} element={<Record />} />
            <Route path={"/list"} element={<List />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
