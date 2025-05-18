import { Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import ThickPlane from "./components/planes/ThickPlane";
import { Html, OrbitControls } from "@react-three/drei";
import CurvedWall from "./components/planes/CurvePlane";
import * as THREE from "three";
import Plane from "./components/planes/Plane";
import SkillTree from "./components/SkillTree";
import { skills } from "./constant/skillData";
// import { ImagePlane } from "./components/planes/ImagePlane";
import ArticleScreen from "./components/ArticleScreen";
import ProjectBoards from "./components/ProjectBoards";
import LoadingAnimation from "./components/LoadingAnimation";

export default function App() {
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const [cameraPosition, setCameraPosition] = useState<{
    targetPosition: THREE.Vector3;
    lookAt: THREE.Vector3;
  } | null>(null);

  function Rig() {
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
      <OrbitControls enableZoom={false} enableRotate={false} />
      <ambientLight intensity={0.3} />

      <Suspense
        fallback={
          <Html prepend fullscreen>
            <LoadingAnimation isInSuspense />
          </Html>
        }
      >
        <Html prepend fullscreen visible={!loadingFinished}>
          <LoadingAnimation onFinish={() => setLoadingFinished(true)} />
        </Html>

        <group visible={loadingFinished}>
          <Rig />
          {/* Ground */}
          <Plane
            width={60}
            height={100}
            rotate={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 40]}
            color="#555"
            texture="concrete01"
          />

          {/* ceil */}
          <Plane
            width={60}
            height={100}
            rotate={[-Math.PI / 2, 0, 0]}
            position={[0, 90, 40]}
            color="#fefcfc"
            light
          />

          {/* SideWall */}
          <Plane
            width={80}
            rotate={[0, -Math.PI / 2, 0]}
            position={[-29, 45, 55]}
            texture="concrete02"
            emissive="#5f5d5d"
          />
          <Plane
            width={80}
            rotate={[0, -Math.PI / 2, 0]}
            position={[29, 45, 55]}
            texture="concrete02"
            emissive="#5f5d5d"
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

          {/* <ImagePlane path="/images/react-logo.png" position={[2, 10, 10]} /> */}
        </group>
      </Suspense>
    </Canvas>
  );
}
