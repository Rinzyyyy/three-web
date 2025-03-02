import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import {
  DirectionalLightHelper,
  Object3D,
  Object3DEventMap,
} from "three";

const LightHelper = ({
  position,
}: {
  position: [x: number, y: number, z: number];
}) => {
  const lightRef = useRef<Object3D<Object3DEventMap>>(null!);

  useHelper(lightRef, DirectionalLightHelper, 2, "white");

  return (
    <>
      <mesh position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
      </mesh>

      <directionalLight
        ref={lightRef}
        castShadow
        position={[0, 15, 5]}
        intensity={0.6}
      />
     
    </>
  );
};

export default LightHelper;
