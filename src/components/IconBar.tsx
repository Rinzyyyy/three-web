import { Vector3 } from "three";
import { useGenerateIconTextureMaps } from "../hooks/getTextureMaps";

type IconBarProps = {
  width: number;
  height: number;
  texture: string;
  position: Vector3 | [x: number, y: number, z: number];
  rotate?: [x: number, y: number, z: number];
};

export default function IconBar({
  width,
  height,
  texture,
  rotate,
  position,
}: IconBarProps) {
  const { textureMaps } = useGenerateIconTextureMaps(texture);

  return (
    <mesh rotation={rotate} position={position} receiveShadow>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial transparent {...textureMaps} />
    </mesh>
  );
}
