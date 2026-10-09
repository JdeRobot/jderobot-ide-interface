import { CommsManager } from "jderobot-commsmanager";
import { useEffect, useReducer, useState } from "react";
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
    commsManager?.getState(),
  );
  const [localError, setLocalError] = useState<boolean>(false);
  const [remoteError, setRemoteError] = useState<boolean>(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const updateState = (e: any) => {
    setState(e.detail.state);
  };

  useEffect(() => {
    subscribe("CommsManagerStateChange", updateState);

    return () => {
      unsubscribe("CommsManagerStateChange", () => { });
    };
  }, []);

  const handleError = () => {
    forceUpdate();
  };

  navigator.permissions.query({ name: ("local-network" as PermissionName) }).then((result) => {
    if (result.state === "denied") {
      setLocalError(true);
    }
    result.addEventListener("change", () => {
      if (result.state === "denied") {
        setLocalError(true);
      } else {
        setLocalError(false);
      }
    });
  });

  navigator.permissions.query({ name: ("loopback-network" as PermissionName) }).then((result) => {
    if (result.state === "denied") {
      setRemoteError(true);
    }
    result.addEventListener("change", () => {
      if (result.state === "denied") {
        setRemoteError(true);
      } else {
        setRemoteError(false);
      }
    });
  });

  if (localError) {
    return (
      <StyledVNCViewer bgColor={theme.palette.bg}>
        <StyledVNCViewerLoader>
          <StyledVNCMsg color={theme.palette.error}>
            {`${"Local"} network access permissions are needed for the RoboticsBackend displays to work.`}
            <br />
            <br />
            {`Please grant such permissions and refresh the page if needed.`}
            <br />
            <br />
            {`To know more about how to turn it on search: "Grant ${"local"} access permissions in <your browser>"`}
          </StyledVNCMsg>
        </StyledVNCViewerLoader>
      </StyledVNCViewer>
    );
  }

  if (remoteError) {
    return (
      <StyledVNCViewer bgColor={theme.palette.bg}>
        <StyledVNCViewerLoader>
          <StyledVNCMsg color={theme.palette.error}>
            {`"Access to other apps and services on this device" permissions are needed for the RoboticsBackend displays to work.`}
            <br />
            <br />
            {`Please grant such permissions and refresh the page if needed.`}
            <br />
            <br />
            {`To know more about how to turn it on search: "Grant personal device permissions in <your browser>"`}
          </StyledVNCMsg>
        </StyledVNCViewerLoader>
      </StyledVNCViewer>
    );
  }

  return (
    <StyledVNCViewer bgColor={theme.palette.bg}>
      {enabled(state) ? (
        <StyledVNCScreen
          title="VNC viewer"
          id={"vnc-viewer"}
          onError={handleError}
          src={`http${isHttps ? "s" : ""}://${ip ? ip : "127.0.0.1"}:${port}/vnc.html?resize=remote&autoconnect=true&reconnect=true`}
        />
      ) : (
        <StyledVNCViewerLoader>
          {state === "idle" ? (
            <StyledVNCMsg color={theme.palette.error}>{message}</StyledVNCMsg>
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