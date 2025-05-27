import { DoubleSide, Texture, Vector3 } from "three";
import { useGenerateRoughTextureMaps } from "../../hooks/getTextureMaps";
import RectAreaLight from "../lights/RectAreaLight";
import { a, SpringValue } from "@react-spring/three";

type PlaneHelperProps = {
  rotate?: [x: number, y: number, z: number];
  position?: Vector3 | [x: number, y: number, z: number];
  width?: number;
  height?: number;
  color?: string;
  transparent?: boolean;
  opacity?: number;
  metalness?: number;
  emissive?: string | SpringValue<string>;
  emissiveIntensity?: number;
  texture?: string;
  light?: boolean;
  mapColor?: Texture;
};

const Plane = ({
  rotate,
  position = [0, 0, 0],
  width = 10,
  height = 90,
  color,
  transparent,
  opacity,
  emissive,
  emissiveIntensity,
  texture,
  light,
  mapColor,
}: PlaneHelperProps) => {
  const { textureMaps } = useGenerateRoughTextureMaps(texture);
  const textureProps = mapColor ? { map: mapColor } : textureMaps;
  return (
    <mesh rotation={rotate} position={position} receiveShadow>
      {light && (
        <RectAreaLight
          color={"#d9d3bf"}
          intensity={6}
          width={width}
          height={height}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        />
      )}
      <planeGeometry args={[width, height]} />
      <a.meshStandardMaterial
        color={color}
        side={DoubleSide}
        transparent={transparent}
        opacity={opacity}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        {...textureProps}
      />
    </mesh>
  );
};

export default Plane;
