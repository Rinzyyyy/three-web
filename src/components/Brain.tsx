import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Object3D, Vector3 } from "three";

type BrainProps = {
  scale: number;
  position?: Vector3;
  onClick?: () => void;
};

export default function Brain({ scale, position, onClick }: BrainProps) {
  const { scene } = useGLTF("/models/brain_3d/brain.gltf");

  useEffect(() => {
    scene.traverse((obj: Object3D) => {
      if (obj) {
        obj.castShadow = true;
        obj.receiveShadow = false;
      }
    });
  }, [scene]);

  return (
    <mesh castShadow onClick={onClick} position={position}>
      <primitive object={scene} scale={scale} />
    </mesh>
  );
}
