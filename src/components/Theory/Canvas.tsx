import React from "react";
import { StyledCanvas } from "./Canvas.styles";
import { useTheme } from "Utils";

const Canvas = ({
  reference,
}: {
  reference: React.RefObject<HTMLCanvasElement>;
}) => {
  const theme = useTheme();

  // TODO: add proper theme
  const bg = "#f9f9f9";

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
      <StyledCanvas ref={reference} bg={bg} roundness={theme.roundness} />
    </div>
  );
};

export default Canvas;
