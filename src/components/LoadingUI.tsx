import { RefObject } from "react";

type LoadingUProps = {
  overlayRef?: RefObject<HTMLDivElement | null>;
  containerRef?: RefObject<HTMLDivElement | null>;
  imageRef?: RefObject<HTMLImageElement | null>;
};

const LoadingUI = ({ overlayRef, containerRef, imageRef }: LoadingUProps) => {
  return (
    <div
      ref={overlayRef}
      style={{
        width: "100%",
        height: "100%",
        background: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "opacity 1s",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "600px",
          height: "300px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img ref={imageRef} src="/images/loading.png" alt="loading" />
      </div>
    </div>
  );
};

export default LoadingUI;
