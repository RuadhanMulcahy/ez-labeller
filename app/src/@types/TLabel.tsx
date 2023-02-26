import ICoordinate from "./ICoordinate";
import IOffsets from "./IOffsets";

type TLabel = {
  component_id: number;
  canvas_id: string;
  offsets: IOffsets;
  boxTopLeftCorner: ICoordinate;
  canvasWidth: number;
  canvasHeight: number;
};

export default TLabel;
