import { Text } from "@react-three/drei";

export default function CurvedText({
  text = "Curved Text",
  radius = 1,
  fontSize = 0.3,
  color = "white",
}) {
  const chars = text.split("");
  const angleStep = (Math.PI / chars.length) * 0.5;

  return (
    <group>
      {chars.map((char, i) => {
        const angle = -Math.PI / 2 + (i + 5) * angleStep;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <Text
            key={i}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
            fontSize={fontSize}
            fontWeight={700}
            anchorX="center"
            anchorY="middle"
            color={color}
          >
            {char}
          </Text>
        );
      })}
    </group>
  );
}
