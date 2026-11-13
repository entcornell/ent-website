// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

import Newsletter from "./components/Newsletter";
import Brothers from "./components/Brothers";
import Recruitment from "./components/Recruitment";
import StudentVentures from "./components/StudentVentures";
import SBC from "./components/SBC";
import NewsletterPage from "./components/NewsletterPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import About from "./components/About";
import Values from "./components/Values";
import EventPopUp from "./components/EventPopUp";
import FoundersHome from "./components/founders/FoundersHome";
import "./index.css";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet /> {/* child pages render here */}
      <Footer />
      <EventPopUp />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The home has its own nav and footer, outside the shared layout. */}
        <Route path="/" element={<FoundersHome />} />
        {/* The redesign was previewed at /new; old links land on the home. */}
        <Route path="/new" element={<Navigate to="/" replace />} />
        {/* Every other page shares the original NavBar and Footer. */}
        <Route element={<Layout />}>
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/newsletter/:id" element={<NewsletterPage />} />
          <Route path="/brothers" element={<Brothers />} />
          <Route path="/members" element={<Navigate to="/brothers" replace />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/studentVentures" element={<StudentVentures />} />
          <Route path="/about" element={<About />} />
          <Route path="/SBC" element={<SBC />} />
          <Route path="/Values" element={<Values />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
