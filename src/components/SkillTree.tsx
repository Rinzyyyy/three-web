import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Line, CubeCamera } from "@react-three/drei";
import * as THREE from "three";
import Brain from "./Brain";
import { skills } from "../constant/skillData";
import CurvedText from "./CurveText";
import { useTransition } from "react";
import SpotLight from "./lights/SpotLight ";

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
  const groupRef = useRef<THREE.Group>(null!);
  const nodeRefs = useRef<THREE.Group[]>([]);

  const [, startTransition] = useTransition();
  const [hovered, setHovered] = useState<string | null>(null);

  function handelClickBrain() {
    setSelectedSkill(null);
    setCameraPosition(null);
  }

  function handleClickSkill(index: number) {
    setSelectedSkill((pre) => {
      // click twice  to set back to initial position
      if (pre === index) {
        setCameraPosition({
          targetPosition: new THREE.Vector3(0, 15, 15),
          lookAt: new THREE.Vector3(0, 12, 0),
        });
      } else if (index === 0) {
        // when click project node
        setCameraPosition({
          targetPosition: new THREE.Vector3(0, 20, 98),
          lookAt: new THREE.Vector3(0, 10, 0),
        });
      } else {
        // click to take a look on th screen
        setCameraPosition({
          targetPosition: new THREE.Vector3(0, 9, 20),
          lookAt: new THREE.Vector3(0, 11, 0),
        });
      }

      // click twice to inactive skill and once for selecting
      return pre === index ? null : index;
    });
  }

  useFrame(() => {
    if (groupRef.current) {
      if (selectedSkill === null) {
        groupRef.current.position.y = THREE.MathUtils.lerp(
          groupRef.current.position.y,
          10,
          0.1
        );
        groupRef.current.position.z = THREE.MathUtils.lerp(
          groupRef.current.position.z,
          0,
          0.1
        );
      } //select project
      else if (selectedSkill === 0) {
        groupRef.current.position.z = THREE.MathUtils.lerp(
          groupRef.current.position.z,
          25,
          0.1
        );
        groupRef.current.position.y = THREE.MathUtils.lerp(
          groupRef.current.position.y,
          20,
          0.1
        );
      } //select frontend or backend
      else {
        groupRef.current.position.y = THREE.MathUtils.lerp(
          groupRef.current.position.y,
          3,
          0.1
        );
        groupRef.current.position.z = THREE.MathUtils.lerp(
          groupRef.current.position.z,
          9,
          0.1
        );
      }

      // when click, rotate to focus on
      const rotationY = selectedSkill ? skills[selectedSkill].rotation : 0;

      //rotate brain
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotationY,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -0.2,
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

  const centerPosition = new THREE.Vector3(0, selectedSkill ? -2 : -3, 0);

  return (
    <>
      <group ref={groupRef} position={position} castShadow>
        <SpotLight
          target={groupRef.current}
          position={[0, 10, 2]}
          intensity={500}
          distance={30}
          angle={6}
        />

        {Array.from({ length: skills.length }).map((_, i) => (
          <Line
            key={`line_${i}`}
            points={[centerPosition, skills[i].sPosition]}
            color="#666"
            lineWidth={1}
            vertexColors={[new THREE.Color("#FF0000"), new THREE.Color("#fff")]}
          />
        ))}

        <Brain
          scale={selectedSkill ? 3 : 5}
          position={centerPosition}
          onClick={handelClickBrain}
          onPointerOver={() => {
            const cursor = cameraPosition ? "pointer" : "default";
            document.body.style.cursor = cursor;
          }}
          onPointerOut={() => (document.body.style.cursor = "default")}
        />

        <Line
          points={[centerPosition, 0, -20, -3]}
          lineWidth={2}
          vertexColors={[
            new THREE.Color("#7e1919"),
            new THREE.Color("#353434"),
          ]}
        />

        {skills.map(({ name, sPosition, ballColor }, i) => {
          const isSelected = selectedSkill === i;
          const isHovered = hovered === name;
          return (
            <group
              position={sPosition}
              key={`skill_${i}`}
              ref={(el) => {
                if (el) nodeRefs.current[i] = el;
              }}
            >
              (
              <CubeCamera resolution={256} frames={1}>
                {(texture) => (
                  <Sphere
                    args={[1, 35, 35]}
                    onPointerOver={() => {
                      startTransition(() => setHovered(name));
                    }}
                    onPointerOut={() => {
                      startTransition(() => setHovered(null));
                    }}
                    onClick={() => handleClickSkill(i)}
                  >
                    <meshPhysicalMaterial
                      envMap={texture}
                      color={isHovered || isSelected ? "#fff" : "#C2C1C1"}
                      metalness={1}
                      roughness={0.2}
                      opacity={1}
                      emissive={isHovered || isSelected ? ballColor : "#585757"}
                      emissiveIntensity={0.7}
                    />
                  </Sphere>
                )}
              </CubeCamera>
              )
              <CurvedText
                text={name}
                color={isHovered || isSelected ? "#a90909" : "white"}
              />
            </group>
          );
        })}
      </group>
    </>
  );
}
