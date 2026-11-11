import React, { useEffect } from "react";
import "./Brothers.css";
import ApplyNowButton from "./ApplyNowButton";
import { alumni, brotherhood, eboard } from "./BrothersData";

function MemberCard({
  role,
  name,
  email,
  year,
  major,
  minors,
  involvement,
  hobbies,
  image,
  extra,
  showRole = false,
  style,
}) {
  return (
    <article className="m-card">
      <div className="m-card-media">
        <img src={image} style={style} alt={name} loading="lazy" />
      </div>
      <div className="m-card-body">
        {showRole && (
          <p className="m-role">
            <strong>{role}</strong>
          </p>
        )}
        {extra && <p className="member-extra">{extra}</p>}
        <p className="m-name">
          <strong>{name}</strong>
        </p>
        <p className="m-email-line">{email}</p>
        <p className="m-line">
          <span>Year:</span> {year}
        </p>
        <p className="m-line">
          <span>Major/Minor:</span> {major}
          {minors ? `; ${minors}` : ""}
        </p>
        <p className="m-line">
          <span>Involvements:</span> {involvement}
        </p>
        <p className="m-line">
          <span>Hobbies:</span> {hobbies}
        </p>
        <a className="m-btn" href={`mailto:${email}`}>
          Contact
        </a>
      </div>
    </article>
  );
}

export default function Members() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="members-page">
      {/* HERO */}
      <section className="members-hero">
        <img src="/group-pics/ENTGroups-64.webp" alt="Members hero" className="members-hero-img" />

        <div className="members-hero-content">
          <h1>BROTHERS</h1>
          <p>GET TO KNOW OUR BROTHERHOOD</p>
          <ApplyNowButton />
        </div>
      </section>

      <main className="m-container">
        {/* E-BOARD */}
        <h2 className="m-section-title">EXECUTIVE BOARD</h2>
        <div className="m-card-grid">
          {eboard.map((m, i) => (
            <MemberCard key={`e-${i}`} {...m} showRole />
          ))}
        </div>

        {/* BROTHERHOOD */}
        <h2 className="m-section-title">Brotherhood</h2>
        {brotherhood.map((group, gi) => (
          <section className="m-class-block" key={gi}>
            <h3 className="m-class-title">{group.className}</h3>
            <div className="m-card-grid">
              {group.members.map((m, i) => (
                <MemberCard key={`${group.className}-${i}`} {...m} />
              ))}
            </div>
          </section>
        ))}

        <hr className="m-divider" />

        {/* ALUMNI */}
        <h2 className="m-section-title">Alumni</h2>
        <div className="m-card-grid">
          {alumni.map((m, i) => (
            <MemberCard key={`a-${i}`} {...m} />
          ))}
        </div>
      </main>
    </div>
  );
}
