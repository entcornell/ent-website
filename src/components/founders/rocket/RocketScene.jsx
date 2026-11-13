import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import HeroLights from "./HeroLights";
import AnimatedRocket from "./AnimatedRocket";
import AnimatedPlatform from "./AnimatedPlatform";

// ENT's 3D rocket on its platform, as it was on the earlier hero (wagnersebastiandc/
// ent-website): it settles, lifts off, comes back round and floats. Loaded lazily by
// Recruitment so three.js only downloads when this section is reached.
export default function RocketScene() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <HeroLights />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <AnimatedRocket />
      <AnimatedPlatform />
    </Canvas>
  );
}
