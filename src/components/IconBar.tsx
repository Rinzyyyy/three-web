import { Vector3 } from "three";
import { useGenerateIconTextureMaps } from "../hooks/getTextureMaps";

type PlaneHelperProps = {
  rotate?: [x: number, y: number, z: number];
  position?: Vector3 | [x: number, y: number, z: number];
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
  texture?: string;
};

export default function IconBar({
  rotate,
  position = [0, 0, 0],
  width = 10,
  height = 90,
  opacity,
  texture,
}: PlaneHelperProps) {
  const { textureMaps } = useGenerateIconTextureMaps(texture);

  return (
    <mesh rotation={rotate} position={position} receiveShadow>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial transparent opacity={opacity} {...textureMaps}  />
    </mesh>
  );
}
