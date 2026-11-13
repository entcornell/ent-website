import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Rocket } from "./Rocket";

const AnimatedRocket = () => {
  const rocketRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      rocketRef.current.position,
      { y: 0.4 },
      {
        y: 0.4 - 0.1,
        duration: 1,
        ease: "power2.out",
      },
    );

    // Upward movement animation (starts after 1 second, then disappears)
    gsap.fromTo(
      rocketRef.current.position,
      { y: 0.3 },
      {
        y: 0.4 + 10,
        duration: 4,
        ease: "power2.inOut",
        delay: 1, // Start after 1 second
      },
    );

    // Fade out
    gsap.to(rocketRef.current, {
      duration: 0.125,
      delay: 5, // Start fade after 1s delay + 3s movement = 4s total
      ease: "power2.inOut",
      onUpdate: function () {
        // Animate opacity of all materials in the rocket
        rocketRef.current.traverse((child) => {
          if (child.material) {
            child.material.opacity = 1 - this.progress();
            child.material.transparent = true;
          }
        });
      },
      onStart: function () {
        // Stop all smoke animations by setting a global flag
        window.rocketFading = true;
      },
    });

    // Then move to the right from the elevated position
    gsap.fromTo(
      rocketRef.current.position,
      { x: 0 },
      {
        x: 14, // Move to the right
        y: -4,
        duration: 0.25,
        ease: "power2.inOut",
        delay: 5.125, // Start after rocket reaches top (1s delay + 3s up = 4s)
      },
    );

    // Fade in
    gsap.to(rocketRef.current, {
      opacity: 1, // Fade in
      duration: 0.125,
      delay: 5.375,
      ease: "power2.inOut",
      onUpdate: function () {
        // Animate opacity of all materials in the rocket
        rocketRef.current.traverse((child) => {
          if (child.material) {
            child.material.opacity = 0 + this.progress();
            child.material.transparent = true;
          }
        });
      },
      onStart: function () {
        // Stop all smoke animations by setting a global flag
        window.rocketFading = false;
      },
    });

    gsap.fromTo(
      rocketRef.current.position,
      {},
      {
        x: 0,
        ease: "power2.out",
        delay: 5.5, // Start after rocket reaches top (1s delay + 3s up = 4s)
        duration: 2,
      },
    );

    gsap.fromTo(
      rocketRef.current.position,
      {},
      {
        y: 1.5,
        ease: "power2.out",
        delay: 5.5, // Start after rocket reaches top (1s delay + 3s up = 4s)
        duration: 3,
      },
    );

    gsap.set(rocketRef.current.rotation, {
      x: -Math.PI / 2,
      y: Math.PI,
      z: -Math.PI / 2,
      delay: 5.5,
    });

    gsap.fromTo(
      rocketRef.current.rotation,
      {},
      {
        y: (3 * Math.PI) / 2,
        duration: 3,
        delay: 5.5,
        ease: "power2.out",
      },
    );

    gsap.fromTo(
      rocketRef.current.position,
      {},
      {
        y: 0.4,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 8.5, // Start after rocket reaches top (1s delay + 3s up = 4s)
      },
    );

    // Simple up-down bounce
    gsap.to(rocketRef.current.position, {
      y: "+=0.1",
      duration: 2,
      ease: "linear",
      yoyo: true, // Go back to start
      repeat: -1, // Infinite repeat
      delay: 10, // Start after rocket reaches top (1s delay + 3s up = 4s)
    });

    // Rotation animation
    gsap.fromTo(
      rocketRef.current.rotation,
      { y: -Math.PI / 2, x: 0, z: 0 },
      {
        y: -Math.PI / 2 - Math.PI * 2,
        duration: 25,
        ease: "linear",
        repeat: -1,
        delay: 9.9,
      },
    );
  }, []);

  return (
    <group ref={rocketRef} scale={3.5} position={[0, 0.4, 0]} rotation={[0, -Math.PI / 2, 0]}>
      <Rocket />
    </group>
  );
};

export default AnimatedRocket;
