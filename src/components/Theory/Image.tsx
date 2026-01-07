import React from "react";
import { contrastSelector, useTheme } from "Utils";
import { StyledImageContainer } from "./Image.styles";

const Image = ({
  title,
  caption,
  src,
  height,
}: {
  title: string;
  caption: string;
  src: string;
  height?: number;
}) => {
  const theme = useTheme();

  const text = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.bg,
  );

  return (
    <StyledImageContainer
      roundness={theme.roundness}
      color={text}
      height={height}
    >
      <img src={src} alt={title} />
      <figcaption>{caption}</figcaption>
    </StyledImageContainer>
  );
};

export default Image;
