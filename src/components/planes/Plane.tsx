import { DoubleSide, Texture, Vector3 } from "three";
import { useGenerateTextureMaps } from "../../hooks/getTextureMaps";
import RectAreaLight from "../lights/RectAreaLight";

type PlaneHelperProps = {
  rotate?: [x: number, y: number, z: number];
  position?: Vector3 | [x: number, y: number, z: number];
  width?: number;
  height?: number;
  color?: string;
  transparent?: boolean;
  opacity?: number;
  metalness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  texture?: string;
  textureType?: "jpg" | "png";
  light?: boolean;
  mapColor?: Texture;
};

const Plane = ({
  rotate,
  position = [0, 0, 0],
  width = 10,
  height = 90,
  color = "#fff",
  transparent,
  opacity,
  metalness,
  emissive,
  emissiveIntensity,
  texture,
  textureType = "jpg",
  light,
  mapColor,
}: PlaneHelperProps) => {
  const { textureMaps } = useGenerateTextureMaps(texture, textureType);
  const texturePops = mapColor ? { map: mapColor } : textureMaps;
  return (
    <mesh rotation={rotate} position={position} receiveShadow>
      {light && (
        <RectAreaLight
          color={"#d9d3bf"}
          intensity={3}
          width={width}
          height={height}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        />
      )}
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        color={color}
        side={DoubleSide}
        transparent={transparent}
        opacity={opacity}
        metalness={metalness}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        {...texturePops}
      />
    </mesh>
  );
};

export default Plane;
