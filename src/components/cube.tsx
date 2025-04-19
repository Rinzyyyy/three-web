import React from "react";
import { Object3D, Object3DEventMap } from "three";

const Cube: React.FC = () => {
  const meshRef = React.useRef<Object3D<Object3DEventMap>>(null!);

  // useFrame(({ clock }) => {
  //   meshRef.current.position.y = Math.sin(clock.elapsedTime) + 2;
  // });

  return (
    <mesh ref={meshRef} position={[0, 1, 10]} receiveShadow>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial
        color="#999"
        transparent={true}
        opacity={1}
        depthWrite={false}
        metalness={1}
        roughness={1}

      />
      {/* <Edges color="#E5FBFF" /> */}
    </mesh>
  );
};

export default Cube;
