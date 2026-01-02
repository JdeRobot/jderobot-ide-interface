import styled from "styled-components";

const primaryColor = "#666";

interface StyledSubsectionProps {
  color?: string;
}

export const StyledSubsection = styled.section<StyledSubsectionProps>`
  margin-top: 2rem;
  color: ${(p) => p.color ?? primaryColor};
`;

export const StyledSubsectionTitle = styled.h4`
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  margin-left: -1rem;

  &:before {
    counter-increment: subsection;
    content: counter(section) "." counter(subsection) ". ";
  }
`;
