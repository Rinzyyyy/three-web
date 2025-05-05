import { DoubleSide, Vector3 } from "three";
import { CubeCamera } from "@react-three/drei";

type PlaneHelperProps = {
  rotate?: [x: number, y: number, z: number];
  position?: Vector3 | [x: number, y: number, z: number];
  width?: number;
  height?: number;
  thick?: number;
  color?: string;
  opacity?: number;
  texture?: string;
  metalness?: number;
  roughness?: number;
};

const ThickPlane = ({
  rotate,
  position = [0, 0, 0],
  width = 10,
  height = 90,
  thick = 0.5,
  color = "#999",
  opacity = 1,
  metalness,
  roughness,
}: PlaneHelperProps) => {
  return (
    <CubeCamera resolution={256} frames={1}>
      {(texture) => (
        <mesh rotation={rotate} receiveShadow position={position}>
          <boxGeometry args={[width, height, thick]} />
          <meshStandardMaterial
            color={color}
            transparent={true}
            opacity={opacity}
            side={DoubleSide}
            metalness={metalness}
            roughness={roughness}
            envMap={texture}
          />
        </mesh>
      )}
    </CubeCamera>
  );
};

export default ThickPlane;
