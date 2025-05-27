import { Dispatch, SetStateAction, useState, useTransition } from "react";
import ThickPlane from "./planes/ThickPlane";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";
import { projectArticleList } from "../constant/projectData";
import RectAreaLight from "./lights/RectAreaLight";
import Plane from "./planes/Plane";
import IconBar from "./IconBar";
import { a, useSprings, config } from "@react-spring/three";

type ProjectBoxProps = {
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

const ProjectBoard = ({
  cameraPosition,
  setCameraPosition,
}: ProjectBoxProps) => {

  const [, startTransition] = useTransition();
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  function handleClickProject(index: number) {
    const { position, side } = projectArticleList[index];
    const z = position.z;
    const x = side === "right" ? { p: 15, l: 20 } : { p: -15, l: -20 };
    const y = position.y + 1;

    setSelected((pre) => {
      if (cameraPosition && pre === index) {
        setCameraPosition({
          targetPosition: new THREE.Vector3(0, 23, 103),
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

  const boardSprings = useSprings(
    projectArticleList.length,
    projectArticleList.map(({ id, side, tagPosition, size: { height } }) => {
      const isHovered = hovered === id;
      const textXPosition = side === "right" ? -0.6 : 0.6;
      const yRotate = side === "right" ? -Math.PI / 2 : Math.PI / 2;
      return {
        tagPosition:
          selected !== null ? [textXPosition, height / 2 + 3, 0] : tagPosition,
        tagRotation: selected !== null ? [0, yRotate, 0] : [0, 0, 0],
        tagColor: selected === null && isHovered ? "#fff" : "#dc9f50",
        config: config.slow,
      };
    })
  );

  return (
    <>
      {projectArticleList.map(
        (
          {
            id,
            title,
            subtitle,
            article,
            position,
            tagPosition,
            tagSize,
            iconBarSize,
            side,
            size,
          },
          index
        ) => {
          const { width, height } = size;
          const textXPosition = side === "right" ? -0.6 : 0.6;
          const iconXPosition = side === "right" ? 1.3 : -1.3;
          const yRotate = side === "right" ? -Math.PI / 2 : Math.PI / 2;

          return (
            <group
              key={`project_board_${index}`}
              position={position}
              onPointerOver={() => {
                document.body.style.cursor = "pointer";
                startTransition(() => setHovered(id));
              }}
              onPointerOut={() => {
                document.body.style.cursor = "default";
                startTransition(() => setHovered(null));
              }}
              onClick={(e) => {
                e.stopPropagation();
                startTransition(() => handleClickProject(index));
              }}
            >
              <IconBar
                width={iconBarSize}
                height={1.5}
                rotate={[0, yRotate, 0]}
                texture={id}
                position={[iconXPosition, size.height / 2 + 1, 0]}
              />

              {/* board */}
              <ThickPlane
                {...size}
                rotate={[0, -Math.PI / 2, 0]}
                position={[0, 0, 0]}
                color="#421803"
              />

              {/* tag */}
              <a.group
                position={
                  boardSprings[index].tagPosition as unknown as [
                    number,
                    number,
                    number
                  ]
                }
                rotation={
                  boardSprings[index].tagRotation as unknown as [
                    number,
                    number,
                    number
                  ]
                }
              >
                <Text
                  color="#031d5e"
                  anchorX="center"
                  anchorY="middle"
                  position={[0, 0, 0.1]}
                  fontWeight={800}
                  fontStyle="italic"
                >
                  {title}
                </Text>

                <Plane
                  position={[0, 0, 0]}
                  width={tagSize[0]}
                  height={tagSize[1]}
                  color="#a1a09f"
                  emissive={boardSprings[index].tagColor}
                />
              </a.group>

              <Line
                points={[[0, 0, 0], tagPosition]}
                color="#f6c191"
                visible={selected === null}
              />

              <RectAreaLight
                color={"#d3f55a"}
                intensity={2}
                width={30}
                height={tagSize[0]}
                position={[-1, height / 2 + 4, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                visible={selected !== null}
              />

              {/* subtitle */}
              {/* mt:1 */}
              <Text
                position={[textXPosition, height / 2 - 1, 0]}
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
                  key={`project_sentence_${i}`}
                  position={[
                    textXPosition,
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

export default ProjectBoard;
