import { useEffect, useState } from "react";
import { CommsManager } from "jderobot-commsmanager";
import BounceLoader from "react-spinners/BounceLoader";
import { subscribe, unsubscribe, useTheme } from "Utils";
import {
  StyledVNCMsg,
  StyledVNCScreen,
  StyledVNCViewer,
  StyledVNCViewerLoader,
} from "./VncViewer.styles";

const enabled = (state?: string): boolean => {
  if (
    state === "tools_ready" ||
    state === "application_running" ||
    state === "paused"
  ) {
    return true;
  }

  return false;
};

const VncViewer = ({
  commsManager,
  isHttps,
  ip,
  port,
  message,
}: {
  commsManager: CommsManager | null;
  isHttps?: boolean;
  ip?: string;
  port: number;
  message?: string;
}) => {
  const theme = useTheme();
  const [state, setState] = useState<string | undefined>(
    commsManager?.getState()
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
          src={`http${isHttps ? "s" : ""}://${ip ? ip : "127.0.0.1"}:${port}/vnc.html?resize=remote&autoconnect=true&reconnect=true`}
        />
      ) : (
        <StyledVNCViewerLoader>
          {state === "idle" ? (
            <StyledVNCMsg color={theme.palette.error}>
              {message}
            </StyledVNCMsg>
          ) : (
            <BounceLoader
              color={theme.palette.primary}
              size={80}
              speedMultiplier={0.7}
            />
          )}
        </StyledVNCViewerLoader>
      )}
    </StyledVNCViewer>
  );
};

export default VncViewer;
