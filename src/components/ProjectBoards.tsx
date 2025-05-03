import { Dispatch, SetStateAction, useState } from "react";
import ThickPlane from "./planes/ThickPlane";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";
import { projectArticleList } from "../constant/projectData";
import RectAreaLight from "./lights/RectAreaLight";
import Plane from "./planes/Plane";

type ProjectBoxProps = {
  // position: [x: number, y: number, z: number];
  // selectedSkill: number | null;
  // setSelectedSkill: Dispatch<SetStateAction<number | null>>;
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

const ProjectBox = ({
  // position,
  cameraPosition,
  setCameraPosition,
}: // selectedSkill,
// setSelectedSkill,
ProjectBoxProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  function handleClickProject(index: number) {
    const { position, side } = projectArticleList[index];
    const z = position.z;
    const x = side === "right" ? { p: 15, l: 20 } : { p: -15, l: -20 };
    const y = position.y + 1;

    setSelected((pre) => {
      if (cameraPosition && pre === index) {
        setCameraPosition({
          targetPosition: new THREE.Vector3(0, 20, 98),
          lookAt: new THREE.Vector3(0, 10, 0),
        });
      } else {
        setCameraPosition({
          targetPosition: new THREE.Vector3(x.p, y, z),
          lookAt: new THREE.Vector3(x.l, y, z),
        });
      }
      return pre === index ? null : index;
    });
  }

  return (
    <>
      {projectArticleList.map(
        (
          {
            title,
            subtitle,
            article,
            position,
            tagPosition,
            tagSize,
            side,
            size,
          },
          index
        ) => {
          const { width, height } = size;
          const xPosition = side === "right" ? -0.6 : 0.6;
          const yRotate = side === "right" ? -Math.PI / 2 : Math.PI / 2;
          const isSelected = selected === index;

          return (
            <group
              position={position}
              onClick={(e) => {
                e.stopPropagation();
                handleClickProject(index);
              }}
            >
              {/* board */}
              <ThickPlane
                {...size}
                rotate={[0, -Math.PI / 2, 0]}
                position={[0, 0, 0]}
                color="#7e4c28"
              />

              {/* tag */}
              <group
                position={
                  selected !== null
                    ? [xPosition, height / 2 + 3, 0]
                    : tagPosition
                }
                rotation={selected !== null ? [0, yRotate, 0] : [0, 0, 0]}
              >
                <Text
                  color="#031d5e"
                  anchorX="center"
                  anchorY="middle"
                  position={[0, 0, 0.1]}
                  fontWeight={500}
                  fontStyle="italic"
                >
                  {title}
                </Text>

                <Plane
                  position={[0, 0, 0]}
                  width={tagSize[0]}
                  height={tagSize[1]}
                  color="#e6e2e2"
                  emissive="#f7e9d1"
                  emissiveIntensity={0.5}
                />
              </group>
              {selected === null && (
                <Line points={[[0, 0, 0], tagPosition]} color="#e6e2e2" />
              )}

              <RectAreaLight
                color={isSelected ? "#ffd271" : "#f3b808"}
                intensity={isSelected ? 1.5 : 0.8}
                width={30}
                height={isSelected ? tagSize[0] : width - 0.5}
                position={[-1, isSelected ? height / 2 + 4 : height / 2, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              />

              {/* subtitle */}
              {/* mt:1 */}
              <Text
                position={[xPosition, height / 2 - 1, 0]}
                rotation={[0, yRotate, 0]}
                color="#bdf750"
                fontSize={0.7}
              >
                {subtitle}
              </Text>

              {/* article */}
              {/* gap:1 mt:2.5 */}
              {article.map((sentence, i) => (
                <Text
                  position={[
                    xPosition,
                    height / 2 - 2.5 - i,
                    side === "right" ? -width / 2 + 2 : width / 2 - 1,
                  ]}
                  rotation={[0, yRotate, 0]}
                  color="#bde7fd"
                  fontSize={0.5}
                  anchorX="left"
                >
                  {sentence}
                </Text>
              ))}
            </group>
          );
        }
      )}
    </>
  );
};

export default ProjectBox;
