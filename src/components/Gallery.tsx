import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import Plane from "../components/planes/Plane";
import SkillTree from "../components/SkillTree";
import { skills } from "../constant/skillData";
import ArticleScreen from "../components/ArticleScreen";
import ProjectBoards from "../components/ProjectBoards";
import CurvedWall from "../components/planes/CurvePlane";
import ThickPlane from "../components/planes/ThickPlane";
import * as THREE from "three";

const Gallery = ({ visible }: { visible: boolean }) => {
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);

  const [cameraPosition, setCameraPosition] = useState<{
    targetPosition: THREE.Vector3;
    lookAt: THREE.Vector3;
  } | null>(null);

  const initialPosition = new THREE.Vector3(0, 15, 15);
  const initialLookAt = new THREE.Vector3(0, 12, 0);

  useFrame((state) => {
    const camera = state.camera;
    const pointer = state.pointer;
    const clock = state.clock;

    if (clock.elapsedTime > 5) {
      // calculate offset (with small nudge values)
      const offsetX = THREE.MathUtils.clamp(pointer.x * 2, -3, 3);
      const { x, y, z } = cameraPosition?.targetPosition || initialPosition;
      // smoothly move toward target
      camera.position.lerp({ x: x + offsetX, y, z }, 0.05);
      camera.lookAt(cameraPosition?.lookAt || initialLookAt);
    }
  });

  return (
    <group visible={visible}>
      {/* Ground */}
      <Plane
        width={60}
        height={120}
        rotate={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 45]}
        color="#555"
        texture="concrete01"
      />

      {/* ceil */}
      <Plane
        width={60}
        height={120}
        rotate={[-Math.PI / 2, 0, 0]}
        position={[0, 90, 45]}
        color="#fefcfc"
        light
      />

      {/* SideWall */}
      <Plane
        width={90}
        rotate={[0, -Math.PI / 2, 0]}
        position={[-29, 45, 60]}
        texture="concrete02"
        emissive="#757373"
      />
      <Plane
        width={90}
        rotate={[0, -Math.PI / 2, 0]}
        position={[29, 45, 60]}
        texture="concrete02"
        emissive="#757373"
      />

      {/* project */}
      <ProjectBoards
        cameraPosition={cameraPosition}
        setCameraPosition={setCameraPosition}
      />

      {/* Pillars */}
      <ThickPlane
        width={6}
        rotate={[0, -Math.PI, 0]}
        position={[28, 45, 16]}
        thick={10}
        color="#d0e3f4"
        metalness={1}
        roughness={0.1}
      />
      <ThickPlane
        width={6}
        rotate={[0, -Math.PI, 0]}
        position={[-28, 45, 16]}
        thick={10}
        color="#d0e3f4"
        metalness={1}
        roughness={0.1}
      />

      {/* display */}
      <CurvedWall isDisplay={!!selectedSkill}>
        <ArticleScreen
          skillInfo={selectedSkill ? skills[selectedSkill] : undefined}
          data={selectedSkill ? skills[selectedSkill].content : undefined}
        />
      </CurvedWall>

      <SkillTree
        position={[0, 10, 7]}
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
        cameraPosition={cameraPosition}
        setCameraPosition={setCameraPosition}
      />
    </group>
  );
};

export default Gallery;
