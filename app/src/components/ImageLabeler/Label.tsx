import TLabel from "../../@types/TLabel";

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

export default Label;
