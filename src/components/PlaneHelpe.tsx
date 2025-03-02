import { DoubleSide } from "three";

const PlaneHelper = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow >
      <planeGeometry args={[10, 10]}/>
      <meshStandardMaterial color="#fff" transparent={true} opacity={0.3} side={DoubleSide}/>
    </mesh>
  );
};

export default PlaneHelper;
