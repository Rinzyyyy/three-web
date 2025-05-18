// import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type SpotLightProps = {
  position: [x: number, y: number, z: number];
  target?: THREE.Object3D<THREE.Object3DEventMap>;
  angle?: number;
  intensity?: number;
  distance?: number;
};

const SpotLight = ({
  position = [0, 20, 15],
  target,
  angle = 0.8,
  intensity = 10,
  distance = 10,
}: SpotLightProps) => {
  const lightRef = useRef<THREE.SpotLight>(null!);

  // useHelper(lightRef, THREE.SpotLightHelper, "white");

  return (
    <>
      <spotLight
        ref={lightRef}
        position={position}
        target={target}
        angle={angle}
        intensity={intensity}
        distance={distance}
        castShadow
      />
    </>
  );
};

export default SpotLight;
