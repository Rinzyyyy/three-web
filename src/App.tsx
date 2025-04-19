import { RefObject, Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import Cube from "./components/cube";
import ThickPlane from "./components/ThickPlane";
import { Environment, OrbitControls } from "@react-three/drei";
import CurvedWall from "./components/CurvePlane";
import * as THREE from "three";
import Plane from "./components/Plane";
import SkillTree from "./components/SkillTree";
import { posterize } from "three/tsl";

export default function App() {
  const controlsRef = useRef(null!);
  const [cameraPosition, setCameraPosition] = useState<{
    targetPosition: THREE.Vector3;
    lookAt: number;
  } | null>(null);

  function Rig() {
    useFrame((state) => {
      const camera = state.camera;
      const pointer = state.pointer;
      const clock = state.clock;

      const basePosition = { x: 0, y: 3, z: 15 };

      if (clock.elapsedTime > 5) {
        basePosition.z = camera.position.z;
      }

      // Calculate offset (with small nudge values)
      const offsetX = THREE.MathUtils.clamp(pointer.x * 5, -10, 10); // max 10 units in either direction
      const offsetY = THREE.MathUtils.clamp(pointer.y * 2, 1, 5); // max 2 units up/down

      const targetPosition = new THREE.Vector3(
        basePosition.x + offsetX,
        basePosition.y + offsetY,
        basePosition.z
      );

      // Smoothly move toward target
      camera.position.lerp(
        cameraPosition?.targetPosition || targetPosition,
        0.05
      );

      // Look slightly upward (you can tweak this)
      const y = cameraPosition?.lookAt || 5;
      camera.lookAt(0, y, 0);
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
      camera={{ position: [0, 20, 90] }}
      shadows
      style={{ width: "100%", height: "100vh" }}
    >
      <Suspense>
        <Rig />
        {/* <OrbitControls enableRotate={false} minDistance={15} maxDistance={90} /> */}
        <OrbitControls enabled={!cameraPosition} />
        {/* <ambientLight intensity={0.2} /> */}
        {/* <axesHelper args={[5]} />
        <gridHelper args={[20]} /> */}
        {/* <DirectLightWithHelper position={[0, 20, 15]} /> */}
        <Environment preset="sunset" />
        {/* Ground */}z
        <Plane
          width={30}
          height={100}
          rotate={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 40]}
          color="#333"
        />
        {/* SideWall */}
        <ThickPlane
          width={70}
          rotate={[0, -Math.PI / 2, 0]}
          position={[-15, 15, 54.75]}
        />
        <ThickPlane
          width={70}
          rotate={[0, -Math.PI / 2, 0]}
          position={[15, 15, 54.75]}
        />
        {/* Room */}
        <ThickPlane
          width={10}
          rotate={[0, 0, 0]}
          position={[-10, 15, 20]}
          opacity={0.8}
        />
        <ThickPlane
          width={10}
          rotate={[0, 0, 0]}
          position={[10, 15, 20]}
          opacity={0.8}
        />
        <Plane
          width={16}
          rotate={[0, -Math.PI / 2, 0]}
          position={[15, 15, 12]}
          color="#333"
        />
        <Plane
          width={16}
          rotate={[0, -Math.PI / 2, 0]}
          position={[-15, 15, 12]}
          color="#333"
        />
        <CurvedWall />
        <SkillTree
          position={[0, 2.5, 10]}
          cameraPosition={cameraPosition}
          setCameraPosition={setCameraPosition}
        />
        <Cube />
      </Suspense>
    </Canvas>
  );
}
