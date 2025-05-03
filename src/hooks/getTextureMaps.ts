import { useTexture } from "@react-three/drei";

export function useGenerateTextureMaps(texture?: string) {
  try {
    const [colorMap, displacementMap, normalMap, roughnessMap] = useTexture(
      texture
        ? [
            `/texture/${texture}/color.jpg`,
            `/texture/${texture}/displacement.jpg`,
            `/texture/${texture}/normalGL.jpg`,
            `/texture/${texture}/roughness.jpg`,
          ]
        : []
    );

    // colorMap.encoding = THREE.sRGBEncoding;

    const textureMaps = texture
      ? {
          map: colorMap,
          normalMap: normalMap,
          roughnessMap: roughnessMap,
          displacementMap: displacementMap,
        }
      : {};

    return { textureMaps };
  } catch {
    return {};
  }
}
