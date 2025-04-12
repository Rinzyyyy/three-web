import React from "react";
import { Object3D, Object3DEventMap } from "three";

const Cube: React.FC = () => {
  const meshRef = React.useRef<Object3D<Object3DEventMap>>(null!);

  // useFrame(({ clock }) => {
  //   meshRef.current.position.y = Math.sin(clock.elapsedTime) + 2;
  // });

  return (
    <mesh ref={meshRef} position={[0, 1, 10]} receiveShadow >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#ff0000"
        transparent={true}
        opacity={0.8}
        depthWrite={false}
        metalness={0.3}
        roughness={0}
      />
    
      
      {/* <Edges color="black" /> */}
    </mesh>
  );
};

export default Cube;
