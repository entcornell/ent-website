import { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Rocket(props) {
  const { nodes, materials } = useGLTF("/models/rocket.glb");

  // Create animated smoke material
  const smokeMaterial = useMemo(() => {
    const material = materials["white.Smoke"].clone();
    return material;
  }, [materials]);

  // Separate material for main smoke groups (left and right) to avoid fade conflicts
  const mainSmokeMaterial = useMemo(() => {
    const material = materials["white.Smoke"].clone();
    return material;
  }, [materials]);

  // Refs for smoke groups to animate them
  const leftSmokeRef = useRef();
  const rightSmokeRef = useRef();

  // 10 different smoke scenarios with different refs
  const smokeScenario1Ref = useRef();
  const smokeScenario2Ref = useRef();
  const smokeScenario3Ref = useRef();
  const smokeScenario4Ref = useRef();
  const smokeScenario5Ref = useRef();
  const smokeScenario6Ref = useRef();
  const smokeScenario7Ref = useRef();
  const smokeScenario8Ref = useRef();
  const smokeScenario9Ref = useRef();
  const smokeScenario10Ref = useRef();

  // Animation for smoke scale and opacity
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Check if rocket is fading - if so, stop all animations
    if (window.rocketFading) {
      return;
    }

    // Opacity pulsing for breathing effect (main smoke groups only)
    // Reached through the scene graph (the left smoke group's meshes share the material)
    // rather than the memoised value, so the frame loop mutates three.js objects, not a
    // value React handed out.
    const mainSmoke = leftSmokeRef.current?.children[0]?.material;
    if (mainSmoke) {
      mainSmoke.opacity = 0.9 + 0.1 * Math.sin(time * 2);
    }

    // Scale animation for magnifying effect
    if (leftSmokeRef.current) {
      const scalePulse = 7 + 0.5 * Math.sin(time * 2);
      leftSmokeRef.current.scale.setScalar(scalePulse);
    }

    if (rightSmokeRef.current) {
      // const scalePulse = 6 + 1 * Math.sin(time * 1.5 + Math.PI * 0.3)
      const scalePulse = 7 + 0.5 * Math.sin(time * 2);
      rightSmokeRef.current.scale.setScalar(scalePulse);
    }

    // Scenario 1: Quick burst (0.5s delay, fast fall)
    if (smokeScenario1Ref.current) {
      const offsetTime = time + 0.5;
      const loopTime = offsetTime % 3;
      if (loopTime < 2) {
        const fallDistance = loopTime * 4;
        const fadeIn = Math.min(1, loopTime / 0.8); // Fade in over 0.8 seconds
        const fadeOut = Math.max(0, 1 - (loopTime - 0.8) / 1.2); // Fade out over 1.2 seconds
        const opacity = Math.min(fadeIn, fadeOut);
        smokeScenario1Ref.current.position.y = -fallDistance;
        smokeScenario1Ref.current.visible = true;
        smokeScenario1Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = opacity;
            child.material.transparent = true;
          }
        });
      } else {
        smokeScenario1Ref.current.visible = false;
        smokeScenario1Ref.current.position.y = 0;
        smokeScenario1Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = 1;
          }
        });
      }
    }

    // Scenario 2: Slow drift (1s delay, slow fall)
    if (smokeScenario2Ref.current) {
      const offsetTime = time + 1.0;
      const loopTime = offsetTime % 5;
      if (loopTime < 4) {
        const fallDistance = loopTime * 1.5;
        const fadeIn = Math.min(1, loopTime / 1.0); // Fade in over 1.0 seconds
        const fadeOut = Math.max(0, 1 - (loopTime - 1.0) / 3.0); // Fade out over 3.0 seconds
        const opacity = Math.min(fadeIn, fadeOut);
        smokeScenario2Ref.current.position.y = -fallDistance;
        smokeScenario2Ref.current.visible = true;
        smokeScenario2Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = opacity;
            child.material.transparent = true;
          }
        });
      } else {
        smokeScenario2Ref.current.visible = false;
        smokeScenario2Ref.current.position.y = 0;
        smokeScenario2Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = 1;
          }
        });
      }
    }

    // Scenario 3: Pulsing effect (1.5s delay, pulsing visibility)
    if (smokeScenario3Ref.current) {
      const offsetTime = time + 1.5;
      const loopTime = offsetTime % 4;
      const pulse = Math.sin(time * 3) * 0.5 + 0.5;
      if (loopTime < 3 && pulse > 0.3) {
        const fallDistance = loopTime * 2;
        const fadeIn = Math.min(1, loopTime / 0.8); // Fade in over 0.8 seconds
        const fadeOut = Math.max(0, 1 - (loopTime - 0.8) / 2.2); // Fade out over 2.2 seconds
        const opacity = Math.min(fadeIn, fadeOut) * pulse;
        smokeScenario3Ref.current.position.y = -fallDistance;
        smokeScenario3Ref.current.visible = true;
        smokeScenario3Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = opacity;
            child.material.transparent = true;
          }
        });
      } else {
        smokeScenario3Ref.current.visible = false;
        smokeScenario3Ref.current.position.y = 0;
        smokeScenario3Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = 1;
          }
        });
      }
    }

    // Scenario 4: Random timing (2s delay, random intervals)
    if (smokeScenario4Ref.current) {
      const offsetTime = time + 2.0;
      const loopTime = offsetTime % 6;
      const randomFactor = Math.sin(time * 0.7 + 1) * 0.3 + 0.7;
      if (loopTime < 4 && randomFactor > 0.5) {
        const fallDistance = loopTime * 2.5;
        const fadeIn = Math.min(1, loopTime / 1.2); // Fade in over 1.2 seconds
        const fadeOut = Math.max(0, 1 - (loopTime - 1.2) / 2.8); // Fade out over 2.8 seconds
        const opacity = Math.min(fadeIn, fadeOut) * randomFactor;
        smokeScenario4Ref.current.position.y = -fallDistance;
        smokeScenario4Ref.current.visible = true;
        smokeScenario4Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = opacity;
            child.material.transparent = true;
          }
        });
      } else {
        smokeScenario4Ref.current.visible = false;
        smokeScenario4Ref.current.position.y = 0;
        smokeScenario4Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = 1;
          }
        });
      }
    }

    // Scenario 5: Wave pattern (2.5s delay, wave motion)
    if (smokeScenario5Ref.current) {
      const offsetTime = time + 2.5;
      const loopTime = offsetTime % 4;
      const wave = Math.sin(time * 2) * 0.3;
      if (loopTime < 3) {
        const fallDistance = loopTime * 2 + wave;
        const fadeIn = Math.min(1, loopTime / 0.8); // Fade in over 0.8 seconds
        const fadeOut = Math.max(0, 1 - (loopTime - 0.8) / 2.2); // Fade out over 2.2 seconds
        const opacity = Math.min(fadeIn, fadeOut);
        smokeScenario5Ref.current.position.y = -fallDistance;
        smokeScenario5Ref.current.visible = true;
        smokeScenario5Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = opacity;
            child.material.transparent = true;
          }
        });
      } else {
        smokeScenario5Ref.current.visible = false;
        smokeScenario5Ref.current.position.y = 0;
        smokeScenario5Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = 1;
          }
        });
      }
    }

    // Scenario 6: Staggered burst (3s delay, multiple quick bursts)
    if (smokeScenario6Ref.current) {
      const offsetTime = time + 3.0;
      const loopTime = offsetTime % 3;
      const burstCycle = Math.floor(offsetTime / 3) % 3;
      if (loopTime < 1.5 && burstCycle === 0) {
        const fallDistance = loopTime * 5;
        const fadeIn = Math.min(1, loopTime / 0.5); // Fade in over 0.5 seconds
        const fadeOut = Math.max(0, 1 - (loopTime - 0.5) / 1.0); // Fade out over 1.0 seconds
        const opacity = Math.min(fadeIn, fadeOut);
        smokeScenario6Ref.current.position.y = -fallDistance;
        smokeScenario6Ref.current.visible = true;
        smokeScenario6Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = opacity;
            child.material.transparent = true;
          }
        });
      } else {
        smokeScenario6Ref.current.visible = false;
        smokeScenario6Ref.current.position.y = 0;
        smokeScenario6Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = 1;
          }
        });
      }
    }

    // Scenario 7: Continuous stream (3.5s delay, steady flow)
    if (smokeScenario7Ref.current) {
      const offsetTime = time + 3.5;
      const loopTime = offsetTime % 2;
      if (loopTime < 1.8) {
        const fallDistance = loopTime * 3;
        const fadeIn = Math.min(1, loopTime / 0.6); // Fade in over 0.6 seconds
        const fadeOut = Math.max(0, 1 - (loopTime - 0.6) / 1.2); // Fade out over 1.2 seconds
        const opacity = Math.min(fadeIn, fadeOut);
        smokeScenario7Ref.current.position.y = -fallDistance;
        smokeScenario7Ref.current.visible = true;
        smokeScenario7Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = opacity;
            child.material.transparent = true;
          }
        });
      } else {
        smokeScenario7Ref.current.visible = false;
        smokeScenario7Ref.current.position.y = 0;
        smokeScenario7Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = 1;
          }
        });
      }
    }

    // Scenario 8: Spiral motion (4s delay, spiral fall)
    if (smokeScenario8Ref.current) {
      const offsetTime = time + 4.0;
      const loopTime = offsetTime % 4;
      const spiral = Math.sin(time * 1.5) * 0.5;
      if (loopTime < 3) {
        const fallDistance = loopTime * 2.5;
        const fadeIn = Math.min(1, loopTime / 0.8); // Fade in over 0.8 seconds
        const fadeOut = Math.max(0, 1 - (loopTime - 0.8) / 2.2); // Fade out over 2.2 seconds
        const opacity = Math.min(fadeIn, fadeOut);
        smokeScenario8Ref.current.position.y = -fallDistance;
        smokeScenario8Ref.current.position.x = spiral;
        smokeScenario8Ref.current.visible = true;
        smokeScenario8Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = opacity;
            child.material.transparent = true;
          }
        });
      } else {
        smokeScenario8Ref.current.visible = false;
        smokeScenario8Ref.current.position.y = 0;
        smokeScenario8Ref.current.position.x = 0;
        smokeScenario8Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = 1;
          }
        });
      }
    }

    // Scenario 9: Fade in/out (4.5s delay, opacity fade)
    if (smokeScenario9Ref.current) {
      const offsetTime = time + 4.5;
      const loopTime = offsetTime % 5;
      if (loopTime < 4) {
        const fallDistance = loopTime * 2;
        const fadeIn = Math.min(1, loopTime / 1.0); // Fade in over 1.0 seconds
        const fadeOut = Math.max(0, 1 - (loopTime - 1.0) / 3.0); // Fade out over 3.0 seconds
        const opacity = Math.min(fadeIn, fadeOut);
        smokeScenario9Ref.current.position.y = -fallDistance;
        smokeScenario9Ref.current.visible = true;
        smokeScenario9Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = opacity;
            child.material.transparent = true;
          }
        });
      } else {
        smokeScenario9Ref.current.visible = false;
        smokeScenario9Ref.current.position.y = 0;
        smokeScenario9Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = 1;
          }
        });
      }
    }

    // Scenario 10: Zigzag pattern (5s delay, zigzag motion)
    if (smokeScenario10Ref.current) {
      const offsetTime = time + 5.0;
      const loopTime = offsetTime % 3;
      const zigzag = Math.sin(time * 4) * 0.8;
      if (loopTime < 2.5) {
        const fallDistance = loopTime * 3;
        const fadeIn = Math.min(1, loopTime / 0.8); // Fade in over 0.8 seconds
        const fadeOut = Math.max(0, 1 - (loopTime - 0.8) / 1.7); // Fade out over 1.7 seconds
        const opacity = Math.min(fadeIn, fadeOut);
        smokeScenario10Ref.current.position.y = -fallDistance;
        smokeScenario10Ref.current.position.z = zigzag;
        smokeScenario10Ref.current.visible = true;
        smokeScenario10Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = opacity;
            child.material.transparent = true;
          }
        });
      } else {
        smokeScenario10Ref.current.visible = false;
        smokeScenario10Ref.current.position.y = 0;
        smokeScenario10Ref.current.position.z = 0;
        smokeScenario10Ref.current.children.forEach((child) => {
          if (child.material) {
            child.material.opacity = 1;
          }
        });
      }
    }
  });
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh geometry={nodes.Cylinder_white_0.geometry} material={materials.white} />
          <mesh geometry={nodes.Cylinder_red_0.geometry} material={materials.material} />
          <mesh geometry={nodes.Cylinder_metal_0.geometry} material={materials.metal} />
        </group>
        <group position={[20.443, 20.34, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh geometry={nodes.Cylinder001_metal_0.geometry} material={materials.metal} />
          <mesh
            geometry={nodes.Cylinder001_window_glass_0.geometry}
            material={materials.window_glass}
          />
        </group>
        <group position={[0, -41.747, 0.146]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh geometry={nodes.Cylinder008_metal_0.geometry} material={materials.metal} />
          <mesh geometry={nodes.Cylinder008_metal_0_1.geometry} material={materials.metal} />
        </group>

        {/* Details of the top ring of the rocket */}
        <mesh
          geometry={nodes.Cube_metal2_0.geometry}
          material={materials["metal.2"]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        {/* Red wings of the rocket */}
        <mesh
          geometry={nodes.Cylinder003_red_0.geometry}
          material={materials.material}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={98.354}
        />
        {/* Details of the border ring of the window */}
        <mesh
          geometry={nodes.Cube001_metal2_0.geometry}
          material={materials["metal.2"]}
          position={[28.921, 21.844, 0]}
          rotation={[-Math.PI / 2, -0.175, 0]}
          scale={100}
        />

        {/* Smoke of the bottom of the rocket - The left one */}
        <group
          ref={leftSmokeRef}
          position={[0.159, -49.228, 8.568]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={9.636}
        >
          <mesh geometry={nodes.Cube002_whiteSmoke_0.geometry} material={mainSmokeMaterial} />
          <mesh geometry={nodes.Cube002_whiteSmoke_0_1.geometry} material={mainSmokeMaterial} />
          <mesh geometry={nodes.Cube002_whiteSmoke_0_2.geometry} material={mainSmokeMaterial} />
          <mesh geometry={nodes.Cube002_whiteSmoke_0_3.geometry} material={mainSmokeMaterial} />
          <mesh geometry={nodes.Cube002_whiteSmoke_0_4.geometry} material={mainSmokeMaterial} />
          <mesh geometry={nodes.Cube002_whiteSmoke_0_5.geometry} material={mainSmokeMaterial} />
          <mesh geometry={nodes.Cube002_whiteSmoke_0_6.geometry} material={mainSmokeMaterial} />
        </group>

        {/* Smoke of the bottom of the rocket - The right one */}
        <group
          ref={rightSmokeRef}
          position={[0.219, -49.549, -7.501]}
          rotation={[-Math.PI / 2, 0, 2.009]}
          scale={8.725}
        >
          <mesh geometry={nodes.Cube015_whiteSmoke_0.geometry} material={mainSmokeMaterial} />
          <mesh geometry={nodes.Cube015_whiteSmoke_0_1.geometry} material={mainSmokeMaterial} />
          <mesh geometry={nodes.Cube015_whiteSmoke_0_2.geometry} material={mainSmokeMaterial} />
          <mesh geometry={nodes.Cube015_whiteSmoke_0_3.geometry} material={mainSmokeMaterial} />
          <mesh geometry={nodes.Cube015_whiteSmoke_0_4.geometry} material={mainSmokeMaterial} />
          <mesh geometry={nodes.Cube015_whiteSmoke_0_5.geometry} material={mainSmokeMaterial} />
          <mesh geometry={nodes.Cube015_whiteSmoke_0_6.geometry} material={mainSmokeMaterial} />
        </group>

        {/* Smoke of the rocket - 10 Different Scenarios */}
        <group ref={smokeScenario1Ref}>
          <mesh
            geometry={nodes.Cube005_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[9.242, -58.265, 16.27]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={3.779}
          />
          <mesh
            geometry={nodes.Cube016_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[4.149, -53.128, -17.658]}
            rotation={[-Math.PI / 2, 0, 0.89]}
            scale={3.422}
          />
          <mesh
            geometry={nodes.Cube026_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[4.802, -64.393, 0.81]}
            rotation={[-Math.PI / 2, 0, 0.89]}
            scale={1.497}
          />
        </group>

        <group ref={smokeScenario2Ref}>
          <mesh
            geometry={nodes.Cube006_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[-6.108, -53.366, 1.602]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={2.806}
          />
          <mesh
            geometry={nodes.Cube017_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[-8.898, -51.633, -12.242]}
            rotation={[-Math.PI / 2, 0, 0.89]}
            scale={2.54}
          />
          <mesh
            geometry={nodes.Cube027_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[2.893, -68.144, -2.732]}
            rotation={[-Math.PI / 2, 0, 0.89]}
            scale={0.682}
          />
        </group>

        <group ref={smokeScenario3Ref}>
          <mesh
            geometry={nodes.Cube007_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[8.037, -61.258, 9.053]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={2.61}
          />
          <mesh
            geometry={nodes.Cube018_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[3.62, -60.157, -19.141]}
            rotation={[-Math.PI / 2, 0, 0.89]}
            scale={2.363}
          />
          <mesh
            geometry={nodes.Cube028_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[-13.564, -60.157, 5.362]}
            rotation={[-Math.PI / 2, 0, 0.89]}
            scale={2.363}
          />
        </group>

        <group ref={smokeScenario4Ref}>
          <mesh
            geometry={nodes.Cube008_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[-1.58, -64.123, 13.925]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1.654}
          />
          <mesh
            geometry={nodes.Cube019_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[2.893, -61.372, -8.462]}
            rotation={[-Math.PI / 2, 0, 0.89]}
            scale={1.497}
          />
        </group>

        <group ref={smokeScenario5Ref}>
          <mesh
            geometry={nodes.Cube009_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[-3.675, -55.488, 21.601]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1.654}
          />
          <mesh
            geometry={nodes.Cube020_whiteSmoke_0.geometry}
            material={materials["white.Smoke"]}
            position={[9.203, -52.402, -2.603]}
            rotation={[-Math.PI / 2, 0, 0.89]}
            scale={1.497}
          />
        </group>

        <group ref={smokeScenario6Ref}>
          <mesh
            geometry={nodes.Cube010_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[2.853, -50.517, 17.388]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={2.61}
          />
          <mesh
            geometry={nodes.Cube021_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[6.953, -49.053, -11.119]}
            rotation={[-Math.PI / 2, 0, 0.89]}
            scale={2.363}
          />
        </group>

        <group ref={smokeScenario7Ref}>
          <mesh
            geometry={nodes.Cube011_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[1.753, -57.551, 4.538]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1.963}
          />
          <mesh
            geometry={nodes.Cube022_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[-3.138, -56.907, -15.13]}
            rotation={[-Math.PI / 2, 0, 0.89]}
            scale={1.777}
          />
        </group>

        <group ref={smokeScenario8Ref}>
          <mesh
            geometry={nodes.Cube012_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[-11.382, -59.535, -1.107]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1.654}
          />
          <mesh
            geometry={nodes.Cube023_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[-13.386, -57.219, -10.598]}
            rotation={[-Math.PI / 2, 0, 0.89]}
            scale={1.497}
          />
        </group>

        <group ref={smokeScenario9Ref}>
          <mesh
            geometry={nodes.Cube013_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[-2.944, -57.551, 10.181]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1.07}
          />
          <mesh
            geometry={nodes.Cube024_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[-1.542, -55.422, -8.982]}
            rotation={[-Math.PI / 2, 0, 0.89]}
            scale={0.969}
          />
        </group>

        <group ref={smokeScenario10Ref}>
          <mesh
            geometry={nodes.Cube014_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[-8.111, -55.444, 11.311]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={3.779}
          />
          <mesh
            geometry={nodes.Cube025_whiteSmoke_0.geometry}
            material={smokeMaterial}
            position={[-2.721, -55.323, -4.149]}
            rotation={[0.738, 0, 2.252]}
            scale={[-3.422, 3.422, 3.422]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/rocket.glb");
