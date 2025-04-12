import React from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, Object3DEventMap } from "three";

const Sphere: React.FC = () => {
  const meshRef = React.useRef<Object3D<Object3DEventMap>>(null!);

  useFrame(({ clock }) => {
    meshRef.current.position.y = Math.sin(clock.elapsedTime) + 2;
  });

  return (
    <mesh ref={meshRef} position={[0, 10, 2]} castShadow>
      <sphereGeometry args={[1, 30, 30]} />
      <meshStandardMaterial color="#fff" metalness={0.5} roughness={0} />
      {/* <Edges color="black" /> */}
    </mesh>
  );
};

export default Sphere;
