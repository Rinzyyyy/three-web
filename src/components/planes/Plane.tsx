import { DoubleSide, Vector3 } from "three";

type PlaneHelperProps = {
  rotate?: [x: number, y: number, z: number];
  position?: Vector3 | [x: number, y: number, z: number];
  width?: number;
  height?: number;
  color?: string;
  transparent?: boolean;
  opacity?: number;
  metalness?: number;
  emissive?: string;
  emissiveIntensity?: number;
};

const Plane = ({
  rotate,
  position = [0, 0, 0],
  width = 10,
  height = 60,
  color = "#fff",
  transparent,
  opacity,
  metalness,
  emissive,
  emissiveIntensity,
}: PlaneHelperProps) => {
  return (
    <mesh rotation={rotate} position={position} receiveShadow>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        color={color}
        side={DoubleSide}
        transparent={transparent}
        opacity={opacity}
        metalness={metalness}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
};

export default Plane;
