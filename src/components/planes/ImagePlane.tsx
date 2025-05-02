import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

type ImagePlaneProps = {
  path: string;
  position: [number, number, number];
};

export function ImagePlane({ path, position }: ImagePlaneProps) {
  const texture = useLoader(THREE.TextureLoader, path);

  return (
    <mesh position={position}>
      <planeGeometry args={[2, 2]}  />
      <meshBasicMaterial map={texture} transparent alphaTest={0.5} />
    </mesh>
  );
}
