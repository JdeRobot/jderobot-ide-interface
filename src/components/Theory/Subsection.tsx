import React from "react";
import { contrastSelector, useTheme } from "Utils";
import { StyledSubsection, StyledSubsectionTitle } from "./Subsection.styles";

const TheorySubsection = ({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: any;
}) => {
  const theme = useTheme();

  const text = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.bg
  );

  return (
    <StyledSubsection color={text}>
      <StyledSubsectionTitle id={href}>{title}</StyledSubsectionTitle>
      {children}
    </StyledSubsection>
  );
};

export default TheorySubsection;
