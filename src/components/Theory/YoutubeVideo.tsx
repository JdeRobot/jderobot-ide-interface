import React from "react";
import { StyledYoutube } from "./YoutubeVideo.styles";
import { useTheme } from "Utils";

const YoutubeVideo = ({
  title,
  id,
  position,
}: {
  title: string;
  id: string;
  position?: string;
}) => {
  const theme = useTheme();

  return (
    <StyledYoutube
      title={title}
      videoId={id}
      roundness={theme.roundness}
      position={position}
    />
  );
};

export default YoutubeVideo;
