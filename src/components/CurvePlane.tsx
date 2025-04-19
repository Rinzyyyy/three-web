import { useMemo } from "react";
import * as THREE from "three";

export default function CurvedWall({
  width = 48,
  height = 30,
  segmentsX = 50,
  segmentsY = 20,
  radius = 15,
}) {
  const geometry = useMemo(() => {
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
  }, [width, height, segmentsX, segmentsY, radius]);

  return (
    <mesh geometry={geometry} position={[0, 15, -10]}>
      <meshStandardMaterial color="#333" side={THREE.DoubleSide} />
    </mesh>
  );
}
