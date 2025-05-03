import { Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import ThickPlane from "./components/planes/ThickPlane";
import { OrbitControls } from "@react-three/drei";
import CurvedWall from "./components/planes/CurvePlane";
import * as THREE from "three";
import Plane from "./components/planes/Plane";
import SkillTree from "./components/SkillTree";
import { skills } from "./constant/skillData";
// import { ImagePlane } from "./components/planes/ImagePlane";
import ArticleScreen from "./components/ArticleScreen";
import ProjectBoards from "./components/ProjectBoards";

export default function App() {
  const [cameraPosition, setCameraPosition] = useState<{
    targetPosition: THREE.Vector3;
    lookAt: THREE.Vector3;
  } | null>(null);

  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);

  function Rig() {
    useFrame((state) => {
      const camera = state.camera;
      const pointer = state.pointer;
      const clock = state.clock;

      const initialPosition = new THREE.Vector3(0, 15, 15);

      if (clock.elapsedTime > 5) {
        initialPosition.z = camera.position.z;
      }

      // calculate offset (with small nudge values)
      const offsetX = THREE.MathUtils.clamp(pointer.x * 3, -5, 5);

      const { x, y, z } = cameraPosition?.targetPosition || initialPosition;

      const targetPosition = new THREE.Vector3(x + offsetX, y, z);

      // smoothly move toward target
      camera.position.lerp(targetPosition, 0.05);

      camera.lookAt(cameraPosition?.lookAt || new THREE.Vector3(0, 12, 0));
    });
    return <></>;
  }

  return (
    <Canvas
      dpr={[1, 1]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 40, 90] }}
      shadows
      style={{ width: "100%", height: "100vh" }}
    >
      <Suspense>
        <Rig />
        <OrbitControls enableZoom={false} enableRotate={false} />
        <ambientLight intensity={1} />
        {/* <Environment preset="sunset" /> */}

        {/* Ground */}
        <Plane
          width={60}
          height={100}
          rotate={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 40]}
          color="#dcdccf"
          texture="concrete01"
        />

        {/* ceil */}
        <Plane
          width={60}
          height={100}
          rotate={[-Math.PI / 2, 0, 0]}
          position={[0, 60, 40]}
          color="#696868"
          light
        />

        {/* SideWall */}
        <Plane
          width={80}
          rotate={[0, -Math.PI / 2, 0]}
          position={[-29, 30, 55]}
          texture="concrete02"
        />
        <Plane
          width={80}
          rotate={[0, -Math.PI / 2, 0]}
          position={[29, 30, 55]}
          texture="concrete02"
        />

        {/* project */}
        <ProjectBoards
          cameraPosition={cameraPosition}
          setCameraPosition={setCameraPosition}
        />

        {/* Pillars */}
        <ThickPlane
          width={10}
          rotate={[0, -Math.PI, 0]}
          position={[29, 30, 16]}
          thick={10}
          color="#4d4d4d"
        />
        <ThickPlane
          width={10}
          rotate={[0, -Math.PI, 0]}
          position={[-29, 30, 16]}
          thick={10}
          color="#4d4d4d"
        />

        {/* display */}
        <CurvedWall isDisplay={!!selectedSkill}>
          {selectedSkill !== null && (
            <ArticleScreen
              skillInfo={skills[selectedSkill]}
              data={skills[selectedSkill].content}
            />
          )}
        </CurvedWall>

        <SkillTree
          position={[0, 10, 7]}
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
          cameraPosition={cameraPosition}
          setCameraPosition={setCameraPosition}
        />

        {/* <ImagePlane path="/images/react-logo.png" position={[2, 10, 10]} /> */}
      </Suspense>
    </Canvas>
  );
}
