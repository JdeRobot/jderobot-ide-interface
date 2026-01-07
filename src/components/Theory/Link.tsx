import React from "react";
import { StyledLink } from "./Link.styles";
import { useTheme } from "Utils";

const Link = ({
  href,
  title,
  newTab,
}: {
  href: string;
  title: string;
  newTab?: boolean;
}) => {
  const theme = useTheme();

  if (newTab) {
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
  }

  return (
    <StyledLink href={href} color={theme.palette.primary}>
      {title}
    </StyledLink>
  );
};

export default Link;
