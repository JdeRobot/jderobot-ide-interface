import React, { useState } from "react";
import { TimelineComparisonEntry } from "Types";
import { contrastSelector, useTheme } from "Utils";
import {
  StyledTimelineContainer,
  StyledTimelineTitle,
} from "./Timeline.styles";
import {
  StyledTimelineComparisonContent,
  StyledTimelineComparisonContentContainer,
  StyledTimelineComparisonControls,
  StyledTimelineComparisonDesc,
  StyledTimelineComparisonTabsContent,
} from "./TimelineComparison.styles";
import {
  StyledCarouselImage,
  StyledCarouselImageWrapper,
  StyledCarouselSection,
  StyledCarouselSectionSpacer,
  StyledCarouselVideo,
} from "./CarouselDisplay.styles";

const TimelineComparison = ({
  title,
  timelines,
}: {
  title: string;
  timelines: (TimelineComparisonEntry | undefined)[];
}) => {
  const theme = useTheme();

  const [activeTimeline, setActiveTimeline] = useState(0);
  const [index, setIndex] = useState(0);

  const active = timelines[activeTimeline];

  const titleColor = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.bgLight,
  );

  // const section = "#ffffff";
  const section = theme.palette.bg;

  // TODO: tmp
  const sectionColor = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    section,
  );

  if (active === undefined) {
    return <></>;
  }

  return (
    <StyledTimelineContainer
      bg={theme.palette.bgLight}
      roundness={theme.roundness}
    >
      <StyledTimelineTitle color={titleColor}>{title}</StyledTimelineTitle>

      <StyledTimelineComparisonContent>
        <StyledTimelineComparisonContentContainer>
          <div>
            <StyledCarouselImageWrapper
              bg={"#ffffff"}
              roundness={theme.roundness}
              maxHeight={40}
            >
              {active.timeline[index].type === "video" ? (
                <StyledCarouselVideo
                  src={active.timeline[index].image}
                  controls
                />
              ) : (
                <StyledCarouselImage
                  src={active.timeline[index].image}
                  alt={active.timeline[index].title}
                />
              )}
            </StyledCarouselImageWrapper>
            <StyledTimelineComparisonDesc
              color={sectionColor}
              bg={section}
              roundness={theme.roundness}
            >
              <p>{active.timeline[index].desc}</p>
            </StyledTimelineComparisonDesc>
          </div>

          <StyledTimelineComparisonControls
            accent={theme.palette.primary}
            color={titleColor}
          >
            <input
              type="range"
              min="0"
              max={active.timeline.length - 1}
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
            />
            <label>
              {index === 0 ? 0 : index} / {active.timeline.length - 1}
            </label>
          </StyledTimelineComparisonControls>
        </StyledTimelineComparisonContentContainer>

        <StyledTimelineComparisonTabsContent>
          {timelines.map((m, i) => (
            <>
              {m === undefined ? (
                <StyledCarouselSectionSpacer>.</StyledCarouselSectionSpacer>
              ) : (
                <StyledCarouselSection
                  text={theme.palette.text}
                  altText={theme.palette.darkText}
                  bg={theme.palette.bg}
                  altBg={theme.palette.primary}
                  roundness={theme.roundness}
                  change={i === activeTimeline}
                  key={i}
                  onClick={() => {
                    setActiveTimeline(i);
                    setIndex(0);
                  }}
                >
                  {m.title}
                </StyledCarouselSection>
              )}
            </>
          ))}
        </StyledTimelineComparisonTabsContent>
      </StyledTimelineComparisonContent>
    </StyledTimelineContainer>
  );
};

export default TimelineComparison;
