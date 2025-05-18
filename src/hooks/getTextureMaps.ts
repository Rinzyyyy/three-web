import { useTexture } from "@react-three/drei";

export function useGenerateRoughTextureMaps(texture?: string) {
  try {
    const [colorMap, normalMap, roughnessMap] = useTexture(
      texture
        ? [
            `/texture/${texture}/color.jpg`,
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
        }
      : {};

    return { textureMaps };
  } catch (e) {
    console.warn("===e", e);
    return {};
  }
}

export function useGenerateIconTextureMaps(icon?: string) {
  try {
    const [colorMap, normalMap, displacementMap] = useTexture(
      icon
        ? [
            `/texture/${icon}/color.png`,
            `/texture/${icon}/normalGL.png`,
            `/texture/${icon}/displacement.png`,
          ]
        : []
    );

    const textureMaps = icon
      ? {
          map: colorMap,
          normalMap: normalMap,
          displacementMap: displacementMap,
        }
      : {};

    console.log("==ic", icon, textureMaps);

    return { textureMaps };
  } catch (e) {
    console.warn("===e", e);
    return {};
  }
}
