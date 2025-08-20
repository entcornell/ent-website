// EndeavorsPopup.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./EndeavorsPopup.css";

const EndeavorsPopup = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content no-stripes">
        {/* Close (floats over the image) */}
        <button
          className="popup-close over-image"
          onClick={onClose}
          aria-label="Close popup"
        >
          ✕
        </button>

        {/* LEFT: photo */}
        <div className="popup-left">
          <div className="popup-left-card">
            <img src={data.img} alt={data.title} />
          </div>
        </div>

        {/* RIGHT (vertically centered content) */}
        <div className="popup-right">
          <div className="popup-right-inner">
            <h2 className="popup-title">{data.title}</h2>
            <p className="popup-desc">{data.desc}</p>

            <h3 className="popup-sub">What We’re Working On:</h3>
            <ul className="popup-list">
                {data.projects.map((proj, i) => (
                    <li className="popup-row" key={i}>
                    <span className="hex-bullet" aria-hidden="true">
                        <FontAwesomeIcon
                        icon={proj.icon || faArrowRight}
                        className="hex-fa"
                        />
                    </span>
                    <div className="row-text">
                        <strong className="row-title">{proj.name}</strong>
                        <p className="row-detail">{proj.detail}</p>
                    </div>
                    </li>
                ))}
            </ul>


            <div className="popup-thumbs">
              {data.thumbs.map((src, i) => (
                <div className="thumb" key={i}>
                  <img src={src} alt={`thumb-${i}`} />
                </div>
              ))}
            </div>

            {/* CTA button at bottom */}
            {data.link && (
            <div className="popup-cta">
                <a 
                href={data.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="popup-cta-btn"
                >
                Check it out here
                </a>
            </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default EndeavorsPopup;
