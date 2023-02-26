import React, { useEffect, useRef, useState } from "react";
import "./ImageLabeler.css";
import ICoordinate from "../../@types/ICoordinate";
import IOffsets from "../../@types/IOffsets";
import TLabel from "../../@types/TLabel";
import Label from "./Label";
import { drawCrossHair, drawLabel } from "./Helper";

const ImageLabeler = () => {
  const [labels, setLabels] = useState<TLabel[]>([]);
  const [mousePos, setMousePos] = useState<ICoordinate>({ x: 0, y: 0 });
  const [labelDrawActive, setLabelDrawActive] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const id = useRef<number>(0);
  const offsets = useRef<IOffsets>({ top: 0, left: 0 });
  const boxTopLeftCorner = useRef<ICoordinate | null>(null);

  const width: number = 800;
  const height: number = 800;

  const deleteLabel = () => {
    if (labels.length > 0) {
      labels.pop();
      setLabels([...labels]);
    }
  };

  const addLabel = (boxTopLeftCorner: ICoordinate) => {
    const label: TLabel = {
      component_id: id.current,
      canvas_id: "label_" + id.current,
      offsets: offsets.current,
      boxTopLeftCorner: boxTopLeftCorner,
      canvasWidth: width,
      canvasHeight: height,
    };
    id.current += 1;
    labels.push(label);
  };

  const labelHandler = () => {
    if (boxTopLeftCorner.current === null && labelDrawActive) {
      boxTopLeftCorner.current = {
        x: mousePos.x - offsets.current.left,
        y: mousePos.y - offsets.current.top,
      };
      addLabel(boxTopLeftCorner.current);
    } else if (!labelDrawActive) {
      boxTopLeftCorner.current = null;
    }
  };

  const onMouseDown = () => {
    setLabelDrawActive((prev) => {
      return !prev;
    });
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      offsets.current.top = Math.round(canvas.getBoundingClientRect().top);
      offsets.current.left = Math.round(canvas.getBoundingClientRect().left);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    labelHandler();
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        drawCrossHair(ctx, width, height, mousePos, offsets);
        if (labelDrawActive) {
          if (labels.length > 0) {
            drawLabel(labels[labels.length - 1], mousePos);
          }
        }
      }
    }
  }, [mousePos]);

  return (
    <div id="imageLabeler">
      <button onClick={() => deleteLabel()}></button>
      <div
        onMouseMove={(e) => onMouseMove(e)}
        onMouseDown={() => onMouseDown()}
      >
        <canvas id="canvas" ref={canvasRef} />
        {labels.map((label) => (
          <Label key={label.component_id} {...label}></Label>
        ))}
      </div>
    </div>
  );
};

export default ImageLabeler;
