import { ArticleDataInfo, Skill } from "../constant/skillData";
import { Line, Text } from "@react-three/drei";
import RectAreaLight from "./lights/RectAreaLight";

type HtmlArticleProps = {
  skillInfo: Skill;
  data: ArticleDataInfo;
};

const ArticleScreen = ({
  skillInfo: { name, lightColor, titleColor },
  data: { title, content },
}: HtmlArticleProps) => {
  return (
    <group position={[0, 10, 3]} rotation={[0.05, 0, 0]}>
      <RectAreaLight
        color={lightColor}
        intensity={12}
        width={30}
        height={40}
        position={[0, 40, 0]}
        rotation={[Math.PI / -2, 0, 0]}
      />

      {name !== "Project" && (
        <Line
          points={[
            [-10, -2.2, 1],
            [10, -2.2, 1],
          ]}
          color={titleColor}
          lineWidth={1}
        />
      )}

      {/* title */}
      <Text
        position={[0, -1.3, 1.3]}
        fontSize={1.5}
        fontWeight={700}
        color={titleColor}
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
