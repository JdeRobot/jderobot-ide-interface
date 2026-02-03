import React, { ReactNode } from "react";
import { contrastSelector, useTheme } from "Utils";
import {
  StyledSubsubsection,
  StyledSubsubsectionTitle,
} from "./Subsubsection.styles";

const TheorySubsubsection = ({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: ReactNode;
}) => {
  const theme = useTheme();

  const text = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.bg,
  );

  return (
    <StyledSubsubsection color={text}>
      <StyledSubsubsectionTitle id={href}>{title}</StyledSubsubsectionTitle>
      {children}
    </StyledSubsubsection>
  );
};

export default TheorySubsubsection;
