import React from "react";
import { contrastSelector, useTheme } from "Utils";

import { StyledHighlightContainer } from "./HighlightedSection.styles";

const HighlightedSection = ({ children }: { children: any }) => {
  const theme = useTheme();

  // TODO: temp
  const text = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    "#fff9c4"
  );

  return (
    <StyledHighlightContainer
      color={text}
      bg={"#fff9c4"}
      roundness={theme.roundness}
    >
      {children}
      <span className="icon-bulb">💡</span>
    </StyledHighlightContainer>
  );
};

export default HighlightedSection;