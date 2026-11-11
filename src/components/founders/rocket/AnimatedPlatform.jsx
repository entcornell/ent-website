import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Platform } from "./Platform";

const AnimatedPlatform = () => {
  const platformRef = useRef();

  useEffect(() => {
    // GSAP recommended approach for smooth infinite rotation
    gsap.fromTo(
      platformRef.current.rotation,
      { y: -Math.PI / 4 }, // Start from 0°
      {
        y: -Math.PI / 4 - Math.PI * 2, // End at 360°
        duration: 25,
        ease: "linear",
        repeat: -1,
        delay: 9.9,
      },
    );
  }, []);

  return (
    <group ref={platformRef} scale={65} position={[0, -3.6, 0]} rotation={[0, -Math.PI / 4, 0]}>
      <Platform />
    </group>
  );
};

export default AnimatedPlatform;
