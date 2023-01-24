import React, { useCallback, useEffect, useRef, useState } from "react";
import Coordinate from "../types/Coordinate";

function ImageLabeler() {
  const boxTopLeftCorner = useRef<Coordinate | null>(null);
  const [mousePosition, setMousePosition] = useState<Coordinate>({
    x: 0,
    y: 0,
  });
  const [midDraw, setMidDraw] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawDottedLine = useCallback(() => {}, []);

  const onClick = useCallback(() => {
    setMidDraw((midDraw) => !midDraw);
  }, []);

  const onMouseMove = useCallback((mouse: MouseEvent) => {
    if (boxTopLeftCorner.current === null) {
      boxTopLeftCorner.current = { x: mouse.x, y: mouse.y };
      console.log(mouse.x + " " + mouse.y);
    }
    setMousePosition({ x: mouse.x, y: mouse.y });
  }, []);

  useEffect(() => {
    window.addEventListener("click", onClick);

    if (midDraw === true) {
      window.addEventListener("mousemove", onMouseMove);
    } else {
      boxTopLeftCorner.current = null;
      window.removeEventListener("mousemove", onMouseMove);
    }

    return function cleanUp() {
      window.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [midDraw]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && boxTopLeftCorner.current) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "red";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(
          boxTopLeftCorner.current.x,
          boxTopLeftCorner.current.y,
          mousePosition.x - boxTopLeftCorner.current.x,
          mousePosition.y - boxTopLeftCorner.current.y
        );
      }
    }
  }, [mousePosition]);

  return <canvas id="canvas" ref={canvasRef} width={400} height={400} />;
}

export default ImageLabeler;
