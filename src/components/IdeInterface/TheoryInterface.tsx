import React from "react";
import { contrastSelector, useTheme } from "Utils";
import {
  StyledIndex,
  StyledIndexContainer,
  StyledIndexTitle,
  StyledTheoryContainer,
  StyledTheoryContentContainer,
  StyledTheoryPage,
  StyledTheoryTitle,
} from "./TheoryInterface.styles";

interface TheoryIndex {
  href: string;
  title: string;
  subsections?: TheoryIndex[];
}

interface IdeInterfaceProps {
  title: string;
  index?: TheoryIndex[];
  children?: JSX.Element | JSX.Element[];
}

const findSections = (index: TheoryIndex[], children: JSX.Element) => {
  if (children.type.name === "TheorySection") {
    index.push({
      href: `#${children.props.href}`,
      title: children.props.title,
      subsections: [],
    });

    if (Array.isArray(children.props.children)) {
      children.props.children.forEach((child: JSX.Element) => {
        findSubsections(index, child);
      });
    } else {
      findSubsections(index, children.props.children);
    }
  }
};

const findSubsections = (index: TheoryIndex[], children: JSX.Element) => {
  if (children.type.name === "TheorySubsection") {
    index[index.length - 1].subsections?.push({
      href: `#${children.props.href}`,
      title: children.props.title,
    });
  }
};

const TheoryInterface = ({ title, index, children }: IdeInterfaceProps) => {
  const theme = useTheme();

  if (index === undefined) {
    index = [];
    if (children) {
      if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) {
          findSections(index, children[i]);
        }
      } else {
        findSections(index, children);
      }
    }
  }

  const titleColor = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.bg
  );

  const indexColor = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.bgLight
  );

  return (
    <StyledTheoryPage bg={theme.palette.bg}>
      <StyledTheoryTitle id="title" color={titleColor}>
        {title}
      </StyledTheoryTitle>
      <StyledTheoryContainer>
        <StyledTheoryContentContainer>{children}</StyledTheoryContentContainer>
        <StyledIndexContainer
          bg={theme.palette.bgLight}
          border={theme.palette.primary}
          roundness={theme.roundness}
        >
          <StyledIndexTitle color={indexColor}>
            Table of contents
          </StyledIndexTitle>
          <StyledIndex
            depth={0}
            color={indexColor}
            link={theme.palette.primary}
          >
            {index.map((data) => (
              <IndexEntry
                key={data.title}
                index={data}
                depth={0}
                color={indexColor}
              />
            ))}
          </StyledIndex>
        </StyledIndexContainer>
      </StyledTheoryContainer>
    </StyledTheoryPage>
  );
};

const IndexEntry = ({
  index,
  color,
  depth,
}: {
  index: TheoryIndex;
  color?: string;
  depth: number;
}) => {
  const theme = useTheme();

  return (
    <>
      <li>
        <a href={index.href}>{index.title}</a>
        {index.subsections !== undefined && (
          <StyledIndex
            color={color}
            link={theme.palette.primary}
            depth={depth + 1}
          >
            {index.subsections.map((data) => (
              <IndexEntry key={data.title} index={data} depth={depth + 1} />
            ))}
          </StyledIndex>
        )}
      </li>
    </>
  );
};

export default TheoryInterface;
