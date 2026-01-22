import React from "react";
import { StyledLocalVideo } from "./LocalVideo.styles";
import { useTheme } from "Utils";

const LocalVideo = ({
    src,
    position,
}: {
    src: string;
    position?: string;
}) => {
    const theme = useTheme();

    return (
        <StyledLocalVideo
            src={src}
            controls
            roundness={theme.roundness}
            position={position}
        />
    );
};

export default LocalVideo;