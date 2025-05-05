import { useTexture } from "@react-three/drei";

export function useGenerateTextureMaps(texture?: string, type?: "jpg" | "png") {
  try {
    const [colorMap, normalMap, roughnessMap] = useTexture(
      texture
        ? [
            `/texture/${texture}/color.${type || "jpg"}`,
            `/texture/${texture}/normalGL.${type || "jpg"}`,
            `/texture/${texture}/roughness.${type || "jpg"}`,
          ]
        : []
    );

    // colorMap.encoding = THREE.sRGBEncoding;

    const textureMaps = texture
      ? {
          map: colorMap,
          normalMap: normalMap,
          roughnessMap: roughnessMap,
        }
      : {};

    return { textureMaps };
  } catch (e) {
    console.log("===e", e);
    return {};
  }
}
