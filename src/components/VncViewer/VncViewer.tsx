import { useEffect, useState } from "react";
import { CommsManager } from "jderobot-commsmanager";
import BounceLoader from "react-spinners/BounceLoader";
import { subscribe, unsubscribe, useTheme } from "Utils";
import {
  StyledVNCScreen,
  StyledVNCViewer,
  StyledVNCViewerLoader,
} from "./VncViewer.styles";

const enabled = (state?: string): boolean => {
  if (
    state === "visualization_ready" ||
    state === "application_running" ||
    state === "paused"
  ) {
    return true;
  }

  return false;
};

const VncViewer = ({
  commsManager,
  port,
}: {
  commsManager: CommsManager | null;
  port: number;
}) => {
  const theme = useTheme();
  const [state, setState] = useState<string | undefined>(
    commsManager?.getState(),
  );

  const updateState = (e: any) => {
    setState(e.detail.state);
  };

  useEffect(() => {
    subscribe("CommsManagerStateChange", updateState);

    return () => {
      unsubscribe("CommsManagerStateChange", () => {});
    };
  }, []);

  return (
    <StyledVNCViewer bgColor={theme.palette.background}>
      {enabled(state) ? (
        <StyledVNCScreen
          title="VNC viewer"
          id={"vnc-viewer"}
          src={`http://127.0.0.1:${port}/vnc.html?resize=remote&autoconnect=true`}
        />
      ) : (
        <StyledVNCViewerLoader>
          <BounceLoader
            color={theme.palette.primary}
            size={80}
            speedMultiplier={0.7}
          />
        </StyledVNCViewerLoader>
      )}
    </StyledVNCViewer>
  );
};

export default VncViewer;
