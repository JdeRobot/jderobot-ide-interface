import React from "react";
import { contrastSelector, useTheme } from "Utils";

import { StyledHighlightContainer } from "./HighlightedSection.styles";
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';

const HighlightedSection = ({ children }: { children: any }) => {
  const theme = useTheme();

  // TODO: temp
  const text = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.button.info
  );

  return (
    <StyledHighlightContainer
      color={text}
      bg={theme.palette.button.info}
      roundness={theme.roundness}
    >
      {children}
      <TipsAndUpdatesRoundedIcon htmlColor={theme.palette.primary}/>
    </StyledHighlightContainer>
  );
};

export default HighlightedSection;