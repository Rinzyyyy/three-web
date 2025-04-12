import { useGLTF } from "@react-three/drei";
import React from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, Object3DEventMap } from "three";

export default function Brain() {
  const { scene } = useGLTF("/models/brain_3d/brain.gltf");
  const meshRef = React.useRef<Object3D<Object3DEventMap>>(null!);

  useFrame(({ clock }) => {
    meshRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;
  });

  return (
    <>
      {/* Spotlight */}
      <spotLight
        position={[0, 3, 0]}
        angle={0.5}
        penumbra={0.8}
        intensity={2}
        castShadow
      />
      {/* <mesh  position={[0, 3, 0]} castShadow>
        <sphereGeometry args={[0.3, 10, 10]} />
      </mesh> */}
      <mesh ref={meshRef} position={[0, 0, 10]}>
        <primitive object={scene} />
      </mesh>
    </>
  );
}
