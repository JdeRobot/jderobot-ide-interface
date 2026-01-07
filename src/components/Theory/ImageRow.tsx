import React from "react";
import { StyledImageRow } from "./ImageRow.styles";

const ImageRow = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  return <StyledImageRow>{children}</StyledImageRow>;
};

export default ImageRow;
