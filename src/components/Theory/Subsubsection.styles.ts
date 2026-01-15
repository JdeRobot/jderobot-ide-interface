import styled from "styled-components";

const primaryColor = "#666";

interface StyledSubsubsectionProps {
  color?: string;
}

export const StyledSubsubsection = styled.section<StyledSubsubsectionProps>`
  margin-top: 2rem;
  color: ${(p) => p.color ?? primaryColor};
  margin-left: 1rem;
`;

export const StyledSubsubsectionTitle = styled.h4`
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  margin-left: -1rem;

  &:before {
    counter-increment: subsubsection;
    content: counter(section) "." counter(subsection) "." counter(subsubsection) ". ";
  }
`;
