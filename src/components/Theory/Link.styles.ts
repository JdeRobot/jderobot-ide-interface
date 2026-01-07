import styled from "styled-components";
const primaryColor = "#666";

interface StyledLinkProps {
  color?: string;
}

export const StyledLink = styled.a<StyledLinkProps>`
  color: ${(p) => p.color ?? primaryColor};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
