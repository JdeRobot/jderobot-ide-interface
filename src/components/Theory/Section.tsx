import React from "react";
import { contrastSelector, useTheme } from "Utils";
import { StyledSection, StyledSectionTitle } from "./Section.styles";

const TheorySection = ({
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
    <StyledSection color={text}>
      <StyledSectionTitle id={href}>{title}</StyledSectionTitle>
      {children}
    </StyledSection>
  );
};

export default TheorySection;
