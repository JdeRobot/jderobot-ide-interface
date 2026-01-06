import React, { useState } from "react";
import { contrastSelector, useTheme } from "Utils";
import {
  StyledTimelineCard,
  StyledTimelineContainer,
  StyledTimelineControlContainer,
  StyledTimelineControls,
  StyledTimelineImageDesc,
  StyledTimelineSection,
  StyledTimelineSubtitle,
  StyledTimelineTitle,
} from "./Timeline.styles";
import {
  StyledCarouselImage,
  StyledCarouselImageTitle,
  StyledCarouselImageWrapper,
} from "./CarouselDisplay.styles";

interface TimelineEntry {
  title: string;
  era?: string;
  desc: string[];
  image: string;
  link?: string;
}

const Timeline = ({
  title,
  timeline,
}: {
  title: string;
  timeline: TimelineEntry[];
}) => {
  const theme = useTheme();
  const [current, setCurrent] = useState(0);

  const titleColor = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.bgLight
  );

  return (
    <StyledTimelineContainer
      bg={theme.palette.bgLight}
      roundness={theme.roundness}
    >
      <StyledTimelineTitle color={titleColor}>{title}</StyledTimelineTitle>

      <StyledTimelineSection>
        {timeline.map((item, index) => (
          <>
            <TimelineCard index={index} data={item} active={current} />
            <TimelineCard index={index} data={item} active={current} hidden />
          </>
        ))}
      </StyledTimelineSection>

      <StyledTimelineControlContainer>
        <StyledTimelineControls
          color={titleColor}
          accent={theme.palette.primary}
        >
          <label>← Past</label>

          <input
            type="range"
            min="0"
            max={timeline.length - 1}
            value={current}
            onChange={(e) => setCurrent(Number(e.target.value))}
          />

          <label>Future →</label>
        </StyledTimelineControls>

        <StyledTimelineSubtitle>
          {timeline[current].title}
        </StyledTimelineSubtitle>
      </StyledTimelineControlContainer>
    </StyledTimelineContainer>
  );
};

export default Timeline;

const TimelineCard = ({
  index,
  data,
  active,
  hidden,
}: {
  index: number;
  data: TimelineEntry;
  active: number;
  hidden?: boolean;
}) => {
  const theme = useTheme();
  const section = "#ffffff";

  // TODO: tmp
  const sectionColor = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    section
  );

  return (
    <StyledTimelineCard
      key={index}
      offset={index - active}
      bg={section}
      color={sectionColor}
      roundness={theme.roundness}
      hidden={hidden}
    >
      {index - active === 0 ? ( // Solo si es la card activa
        <a href={data.link} target="_blank" rel="noopener noreferrer">
          <StyledCarouselImageWrapper bg={section} roundness={theme.roundness}>
            <StyledCarouselImage src={data.image} alt={data.title} />
          </StyledCarouselImageWrapper>
          <StyledCarouselImageTitle>{data.title}</StyledCarouselImageTitle>
          {data.desc.map((line, i) => (
            <StyledTimelineImageDesc key={i}>{line}</StyledTimelineImageDesc>
          ))}
        </a>
      ) : (
        <>
          <StyledCarouselImageWrapper bg={section} roundness={theme.roundness}>
            <StyledCarouselImage src={data.image} alt={data.title} />
          </StyledCarouselImageWrapper>
          <StyledCarouselImageTitle>{data.title}</StyledCarouselImageTitle>
          {data.desc.map((line, i) => (
            <StyledTimelineImageDesc key={i}>{line}</StyledTimelineImageDesc>
          ))}
        </>
      )}
    </StyledTimelineCard>
  );
};
