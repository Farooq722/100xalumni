// import { cn } from "@/lib/utils";
// import React, { useEffect, useRef, useState } from "react";
// import { createNoise3D } from "simplex-noise";

// export const WavyBackground = ({
//   children,
//   className,
//   containerClassName,
//   colors,
//   waveWidth,
//   backgroundFill,
//   blur = 10,
//   speed = "fast",
//   waveOpacity = 0.5,
//   ...props
// }) => {
//   const noise = createNoise3D();
//   let w,
//     h,
//     nt,
//     i,
//     x,
//     ctx,
//     canvas;
//   const canvasRef = useRef(null);
//   const getSpeed = () => {
//     switch (speed) {
//       case "slow":
//         return 0.001;
//       case "fast":
//         return 0.002;
//       default:
//         return 0.001;
//     }
//   };

//   const init = () => {
//     canvas = canvasRef.current;
//     ctx = canvas.getContext("2d");
//     w = ctx.canvas.width = window.innerWidth;
//     h = ctx.canvas.height = window.innerHeight;
//     ctx.filter = `blur(${blur}px)`;
//     nt = 0;
//     window.onresize = function () {
//       w = ctx.canvas.width = window.innerWidth;
//       h = ctx.canvas.height = window.innerHeight;
//       ctx.filter = `blur(${blur}px)`;
//     };
//     render();
//   };

//   const waveColors = colors ?? [
//     "#38bdf8",
//     "#818cf8",
//     "#c084fc",
//     "#e879f9",
//     "#22d3ee",
//   ];
//   const drawWave = (n) => {
//     nt += getSpeed();
//     for (i = 0; i < n; i++) {
//       ctx.beginPath();
//       ctx.lineWidth = waveWidth || 50;
//       ctx.strokeStyle = waveColors[i % waveColors.length];
//       for (x = 0; x < w; x += 5) {
//         var y = noise(x / 800, 0.3 * i, nt) * 100;
//         ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
//       }
//       ctx.stroke();
//       ctx.closePath();
//     }
//   };

//   let animationId;
//   const render = () => {
//     ctx.fillStyle = backgroundFill || "black";
//     ctx.globalAlpha = waveOpacity || 0.5;
//     ctx.fillRect(0, 0, w, h);
//     drawWave(5);
//     animationId = requestAnimationFrame(render);
//   };

//   useEffect(() => {
//     init();
//     return () => {
//       cancelAnimationFrame(animationId);
//     };
//   }, []);

//   const [isSafari, setIsSafari] = useState(false);
//   useEffect(() => {
//     // I'm sorry but i have got to support it on safari.
//     setIsSafari(typeof window !== "undefined" &&
//       navigator.userAgent.includes("Safari") &&
//       !navigator.userAgent.includes("Chrome"));
//   }, []);

//   return (
//     (<div
//       className={cn("h-screen flex flex-col items-center justify-center", containerClassName)}>
//       <canvas
//         className="absolute inset-0 z-0"
//         ref={canvasRef}
//         id="canvas"
//         style={{
//           ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
//         }}></canvas>
//       <div className={cn("relative z-10", className)} {...props}>
//         {children}
//       </div>
//     </div>)
//   );
// };

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 50,
  backgroundFill = "black",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;

    let nt = 0;

    const drawWave = (n) => {
      nt += getSpeed();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = waveColors[i % waveColors.length];

        for (let x = 0; x < canvas.width; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + canvas.height * 0.5);
        }

        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      drawWave(5);
      animationIdRef.current = requestAnimationFrame(render);
    };

    render();
  };

  useEffect(() => {
    initCanvas();

    const handleResize = () => initCanvas();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div className={cn("fixed inset-0 flex items-center justify-center overflow-hidden", containerClassName)}>
      <canvas
        className="fixed inset-0 w-full h-full"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
