import styled from "styled-components";

const primaryColor = "#666";

interface StyledSectionProps {
  color?: string;
}

export const StyledSection = styled.section<StyledSectionProps>`
  margin-top: 1rem;
  margin-bottom: 7rem;
  color: ${(p) => p.color ?? primaryColor};
  counter-reset: subsection;
  margin-left: 2rem;

  & p {
    text-align: justify;
  }
`;

export const StyledSectionTitle = styled.h3`
  font-size: 1.75rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  margin-left: -2rem;

  &:before {
    counter-increment: section;
    content: counters(section, ".") ". ";
  }
`;
