import React, { ReactNode } from "react";
import { StyledImageRow } from "./ImageRow.styles";

const ImageRow = ({ children }: { children: ReactNode }) => {
  return <StyledImageRow>{children}</StyledImageRow>;
};

export default ImageRow;
