import { DoubleSide, Vector3 } from "three";

type PlaneHelperProps = {
  rotate?: [x: number, y: number, z: number];
  position?: Vector3 | [x: number, y: number, z: number];
  width?: number;
  height?: number;
  thick?: number;
  color?: string;
  opacity?: number;
};

const ThickPlane = ({
  rotate,
  position = [0, 0, 0],
  width = 10,
  height = 60,
  thick = 0.5,
  color = "#999",
  opacity = 1,
}: PlaneHelperProps) => {
  return (
    <mesh rotation={rotate} receiveShadow position={position}>
      <boxGeometry args={[width, height, thick]} />
      <meshStandardMaterial
        color={color}
        transparent={true}
        opacity={opacity}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default ThickPlane;
