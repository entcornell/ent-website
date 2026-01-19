// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

import Home from "./components/Home";
import Newsletter from "./components/Newsletter";
import Brothers from "./components/Brothers";
import Recruitment from "./components/Recruitment";
import StudentVentures from "./components/StudentVentures";
import NewsletterPage from "./components/NewsletterPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import About from "./components/About";
import "./index.css";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet /> {/* child pages render here */}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes below share the same NavBar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/newsletter/:id" element={<NewsletterPage />} />
          <Route path="/brothers" element={<Brothers />} />
          <Route path="/members" element={<Navigate to="/brothers" replace />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/studentVentures" element={<StudentVentures />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
