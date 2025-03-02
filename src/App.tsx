import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import Cube from "./components/cube";
import PlaneHelper from "./components/PlaneHelpe";
import Sphere from "./components/sphere";
import DirectLightWithHelper from "./components/DirectLightWithHelper";

// import { useGLTF } from '@react-three/drei/native'
// import modelPath from './path/to/model.glb'

// function Model(props) {
//   const gltf = useGLTF(modelPath)
//   return <primitive {...props} object={gltf.scene} />
// }

export default function App() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [15, 15, 15], fov: 50 }}
      shadows
    >
      <Suspense>
        <ambientLight intensity={0.2} />
        <axesHelper args={[5]} />
        <gridHelper />
        <DirectLightWithHelper position={[0, 10, 5]} />
        <PlaneHelper />

        {/* <spotLight args={[0, 2, 0]} castShadow /> */}

        <Cube />
        <Sphere />
      </Suspense>
    </Canvas>
  );
}
