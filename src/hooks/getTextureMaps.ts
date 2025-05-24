import { useTexture } from "@react-three/drei";

export function useGenerateRoughTextureMaps(texture?: string) {
  try {
    const [colorMap, normalMap, roughnessMap] = useTexture(
      texture
        ? [
            `${import.meta.env.BASE_URL}/texture/${texture}/color.jpg`,
            `${import.meta.env.BASE_URL}/texture/${texture}/normalGL.jpg`,
            `${import.meta.env.BASE_URL}/texture/${texture}/roughness.jpg`,
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
  } catch {
    return {};
  }
}

export function useGenerateIconTextureMaps(icon?: string) {
  try {
    const [colorMap, normalMap, displacementMap] = useTexture(
      icon
        ? [
            `${import.meta.env.BASE_URL}/texture/${icon}/color.png`,
            `${import.meta.env.BASE_URL}/texture/${icon}/normalGL.png`,
            `${import.meta.env.BASE_URL}/texture/${icon}/displacement.png`,
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

    return { textureMaps };
  } catch {
    return {};
  }
}
