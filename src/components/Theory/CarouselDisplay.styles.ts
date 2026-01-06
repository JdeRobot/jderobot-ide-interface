import styled from "styled-components";
import { contrastSelector } from "Utils";

const primaryColor = "#666";

interface StyledCarouselContainerProps {
  bg?: string;
  roundness?: number;
}

export const StyledCarouselContainer = styled.div<StyledCarouselContainerProps>`
  background-color: ${(p) => p.bg ?? primaryColor};
  border-radius: ${(p) => p.roundness ?? 1}px;
  padding: 2rem 1rem;
  box-shadow:
    inset 0 1px 2px #ffffff30,
    0 1px 2px #00000030,
    0 2px 4px #00000015;
  margin: 2rem auto;
  text-align: center;
  width: 95%;
`;

interface StyledCarouselTitleProps {
  color?: string;
}

export const StyledCarouselTitle = styled.h3<StyledCarouselTitleProps>`
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-weight: 500;
  line-height: 1.2;
  color: ${(p) => p.color ?? primaryColor};
`;

export const StyledCarouselSections = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

interface StyledCarouselSectionProps {
  text?: string;
  altText?: string;
  bg?: string;
  altBg?: string;
  roundness?: number;
  change: boolean;
}

const handleChange = (p: StyledCarouselSectionProps) => {
  if (p.change) {
    return `
      color: ${contrastSelector(p.text, p.altText, p.altBg)};
      background-color: ${p.altBg ?? primaryColor};
      opacity: 85%;
    `;
  } else {
    return `
      color: ${contrastSelector(p.text, p.altText, p.bg)};
      background-color: ${p.bg ?? primaryColor};
      opacity: 70%;
    `;
  }
};

export const StyledCarouselSection = styled.button<StyledCarouselSectionProps>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${(p) => p.roundness ?? 1}px;
  font-weight: bold;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  ${handleChange}
  &:hover {
    opacity: 100%;
  }
`;

export const StyledCarouselContentContainer = styled.div`
  margin-top: 2rem;
`;

interface StyledCarouselContentProps {
  sideBySide?: boolean;
}

export const StyledCarouselContent = styled.div<StyledCarouselContentProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${(p: StyledCarouselContentProps) => {
    if (p.sideBySide) {
      return `gap: 4%;`;
    }
    return `gap: 1.5rem;`;
  }}
`;

interface StyledCarouselImageContainerProps {
  bg?: string;
  color?: string;
  roundness?: number;
  sideBySide?: boolean;
}

const handleMode = (p: StyledCarouselImageContainerProps) => {
  if (p.sideBySide) {
    return `width: 48%;`;
  }
  return `width: 250px;`;
};

export const StyledCarouselImageContainer = styled.div<StyledCarouselImageContainerProps>`
  padding: 1rem;
  background-color: ${(p) => p.bg ?? primaryColor};
  color: ${(p) => p.color ?? primaryColor};
  border-radius: ${(p) => p.roundness ?? 1}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  ${handleMode}
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
  }
`;

interface StyledCarouselImageWrapperProps {
  bg?: string;
  roundness?: number;
  maxHeight?: number;
}

export const StyledCarouselImageWrapper = styled.div<StyledCarouselImageWrapperProps>`
  width: 100%;
  aspect-ratio: 1/1;
  ${(p: StyledCarouselImageWrapperProps) => {
    if (p.maxHeight) {
      return `height: ${p.maxHeight}vh;`;
    }
  }}
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background-color: ${(p) => p.bg ?? primaryColor};
  border-radius: ${(p) => p.roundness ?? 1}px;
  overflow: hidden;
`;

export const StyledCarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  border-radius: inherit;
`;

export const StyledCarouselImageTitle = styled.p`
  font-weight: bold;
  margin: 0.5rem 0;
  font-size: 1.1rem;
`;

export const StyledCarouselImageDesc = styled.p`
  font-size: 0.95rem;
  line-height: 1.3;
`;
