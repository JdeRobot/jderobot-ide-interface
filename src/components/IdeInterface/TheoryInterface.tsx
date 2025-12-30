import React from "react";
import { contrastSelector, useTheme } from "Utils";
import {
  StyledIndex,
  StyledIndexContainer,
  StyledIndexTitle,
  StyledTheoryTitle,
} from "./TheoryInterface.styles";

interface TheoryIndex {
  href: string;
  title: string;
  subsections: TheoryIndex[];
}

interface IdeInterfaceProps {
  title: string;
  index: TheoryIndex[];
  children?: JSX.Element;
}

const TheoryInterface = ({
  title,
  index,
  children,
}: IdeInterfaceProps) => {
  const theme = useTheme();

  const titleColor = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.bg
  );

  return (
    <div>
      <StyledTheoryTitle id="title" color={titleColor}>
        {title}
      </StyledTheoryTitle>
      {children}
      <StyledIndexContainer
        bg={theme.palette.bg}
        border={theme.palette.primary}
        roundness={theme.roundness}
      >
        <StyledIndexTitle color={titleColor}>
          Table of contents
        </StyledIndexTitle>
        <StyledIndex depth={0}>
          {index.map((data) => (
            <IndexEntry key={data.title} index={data} depth={0} />
          ))}
        </StyledIndex>
      </StyledIndexContainer>
    </div>
  );
};

const IndexEntry = ({
  index,
  depth,
}: {
  index: TheoryIndex;
  depth: number;
}) => {
  return (
    <>
      <li>
        <a href={index.href}>{index.title}</a>
      </li>
      <StyledIndex depth={depth + 1}>
        {index.subsections.map((data) => (
          <IndexEntry key={data.title} index={data} depth={depth + 1} />
        ))}
      </StyledIndex>
    </>
  );
};

export default TheoryInterface;
