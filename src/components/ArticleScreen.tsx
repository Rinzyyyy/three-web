import { ArticleDataInfo, Skill } from "../constant/skillData";
import { Line, Text } from "@react-three/drei";
import Plane from "./planes/Plane";
import RectAreaLight from "./lights/RectAreaLight";

type HtmlArticleProps = {
  skillInfo: Skill;
  data: ArticleDataInfo;
};

const ArticleScreen = ({
  skillInfo: { name, lightColor },
  data: { title, content },
}: HtmlArticleProps) => {
  return (
    <group position={[0, 10, 1]} rotation={[0.05, 0, 0]}>
      <RectAreaLight
        color={lightColor}
        intensity={10}
        width={23}
        height={35}
        position={[0, 10, 0]}
        rotation={[Math.PI / -2, 0, 0]}
      />

      {name !== "Project" && (
        <>
          <Plane
            rotate={[0.06, 0, 0]}
            position={[0, -16, 0]}
            height={35}
            width={23}
            opacity={0.4}
            color={name === "Back-End" ? "#f9eff9" : "#a1eefd"}
            transparent
          />
          <Line
            points={[
              [-10, -2.2, 1],
              [10, -2.2, 1],
            ]}
            color={name === "Back-End" ? "yellow" : "#c00303"}
            lineWidth={1}
          />
        </>
      )}

      {/* title */}
      <Text
        position={[0, -1.3, 1.3]}
        fontSize={1.5}
        fontWeight={700}
        color={name === "Back-End" ? "yellow" : "#c00303"}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      {content.map(({ subtitle, content, contentTwo, mt }, index) => {
        const gap = 2.6 + (mt ?? 0);
        return (
          <>
            <Text
              position={[0, -3.3 - index * gap, 1.1]}
              fontSize={0.6}
              fontWeight={name === "Back-End" ? 700 : 200}
              color="#222"
              anchorX="center"
              anchorY="middle"
            >
              {subtitle}
            </Text>

            <Text
              position={[0, -4.2 - index * gap, 1]}
              fontSize={0.5}
              fontWeight={name === "Back-End" ? 300 : 700}
              color="#222"
              anchorX="center"
              anchorY="middle"
            >
              {content}
            </Text>

            <Text
              position={[0, -5 - index * gap, 1]}
              fontSize={0.5}
              fontWeight={name === "Back-End" ? 300 : 700}
              color="#222"
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
