import { ReactNode, useMemo, useRef } from "react";
import * as THREE from "three";
import SpotLightWithHelper from "../lights/SpotLightWithHelper ";

type CurvedWallProps = {
  width?: number;
  height?: number;
  radius?: number;
  children?: ReactNode;
};

export default function CurvedWall({
  width = 48,
  height = 30,
  radius = 15,
  children,
}: CurvedWallProps) {
  const groupRef = useRef<THREE.Object3D>(null!);
  const geometry = useMemo(() => {
    const segmentsX = width + 5;
    const segmentsY = Number((height * 0.8).toFixed(0));
    const geo = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
    const position = geo.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i);

      const x = vertex.x;
      const theta = x / radius;

      const newX = Math.sin(theta) * radius;
      const newZ = radius - Math.cos(theta) * radius;

      // vertex.x = newX;
      // vertex.z = newZ;

      position.setXYZ(i, newX, vertex.y, newZ);
    }

    position.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [width, height, radius]);

  return (
    <>
      <group position={[0, 15, -10]}>
        <mesh ref={groupRef} geometry={geometry} position={[0, 0, 0]}>
          <meshStandardMaterial color="#333" side={THREE.DoubleSide} />
        </mesh>

        <group position={[0, -5, 6]} rotateX={0.1}>
          {children}
          {/* <Html position={[-9.2, 0, 0]}> {children}</Html> */}
        </group>
      </group>
      {children && (
        <SpotLightWithHelper
          position={[0, 1, 10]}
          target={groupRef?.current}
          angle={0.95}
          intensity={250}
          distance={15}
        />
      )}
    </>
  );
}
