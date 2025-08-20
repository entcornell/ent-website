// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Home from "./components/Home";
import Newsletter from "./components/Newsletter";
import Members from "./components/Members";
import Recruitment from "./components/Recruitment";
import WhoWeAre from "./components/WhoWeAre";
import NewsletterPage from "./components/NewsletterPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
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
          <Route path="/members" element={<Members />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
