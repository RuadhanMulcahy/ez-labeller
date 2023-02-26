import React from "react";
import ICoordinate from "../../@types/ICoordinate";
import IOffsets from "../../@types/IOffsets";
import TLabel from "../../@types/TLabel";

const drawCrossHair = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  mousePos: ICoordinate,
  offsets: React.MutableRefObject<IOffsets>
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

function drawLabel(label: TLabel, mousePos: ICoordinate) {
  const canvas: HTMLCanvasElement = document.getElementById(
    label.canvas_id
  ) as HTMLCanvasElement;
  if (canvas) {
    const ctx = canvas.getContext("2d");

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

export { drawCrossHair, drawLabel };
