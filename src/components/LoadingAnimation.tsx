import { useEffect, useRef } from "react";
import gsap from "gsap";

type LoadingScreenProps = {
  isInSuspense?: boolean;
  isFinished?: boolean;
  onFinish?: () => void;
};

export default function LoadingAnimation({
  isInSuspense,
  isFinished,
  onFinish,
}: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (isInSuspense) {
      gsap.to(containerRef.current, {
        height: "80px",
        duration: 0.6,
        ease: "power2.out",
      });
    }

    if (!tlRef.current) {
      tlRef.current = gsap.timeline({
        repeat: isInSuspense ? -1 : 0,
      });
      tlRef.current.to(imageRef.current, {
        filter: "blur(4px)",
        opacity: 0.3,
        duration: 0.5,
        x: 8,
        repeat: 1,
        yoyo: true,
      });

      tlRef.current.to(imageRef.current, {
        filter: "blur(1px)",
        opacity: 0.3,
        duration: 0.8,
        x: -5,
        y: -2,
        repeat: 1,
        yoyo: true,
      });
    }

    if (tlRef.current && !isInSuspense && onFinish) {
      tlRef.current
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
        })
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
  }, [isInSuspense, onFinish]);

  useEffect(() => {
    if (tlRef.current && isFinished && isInSuspense) {
      tlRef.current.kill();
      tlRef.current = null;
    }
  }, [isFinished, isInSuspense]);

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
          height: isInSuspense ? "0px" : "80px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          ref={imageRef}
          src={`${import.meta.env.BASE_URL}/images/loading.jpg`}
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
