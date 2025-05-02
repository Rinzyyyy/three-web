import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Text, Line } from "@react-three/drei";
import * as THREE from "three";
import Brain from "./Brain";
import { skills } from "../constant/skillData";

type SkillTreeProps = {
  position: [x: number, y: number, z: number];
  selectedSkill: number | null;
  setSelectedSkill: Dispatch<SetStateAction<number | null>>;
  cameraPosition: {
    targetPosition: THREE.Vector3;
    lookAt: THREE.Vector3;
  } | null;
  setCameraPosition: Dispatch<
    SetStateAction<{
      targetPosition: THREE.Vector3;
      lookAt: THREE.Vector3;
    } | null>
  >;
};

export default function SkillTree({
  position,
  cameraPosition,
  setCameraPosition,
  selectedSkill,
  setSelectedSkill,
}: SkillTreeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<THREE.Group[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  function handelClickBrain() {
    setSelectedSkill(null);
    setCameraPosition(null);
  }

  function handleClickSkill(index: number) {
    setSelectedSkill((pre) => {
      // click twice  to set back to initial position
      if (cameraPosition && pre === index) {
        setCameraPosition(null);
      } else if (index === 2) {
        // when click project node
        setCameraPosition({
          targetPosition: new THREE.Vector3(0, 18, 98),
          lookAt: new THREE.Vector3(0, 6, 0),
        });
      } else {
        // click to take a look on th screen
        setCameraPosition({
          targetPosition: new THREE.Vector3(0, 5, 15),
          lookAt: new THREE.Vector3(0, 7, 0),
        });
      }

      // click twice to inactive skill and once for selecting
      return pre === index ? null : index;
    });
  }

  const scale = useRef(0);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      if (scale.current < 1) {
        scale.current += 0.02;
        groupRef.current.scale.set(scale.current, scale.current, scale.current);
      }
      if (!hovered) {
        groupRef.current.position.y = Math.sin(clock.elapsedTime) * 0.1 + 2.5;
      }

      // when click rotate to focus on
      const rotationY = selectedSkill ? skills[selectedSkill].rotation : 0;

      //rotate brain
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotationY,
        0.1
      );
      //rotate specific skill node
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        const isSelected = i === selectedSkill;
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
            scale={hovered === name || selectedSkill == i ? 1.7 : 1}
          >
            <meshPhysicalMaterial
              color={
                hovered === name || selectedSkill === i ? color : "#C2C1C1"
              }
              metalness={1.3}
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
