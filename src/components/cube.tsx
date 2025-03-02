import React from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, OrbitControls } from "@react-three/drei";
import { Object3D, Object3DEventMap } from "three";

const Cube: React.FC = () => {
  const meshRef = React.useRef<Object3D<Object3DEventMap>>(null!);

  // useFrame(({ clock }) => {
  //   meshRef.current.position.y = Math.sin(clock.elapsedTime) + 2;
  // });

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0]} receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#fff"
        transparent={true}
        opacity={0.8}
        depthWrite={false}
        metalness={0.3}
        roughness={0}
      />
      {/* <Edges color="black" /> */}
      <OrbitControls />
    </mesh>
  );
};

export default Cube;
