import React from "react";
import { useGLTF } from "@react-three/drei";

export function Platform(props) {
  const { nodes, materials } = useGLTF("/models/platform.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Platform_Accent1_lambert1_0.geometry}
        material={materials.lambert1}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload("/models/platform.glb");
