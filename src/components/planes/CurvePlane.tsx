import { ReactNode, useMemo, useRef } from "react";
import * as THREE from "three";

type CurvedWallProps = {
  width?: number;
  height?: number;
  radius?: number;
  children?: ReactNode;
  isDisplay?: boolean;
};

export default function CurvedWall({
  width = 72,
  height = 60,
  radius = 25,
  children,
  isDisplay = false,
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

      position.setXYZ(i, newX, vertex.y, newZ);
    }

    position.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [width, height, radius]);

  return (
    <>
      <group position={[0, 30, -10]}>
        <mesh ref={groupRef} geometry={geometry} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isDisplay ? "#828181" : "#333"}
            side={THREE.DoubleSide}
          />
        </mesh>

        <group position={[0, -15, 6]} rotateX={0.1}>
          {children}
        </group>
      </group>
    </>
  );
}
