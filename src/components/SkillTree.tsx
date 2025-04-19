import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, Text, Html, Environment, Line } from "@react-three/drei";
import * as THREE from "three";
import Brain from "./Brain";
import { OrbitControls } from "three/examples/jsm/Addons.js";

type Skill = {
  name: string;
  sPosition: [number, number, number];
  color: string;
  rotation: number;
};

type SkillTreeProps = {
  position: [x: number, y: number, z: number];
  cameraPosition: {
    targetPosition: THREE.Vector3;
    lookAt: number;
  } | null;
  setCameraPosition: Dispatch<
    SetStateAction<{
      targetPosition: THREE.Vector3;
      lookAt: number;
    } | null>
  >;
};

export default function SkillTree({
  position,
  cameraPosition,
  setCameraPosition,
}: SkillTreeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<THREE.Group[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  function handelClickBrain() {
    setSelected(null);
    setCameraPosition(null);
  }

  function handleClickSkill(index: number) {
    setSelected((pre) => (pre === index ? null : index));

    if (cameraPosition && selected === index) {
      setCameraPosition(null);
      return;
    }

    const targetPosition = new THREE.Vector3(0, 5, 15);
    const lookAt = 7;
    setCameraPosition({ targetPosition, lookAt });
  }

  const skills: Skill[] = [
    {
      name: "Front-End",
      sPosition: [0, 1.2, 1],
      color: "#BDDADF",
      rotation: 0,
    },
    {
      name: "Back-End",
      sPosition: [1.3, 1.3, -0.6],
      color: "#D5C1CB",
      rotation: -2,
    },
    {
      name: "Project",
      sPosition: [-1.3, 1.5, -0.6],
      color: "#D2D7B6",
      rotation: 2,
    },
  ];

  const scale = useRef(0);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      if (scale.current < 1) {
        scale.current += 0.02; // 成長速度
        groupRef.current.scale.set(scale.current, scale.current, scale.current);
      }
      if (!hovered) {
        groupRef.current.position.y = Math.sin(clock.elapsedTime) * 0.1 + 2.5;
      }

      const rotationY = selected ? skills[selected].rotation : 0;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotationY,
        0.1
      );

      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        const isSelected = i === selected;
        node.rotation.y = THREE.MathUtils.lerp(
          node.rotation.y,
          isSelected ? -rotationY : 0,
          0.1
        );
      });
    }
  });
  const centerPosition = new THREE.Vector3(0, -0.1, 0);

  return (
    <mesh ref={groupRef} position={position} scale={0} castShadow>
      {Array.from({ length: skills.length }).map((_, i) => (
        <Line
          key={`line_${i}`}
          points={[centerPosition, skills[i].sPosition]}
          color="#666"
          lineWidth={1}
          vertexColors={[new THREE.Color("#FF0000"), new THREE.Color("#fff")]}
        />
      ))}

      <Brain onClick={handelClickBrain} />

      {skills.map(({ name, sPosition, color }, i) => (
        <group
          position={sPosition}
          key={`skill_${i}`}
          ref={(el) => {
            if (el) nodeRefs.current[i] = el;
          }}
        >
          (
          <Sphere
            args={[0.2, 32, 32]}
            onPointerOver={() => setHovered(name)}
            onPointerOut={() => setHovered(null)}
            onClick={() => handleClickSkill(i)}
            scale={hovered === name || selected == i ? 1.7 : 1}
          >
            <meshPhysicalMaterial
              color={hovered === name || selected === i ? color : "#C2C1C1"}
              metalness={1.5}
              roughness={0.5}
              opacity={0.9}
              transparent
            />
          </Sphere>
          )
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {name}
          </Text>
        </group>
      ))}
    </mesh>
  );
}
