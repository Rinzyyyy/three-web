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

      const initialPosition = { x: 0, y: 15, z: 15 };

      if (clock.elapsedTime > 5) {
        initialPosition.z = camera.position.z;
      }

      // Calculate offset (with small nudge values)
      const offsetX = THREE.MathUtils.clamp(pointer.x * 5, -10, 10); // max 10 units in either direction
      const offsetY = THREE.MathUtils.clamp(pointer.y * 2, 1, 5); // max 2 units up/down

      const targetPosition = new THREE.Vector3(
        initialPosition.x + offsetX,
        initialPosition.y + offsetY,
        initialPosition.z
      );

      // Smoothly move toward target
      camera.position.lerp(
        cameraPosition?.targetPosition || targetPosition,
        0.05
      );

      // Look slightly upward (you can tweak this)
      const lookAtPosition =
        cameraPosition?.lookAt || new THREE.Vector3(0, 12, 0);
      camera.lookAt(lookAtPosition);
    });
    return <></>;
  }

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 40, 90] }}
      shadows
      style={{ width: "100%", height: "100vh" }}
    >
      <Suspense>
        {/* <fog attach="fog" args={["#a1a19f", 10, 180]} /> */}
        <Rig />
        {/* <OrbitControls  enabled={!cameraPosition} enableRotate={false} minDistance={15} maxDistance={90} /> */}
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={1} />
        {/* <axesHelper args={[5]} />
        <gridHelper args={[20]} /> */}

        {/* <Environment preset="sunset" /> */}

        {/* Ground */}
        <Plane
          width={60}
          height={100}
          rotate={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 40]}
          color="#a0a09e"
        />

        {/* ceil */}
        <Plane
          width={60}
          height={100}
          rotate={[-Math.PI / 2, 0, 0]}
          position={[0, 60, 40]}
          color="#222"
        />

        {/* SideWall */}
        <ThickPlane
          width={70}
          rotate={[0, -Math.PI / 2, 0]}
          position={[-30, 30, 54.75]}
          color="#d3eafc"
        />
        <ThickPlane
          width={70}
          rotate={[0, -Math.PI / 2, 0]}
          position={[30, 30, 54.75]}
          color="#d3eafc"
        />

        {/* project */}
        <ProjectBoards
          cameraPosition={cameraPosition}
          setCameraPosition={setCameraPosition}
        />

        {/* partition */}
        <ThickPlane
          width={21}
          height={60}
          rotate={[0, -Math.PI, 0]}
          position={[-25, 30, 20]}
          opacity={1}
          color="#dbdad1"
        />
        <ThickPlane
          width={21}
          height={60}
          rotate={[0, Math.PI, 0]}
          position={[25, 30, 20]}
          opacity={1}
          color="#dbdad1"
        />

        {/* Room */}
        <Plane
          width={16}
          rotate={[0, -Math.PI / 2, 0]}
          position={[15, 30, 12]}
          color="#333"
        />
        <Plane
          width={16}
          rotate={[0, -Math.PI / 2, 0]}
          position={[-15, 30, 12]}
          color="#333"
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
