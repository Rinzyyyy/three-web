import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper, Object3D, Object3DEventMap } from "three";

const LightHelper = ({
  position,
}: {
  position: [x: number, y: number, z: number];
}) => {
  const lightRef = useRef<Object3D<Object3DEventMap>>(null!);

  useHelper(lightRef, DirectionalLightHelper, 2, "white");

  return (
    <>
      <directionalLight
        ref={lightRef}
        position={position}
        intensity={1}
        castShadow
      />
    </>
  );
};

export default LightHelper;
