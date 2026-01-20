import React from "react";
import { contrastSelector, useTheme } from "Utils";
import {StyledFormulaContainer } from "./FormulaSection.styles"

const FormulaSection = () => {
    const theme = useTheme();

    const text = contrastSelector(
        theme.palette.text,
        theme.palette.darkText,
        theme.palette.bg,
      );
    
    return (
        <StyledFormulaContainer
            color = {text}
            bg = {theme.palette.bg}
        >            
        </StyledFormulaContainer>
    );
};

export default FormulaSection;