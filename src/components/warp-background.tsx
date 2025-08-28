import { Warp, type WarpProps } from "@paper-design/shaders-react";
import { useEffect, useRef } from "react";

function StarLayer({ starCount = 200 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.5,
      alpha: Math.random(),
      flicker: Math.random() * 0.02 + 0.01,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.alpha += s.flicker * (Math.random() > 0.5 ? 1 : -1);
        if (s.alpha < 0.2) s.alpha = 0.2;
        if (s.alpha > 1) s.alpha = 1;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
}

export default function WarpBackground(props: WarpProps) {
  const defaultProps = {
    color1: "#09090b",
    color2: "#27272a",
    color3: "#52525b",
    speed: 0.4,
    rotation: 0.5,
    style: { width: "100%", height: "100%", position: "absolute" },
  };

  return (
    <div className="relative w-full h-full">
      <Warp
        {...defaultProps}
        {...props}
        style={{ ...defaultProps.style, ...props.style }}
      />
      <StarLayer starCount={250} />
    </div>
  );
}
