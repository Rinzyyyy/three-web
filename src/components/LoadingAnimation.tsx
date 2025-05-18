import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";

type LoadingScreenProps = {
  isInSuspense?: boolean;
  onFinish?: () => void;
};

export default function LoadingAnimation({
  isInSuspense,
  onFinish = () => {},
}: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const { progress, active } = useProgress();
  const isFinished = progress === 100 && !active;

  useEffect(() => {
    tlRef.current = gsap.timeline({ repeat: isInSuspense ? -1 : 0 });

    tlRef.current.to(imageRef.current, {
      filter: "blur(4px)",
      opacity: 0.3,
      duration: 0.5,
      x: 8,
      repeat: 1,
      yoyo: true,
    });
    tlRef.current
      .to(imageRef.current, {
        filter: "blur(1px)",
        opacity: 0.3,
        duration: 0.8,
        x: -5,
        y: -2,
        repeat: 1,
        yoyo: true,
      })
      .to(textRef.current, {
        opacity: 0,
      })
      .to(containerRef.current, {
        backgroundImage:
          "radial-gradient( #ffffff 0%, #fff7cccc 20%, #000000 70%, #000000 100%)",
      })
      .to(
        imageRef.current,
        {
          filter: "blur(1px)",
          opacity: 0.2,
          duration: 0.2,
          y: 3,
          repeat: 1,
          yoyo: true,
        },
        "<"
      )
      .to(imageRef.current, {
        opacity: 0.1,
        scale: 1.01,
        filter: "blur(1)",
        x: 0,
        duration: 0.3,
      });

    if (tlRef.current && isFinished && isInSuspense) {
      tlRef.current.kill();
      tlRef.current.current = null;
    }

    if (tlRef.current && !isInSuspense) {
      tlRef.current
        .to(containerRef.current, {
          height: "0px",
          duration: 0.1,
        })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.1,
        });

      onFinish();
    }
  }, [active, isFinished, isInSuspense, onFinish, progress]);

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
          width: "100%",
          height: "80px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          ref={imageRef}
          src="/images/loading.png"
          alt="loading"
          style={{ opacity: 0.5 }}
        />
        <p
          ref={textRef}
          style={{
            position: "absolute",
            color: "#860404",
            letterSpacing: 2,
            fontSize: "20px",
            fontWeight: 500,
          }}
        >
          Loading ...
        </p>
      </div>
    </div>
  );
}
