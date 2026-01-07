import React, { useState } from "react";
import { useTheme } from "Utils";
import { StyledTheoryCode } from "./Code.styles";

import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const Code = ({ children }: { children: string }) => {
  const theme = useTheme();
  const [copied, copyCode] = useState(false);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const copy = async () => {
    copyCode(true);
    await navigator.clipboard.writeText(children);
    await delay(2500);
    copyCode(false);
  };

  return (
    <StyledTheoryCode
      color={theme.palette.placeholderText}
      bg={theme.palette.bgLight}
      roundness={theme.roundness}
      border={theme.palette.primary}
    >
      {children}
      {copied ? (
        <>
          <div>Copied!</div>
          <CheckRoundedIcon htmlColor={theme.palette.success} />
        </>
      ) : (
        <ContentCopyRoundedIcon onClick={copy} />
      )}
    </StyledTheoryCode>
  );
};

export default Code;
