import { ArticleDataInfo, Skill } from "../constant/skillData";
import { Line, Text, useTexture } from "@react-three/drei";
import RectAreaLight from "./lights/RectAreaLight";
import Plane from "./planes/Plane";

type HtmlArticleProps = {
  skillInfo?: Skill;
  data?: ArticleDataInfo;
};

const ArticleScreen = ({ skillInfo, data }: HtmlArticleProps) => {
  const [mapColor] = useTexture([`${import.meta.env.BASE_URL}/texture/screen/color.png`]);

  const { name, lightColor, titleColor } = skillInfo || {};
  const { title, content } = data || {};

  return (
    <group
      position={[0, 0, 0.5]}
      rotation={[0.05, 0, 0]}
      visible={!!skillInfo && !!data}
    >
      <RectAreaLight
        color={lightColor}
        intensity={25}
        width={50}
        height={40}
        position={[0, 60, 0]}
        rotation={[Math.PI / -2, 0, 0]}
      />
      {name !== "Project" && (
        <group>
          <Plane width={30} transparent opacity={0.9} mapColor={mapColor} />
          <Line
            points={[
              [-10, -2.2, 1],
              [10, -2.2, 1],
            ]}
            color={titleColor}
            lineWidth={1}
          />
        </group>
      )}
      {/* title */}
      <Text
        position={[0, -1, 1]}
        fontSize={1.5}
        fontWeight={700}
        color={titleColor}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
      {content?.map(({ subtitle, content, contentTwo, mt }, index) => {
        const gap = 4 + (mt ?? 0);
        return (
          <>
            <Text
              position={[0, -4 - index * gap, 1]}
              fontSize={0.8}
              fontWeight={name === "Back-End" ? 700 : 400}
              color="#89fcc4"
              anchorX="center"
              anchorY="middle"
            >
              {subtitle}
            </Text>

            <Text
              position={[0, -5.3 - index * gap, 1]}
              fontSize={0.8}
              fontWeight={name === "Back-End" ? 300 : 700}
              color="#fff"
              anchorX="center"
              anchorY="middle"
            >
              {content}
            </Text>

            <Text
              position={[0, -6.6 - index * gap, 1]}
              fontSize={0.8}
              fontWeight={name === "Back-End" ? 300 : 700}
              color="#fff"
              anchorX="center"
              anchorY="middle"
            >
              {contentTwo}
            </Text>
          </>
        );
      })}
    </group>
  );
};

export default ArticleScreen;
