import React, { useState } from "react";
import { contrastSelector, useTheme } from "Utils";
import {
  StyledCarouselContainer,
  StyledCarouselContent,
  StyledCarouselContentContainer,
  StyledCarouselImage,
  StyledCarouselImageContainer,
  StyledCarouselImageDesc,
  StyledCarouselImageTitle,
  StyledCarouselImageWrapper,
  StyledCarouselSection,
  StyledCarouselSections,
  StyledCarouselTitle,
} from "./CarouselDisplay.styles";
import { CarouselData } from "Types";

const CarouselDisplay = ({
  title,
  data,
  comparison,
  maxImageHeight,
}: {
  title: string;
  data: CarouselData[];
  comparison?: boolean;
  maxImageHeight?: number;
}) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const titleColor = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.bgLight
  );

  // TODO: tmp
  const sectionColor = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    "#ffffff"
  );

  return (
    <StyledCarouselContainer
      bg={theme.palette.bgLight}
      roundness={theme.roundness}
    >
      <StyledCarouselTitle color={titleColor}>{title}</StyledCarouselTitle>
      <StyledCarouselSections>
        {data.map((item, index) => (
          <StyledCarouselSection
            text={theme.palette.text}
            altText={theme.palette.darkText}
            bg={theme.palette.bg}
            altBg={theme.palette.primary}
            roundness={theme.roundness}
            change={index === activeIndex}
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            {item.section}
          </StyledCarouselSection>
        ))}
      </StyledCarouselSections>

      <StyledCarouselContentContainer>
        <StyledCarouselContent sideBySide={comparison}>
          {data[activeIndex].images.map((robot, i) => (
            <StyledCarouselImageContainer
              key={i}
              bg={"#ffffff"}
              color={sectionColor}
              roundness={theme.roundness}
              sideBySide={comparison}
            >
              <StyledCarouselImageWrapper
                bg={"#ffffff"}
                roundness={theme.roundness}
                maxHeight={maxImageHeight}
              >
                {robot.img ? (
                  <StyledCarouselImage src={robot.img} alt={robot.title} />
                ) : (
                  <>
                    {/*TODO: change to placeholder icon*/}
                    <div className="robot-image-placeholder">🤖</div>
                  </>
                )}
              </StyledCarouselImageWrapper>
              <StyledCarouselImageTitle>{robot.title}</StyledCarouselImageTitle>
              <StyledCarouselImageDesc>{robot.desc}</StyledCarouselImageDesc>
            </StyledCarouselImageContainer>
          ))}
        </StyledCarouselContent>
      </StyledCarouselContentContainer>
    </StyledCarouselContainer>
  );
};

export default CarouselDisplay;
