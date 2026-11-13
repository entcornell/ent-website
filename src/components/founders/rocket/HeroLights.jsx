const HeroLights = () => {
  return (
    <>
      {/* Single light from top left */}
      <spotLight
        position={[-10, 15, 0]}
        angle={0.8}
        intensity={200}
        penumbra={0.5}
        color="#ffffff"
      />

      {/* Single light from top right */}
      <spotLight
        position={[10, 15, 0]}
        angle={0.8}
        intensity={200}
        penumbra={0.5}
        color="#ffffff"
      />

      {/* Single light from bottom left */}
      <spotLight
        position={[-10, -15, 0]}
        angle={0.8}
        intensity={200}
        penumbra={0.5}
        color="#ffffff"
      />

      {/* Single light from bottom right */}
      <spotLight
        position={[10, -15, 0]}
        angle={0.8}
        intensity={200}
        penumbra={0.5}
        color="#ffffff"
      />

      {/* Single light from top front */}
      <spotLight
        position={[0, 15, 10]}
        angle={0.8}
        intensity={200}
        penumbra={0.5}
        color="#ffffff"
      />

      {/* Single light from top back */}
      <spotLight
        position={[0, 15, -10]}
        angle={0.8}
        intensity={200}
        penumbra={0.5}
        color="#ffffff"
      />

      {/* Single light from bottom front */}
      <spotLight
        position={[0, -15, 10]}
        angle={0.8}
        intensity={200}
        penumbra={0.5}
        color="#ffffff"
      />

      {/* Single light from bottom back */}
      <spotLight
        position={[0, -15, -10]}
        angle={0.8}
        intensity={200}
        penumbra={0.5}
        color="#ffffff"
      />

      {/* Single light from front */}
      <spotLight position={[0, 8, 10]} angle={0.8} intensity={100} penumbra={0.5} color="#ffffff" />

      {/* Single light from back */}
      <spotLight
        position={[0, 8, -10]}
        angle={0.8}
        intensity={100}
        penumbra={0.5}
        color="#ffffff"
      />
    </>
  );
};

export default HeroLights;
