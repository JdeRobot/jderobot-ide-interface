import React from "react";
import { StyledLink } from "./Link.styles";
import { useTheme } from "Utils";

const Link = ({ href, title }: { href: string; title: string }) => {
  const theme = useTheme();

  return (
    <StyledLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      color={theme.palette.primary}
    >
      {title}
    </StyledLink>
  );
};

export default Link;
