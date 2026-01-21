import React, { ReactNode } from "react";
import { contrastSelector, useTheme } from "Utils";

import { StyledFormulaContainer } from "./FormulaSection.styles";

const FormulaSection = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  // TODO: temp
  const text = contrastSelector(
    theme.palette.text,
    theme.palette.bg,
  );

  return (
    <StyledFormulaContainer
      color={text}
      bg={theme.palette.bg}
    >
      {children}
    </StyledFormulaContainer>
  );
};

export default FormulaSection;