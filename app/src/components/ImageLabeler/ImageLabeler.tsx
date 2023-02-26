import React, { useEffect, useRef, useState } from "react";
import "./ImageLabeler.css";
import ICoordinate from "../../@types/ICoordinate";
import IOffsets from "../../@types/IOffsets";
import { arrayBuffer } from "stream/consumers";
import ILabel from "../../@types/ILabel";

type TLabel = {
  component_id: number;
  canvas_id: string;
  offsets: IOffsets;
  boxTopLeftCorner: ICoordinate;
  canvasWidth: number;
  canvasHeight: number;
};

const Label = (props: TLabel) => {
  return (
    <div id="canvas">
      <canvas
        id={props.canvas_id}
        height={props.canvasHeight}
        width={props.canvasWidth}
      />
    </div>
  );
};

const ImageLabeler = () => {
  const addLabel = (boxTopLeftCorner: ICoordinate) => {
    const label: TLabel = {
      component_id: id.current,
      canvas_id: "label_" + id.current,
      offsets: offsets.current,
      boxTopLeftCorner: boxTopLeftCorner,
      canvasWidth: width,
      canvasHeight: height,
    };
    console.log(label.component_id);
    id.current += 1;
    console.log(labels.current.length);
    labels.current.push(label);
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

  const drawCrossHair = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    mousePos: ICoordinate
  ) => {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = "#808080";
    ctx.setLineDash([3, 3]);
    ctx.moveTo(0, mousePos.y - offsets.current.top);
    ctx.lineTo(width, mousePos.y - offsets.current.top);
    ctx.moveTo(mousePos.x - offsets.current.left, 0);
    ctx.lineTo(mousePos.x - offsets.current.left, height);
    ctx.stroke();
  };

  // const setCTXCallback = (ctx: CanvasRenderingContext2D, id: number) => {
  //   labels.map((label, idx) => {
  //     console.log(label.component_id + "===" + id);
  //     if (label.component_id === id) {
  //       console.log("EXEC");
  //       const labelsTemp = labels.slice(0);
  //       labelsTemp[idx].canvasRef = ctx;
  //       setLabels(labelsTemp);
  //     }
  //   });
  // };

  function drawLabel(label: TLabel) {
    const canvas: HTMLCanvasElement = document.getElementById(
      label.canvas_id
    ) as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      console.log(label.canvas_id);

      if (ctx) {
        ctx.clearRect(0, 0, label.canvasWidth, label.canvasHeight);
        ctx.beginPath();
        ctx.strokeStyle = "#ff0000";
        ctx.setLineDash([0, 0]);
        ctx.strokeRect(
          label.boxTopLeftCorner.x,
          label.boxTopLeftCorner.y,
          mousePos.x - label.boxTopLeftCorner.x - label.offsets.left,
          mousePos.y - label.boxTopLeftCorner.y - label.offsets.top
        );
        ctx.closePath();
      }
    }
  }

  // const testLabel1: TLabel = {
  //   component_id: 0,
  //   offsets: { top: 0, left: 0 },
  //   boxTopLeftCorner: { x: 0, y: 0 },
  //   canvasRef: null,
  //   canvasHeight: 800,
  //   canvasWidth: 800,
  // };

  const labels = useRef<TLabel[]>([]);
  const [mousePos, setMousePos] = useState<ICoordinate>({ x: 0, y: 0 });
  const [labelDrawActive, setLabelDrawActive] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const id = useRef<number>(0);
  const offsets = useRef<IOffsets>({ top: 0, left: 0 });
  const boxTopLeftCorner = useRef<ICoordinate | null>(null);

  const width: number = 800;
  const height: number = 800;

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
        drawCrossHair(ctx, width, height, mousePos);
        if (labelDrawActive) {
          if (labels.current.length > 0) {
            drawLabel(labels.current[labels.current.length - 1]);
          }
        }
      }
    }
  }, [mousePos]);

  return (
    <div
      id="imageLabeler"
      onMouseMove={(e) => onMouseMove(e)}
      onMouseDown={() => onMouseDown()}
    >
      <canvas id="canvas" ref={canvasRef} />
      {labels.current.map((label) => (
        <Label key={label.component_id} {...label}></Label>
      ))}
    </div>
  );
};

export default ImageLabeler;
