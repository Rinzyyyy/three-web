import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";

type BrainProps = {
  onClick?: () => void;
};

export default function Brain({ onClick }: BrainProps) {
  const { scene } = useGLTF("/models/brain_3d/brain.gltf");
  // const meshRef = React.useRef<Object3D<Object3DEventMap>>(null!);

  // useFrame(({ clock }) => {
  //   meshRef.current.position.y = Math.sin(clock.elapsedTime) * 0.1 ;
  // });

  useEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = false;
      }
    });
  }, [scene]);

  return (
    <mesh castShadow onClick={onClick}>
      <primitive object={scene} />
    </mesh>
  );
}
