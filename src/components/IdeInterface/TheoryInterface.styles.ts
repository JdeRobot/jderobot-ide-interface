import styled from "styled-components";

const primaryColor = "#666";

interface StyledTheoryTitleProps {
  color?: string;
}

export const StyledTheoryTitle = styled.h1<StyledTheoryTitleProps>`
  font-size: 45px;
  margin: 0;
  margin-bottom: 20px;
  color: ${(p) => p.color ?? primaryColor};
`;


interface StyledIndexProps {
  color?: string;
  link?: string;
  depth: number;
}

export const StyledIndex = styled.ul<StyledIndexProps>`
  color: ${(p) => p.color ?? primaryColor};
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  padding-left: ${(p) => p.depth * 1.5}rem;

  & li {
    margin-bottom: 0.5rem;
  }

  & a {
    color: ${(p) => p.link ?? primaryColor};
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

interface StyledIndexContainerProps {
  bg?: string;
  border?: string;
  roundness?: number;
}

export const StyledIndexContainer = styled.aside<StyledIndexContainerProps>`
  position: sticky;
  top: 10%;
  width: 330px;
  background-color: ${(p) => p.bg ?? primaryColor};
  border-left: 5px solid ${(p) => p.border ?? primaryColor};
  padding: 1rem 1rem;
  text-align: left;
  border-radius: ${(p) => p.roundness ?? 10}px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: static;
  margin-right: 1.5rem;
`;

interface StyledIndexTitleProps {
  color?: string;
}

export const StyledIndexTitle = styled.h3<StyledIndexTitleProps>`
  margin-top: 0;
  font-size: 1.3rem;
  color: ${(p) => p.color ?? primaryColor};
`;