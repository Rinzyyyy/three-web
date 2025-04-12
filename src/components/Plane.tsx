import { DoubleSide, Vector3 } from "three";

type PlaneHelperProps = {
  rotate?: [x: number, y: number, z: number];
  position?: Vector3 | [x: number, y: number, z: number];
  width?: number;
  height?: number;
  color?: string;
};

const Plane = ({
  rotate,
  position = [0, 0, 0],
  width = 10,
  height = 30,
  color = "#fff",
}: PlaneHelperProps) => {
  return (
    <mesh rotation={rotate} receiveShadow position={position}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        color={color}
        // transparent={true}
        opacity={0.3}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Plane;
