import styled from "styled-components";

const primaryColor = "#666";

interface StyledTheoryTitleProps {
  color?: string;
}

export const StyledTheoryTitle = styled.h1<StyledTheoryTitleProps>`
  font-size: 45px;
  margin-bottom: 20px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 100%;
  color: ${(p) => p.color ?? primaryColor};
`;

interface StyledIndexProps {
  color?: string;
  depth: number;
}

export const StyledIndex = styled.ol<StyledIndexProps>`
  color: ${(p) => p.color ?? primaryColor};
  padding: 0;
  margin: 0.5rem 0 0;
  padding-left: ${(p) => p.depth * 1.5}rem;
  counter-reset: item;

  & li {
    display: block;
    margin-bottom: 0.5rem;
  }

  & li:before {
    counter-increment: item;
    content: counters(item, ".") " ";
  }

  & a {
    padding-left: 5px;
  }
`;

interface StyledIndexContainerProps {
  bg?: string;
  border?: string;
  roundness?: number;
}

export const StyledIndexContainer = styled.aside<StyledIndexContainerProps>`
  width: 330px;
  background-color: ${(p) => p.bg ?? primaryColor};
  border-left: 5px solid ${(p) => p.border ?? primaryColor};
  padding: 1rem 1rem;
  text-align: left;
  border-radius: ${(p) => p.roundness ?? 10}px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-right: 1.5rem;
`;

interface StyledIndexTitleProps {
  color?: string;
}

export const StyledIndexTitle = styled.h3<StyledIndexTitleProps>`
  text-align: center;
  margin-top: 0;
  font-size: 1.3rem;
  color: ${(p) => p.color ?? primaryColor};
`;

export const StyledTheoryContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
  box-sizing: border-box;
  grid-template-columns: auto 375px;
  counter-reset: section;
`;

export const StyledTheoryContentContainer = styled.div`
  flex-grow: 1;
  max-width: 1200px;
  padding-right: 1rem;
  box-sizing: border-box;
  min-width: 0;
`;

interface StyledTheoryPageProps {
  bg?: string;
}

export const StyledTheoryPage = styled.div<StyledTheoryPageProps>`
  background-color: ${(p) => p.bg ?? primaryColor};
`;
