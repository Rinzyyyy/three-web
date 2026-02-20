import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Html, OrbitControls, useProgress } from "@react-three/drei";
import LoadingAnimation from "./components/LoadingAnimation";
import Gallery from "./components/Gallery";
import MobileLayout from "./components/mobile";

export default function App() {
  const { progress, active } = useProgress();
  const isFinished = progress === 100 && !active;
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <Canvas
          dpr={[1, 1]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 40, 90] }}
          shadows
        >
          <color attach="background" args={["#000"]} />
          <OrbitControls enableZoom={false} enableRotate={false} />
          <ambientLight intensity={0.2} />

          <Html
            prepend
            fullscreen
            style={{ display: loadingFinished ? "none" : "block" }}
          >
            <LoadingAnimation isInSuspense isFinished={isFinished} />
          </Html>

          <Suspense fallback={null}>
            <Html prepend fullscreen visible={!loadingFinished}>
              <LoadingAnimation onFinish={() => setLoadingFinished(true)} />
            </Html>
            <Gallery visible={loadingFinished} />
          </Suspense>
        </Canvas>
      )}
    </>
  );
}
