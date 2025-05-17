import * as THREE from "three";

type RectAreaLightProps = {
  color?: string;
  intensity: number;
  width: number;
  height: number;
  position: number[];
  rotation: number[];
};

const RectAreaLight = ({
  color = "#fff",
  intensity,
  width,
  height,
  position,
  rotation,
}: RectAreaLightProps) => {
  return (
    <primitive
      object={new THREE.RectAreaLight(color, intensity, width, height)}
      position={position}
      rotation={rotation}
    />
  );
};

export default RectAreaLight;
