import React from "react";
import { ResetIcon } from "Assets";
import { CommsManager, states } from "jderobot-commsmanager";
import { useEffect, useState } from "react";
import { subscribe, unsubscribe, useError, useTheme } from "Utils";
import {
  StyledStatusBarButton,
  StyledStatusBarContainer,
  StyledStatusBarEntry,
} from "./StatusBar.style";
import { DropdownStatusBar } from "Components";
import { StatusBarComponents, ExtraApi } from "Types";

const StatusBar = ({
  project,
  commsManager,
  connectManager,
  api,
  baseUniverse,
  extraComponents,
}: {
  project: string;
  commsManager: CommsManager | null;
  connectManager: (
    desiredState?: string,
    callback?: () => void
  ) => Promise<void>;
  baseUniverse?: string;
  api: ExtraApi;
  extraComponents: StatusBarComponents;
}) => {
  const theme = useTheme();
  const [dockerData, setDockerData] = useState<any>(
    commsManager?.getHostData()
  );
  const [state, setState] = useState<string | undefined>(
    commsManager?.getState()
  );
  const connectWithRetry = async () => {
    const data = commsManager?.getHostData();
    if (data) {
      setDockerData(data);
      return;
    }
    setTimeout(connectWithRetry, 1000);
  };

  if (dockerData === undefined) {
    connectWithRetry();
  }

  const updateState = (e: any) => {
    setState(e.detail.state);
    if (e.detail.state == states.IDLE) {
      setDockerData(undefined);
      connectWithRetry();
    }
  };

  useEffect(() => {
    subscribe("CommsManagerStateChange", updateState);

    return () => {
      unsubscribe("CommsManagerStateChange", () => {});
    };
  }, []);

  return (
    <StyledStatusBarContainer bgColor={theme.palette.primary}>
      {dockerData ? (
        <>
          <StyledStatusBarEntry text={theme.palette.text} title="ROS 2 version">
            <label>{`ROS 2: ${dockerData.ros_version}`}</label>
          </StyledStatusBarEntry>
          <StyledStatusBarEntry text={theme.palette.text} title="GPU status">
            <label>{`GPU: ${dockerData.gpu_avaliable}`}</label>
          </StyledStatusBarEntry>
          <StyledStatusBarEntry
            text={theme.palette.text}
            title="Robotics Backend version"
          >
            <label>{`Robotics Backend: ${dockerData.robotics_backend_version}`}</label>
          </StyledStatusBarEntry>
        </>
      ) : (
        <StyledStatusBarButton
          text={theme.palette.darkText}
          bgColor={theme.palette.warning}
          hoverColor={theme.palette.button.hoverWarning}
          animate
          id={`connect-with-rb`}
          onClick={() => {
            if (state === undefined || state === "idle") {
              connectManager();
            }
          }}
          title="Connect to the Robotics Backend"
        >
          <ResetIcon viewBox="0 0 20 20" stroke={theme.palette.darkText} />
          <label>{`Connect${state === undefined || state === "idle" ? "" : "ing ..."}`}</label>
        </StyledStatusBarButton>
      )}
      <StyledStatusBarEntry
        text={theme.palette.text}
        title="Robotics Backend state"
      >
        <label id="robotics-backend-state">{state}</label>
      </StyledStatusBarEntry>
      {extraComponents.universeSelector ? (
        <StatusBarCustomUniverseSelector
          project={project}
          commsManager={commsManager}
          api={api}
          components={extraComponents}
        />
      ) : (
        <DefaultUniverseSelector
          project={project}
          connectManager={connectManager}
          commsManager={commsManager}
          api={api}
          baseUniverse={baseUniverse}
        />
      )}
      <div style={{ marginLeft: "auto" }} />
      {extraComponents.extras.map((component: any) => {
        return component;
      })}
    </StyledStatusBarContainer>
  );
};

export default StatusBar;

const DefaultUniverseSelector = ({
  project,
  connectManager,
  commsManager,
  api,
  baseUniverse,
}: {
  project: string;
  connectManager: (
    desiredState?: string,
    callback?: () => void
  ) => Promise<void>;
  commsManager: CommsManager | null;
  api: ExtraApi;
  baseUniverse?: string;
}) => {
  const { warning, error, info } = useError();
  const [universe, setUniverse] = useState<string | undefined>(
    commsManager?.getUniverse()
  );

  const [universeList, setUniverseList] = useState<string[]>([]);

  const resetUniverse = (e: any) => {
    if (e.detail.state == states.IDLE) {
      setUniverse(baseUniverse);
    }
  };

  useEffect(() => {
    subscribe("CommsManagerStateChange", resetUniverse);

    return () => {
      unsubscribe("CommsManagerStateChange", () => {});
    };
  }, []);

  useEffect(() => {
    if (commsManager) {
      console.log("Change Universe", commsManager.getUniverse());
      setUniverse(commsManager.getUniverse());
    }
  }, [commsManager?.getUniverse()]);

  useEffect(() => {
    const get_universe_list = async () => {
      const list = await api.universes.list(project);
      setUniverseList(list);
    };
    get_universe_list();
  }, [project]);

  useEffect(() => {
    if (baseUniverse !== undefined) {
      selectUniverse(baseUniverse);
    }
  }, [baseUniverse]);

  const terminateUniverse = async () => {
    if (!commsManager) {
      warning(
        "Failed to connect with the Robotics Backend docker. Please make sure it is connected."
      );
      return;
    }
    // Down the RB ladder
    await commsManager.terminateApplication();
    await commsManager.terminateTools();
    await commsManager.terminateUniverse();
  };

  const launchUniverse = async (universe: string) => {
    if (!commsManager) {
      warning(
        "Failed to connect with the Robotics Backend docker. Please make sure it is connected."
      );
      return;
    }

    if (project === "") {
      error("Failed to find the current project name.");
      return;
    }

    const universeConfig = await api.universes.get_config(project, universe);

    const tools = universeConfig.tools;
    const world_config = universeConfig.world;
    const robot_config = universeConfig.robot;

    const universe_config = {
      name: universe,
      world: world_config,
      robot: robot_config,
    };

    await commsManager.launchWorld(universe_config);
    console.log("RB universe launched!");
    // TODO: update to tools
    await commsManager.prepareTools(tools, universeConfig.tools_config);
    console.log("Viz ready!");
  };

  const selectUniverse = async (universeName: string) => {
    console.log(universeName);

    try {
      // Launch if new universe selected
      if (universeName !== universe) {
        if (universe) await api.universes.list(project);
        if (universe) await terminateUniverse();
        await launchUniverse(universeName);
        console.log("Launch universe successful");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Unable to retrieve universe config: " + e.message);
        error("Unable to retrieve universe config: " + e.message);
      }
    }
  };

  const checkManager = () => {
    if (commsManager === null || commsManager.getState() === "idle") {
      info("Connecting with the Robotics Backend ...");
      connectManager(states.TOOLS_READY, () => {
        close();
        checkManager();
      });
      throw Error(
        "The Robotics Backend is disconnected. Make sure to connect."
      );
    }
  };

  return (
    <DropdownStatusBar
      id="universe-selector"
      title="Universe Selector"
      width={300}
      baseHeight={24}
      down={false}
      setter={selectUniverse}
      onOpen={checkManager}
      possibleValues={universeList}
    >
      <label>
        {universe
          ? `Universe: ${universe}`
          : universeList.length === 0
            ? `No universes to select`
            : "Click to select universe"}
      </label>
    </DropdownStatusBar>
  );
};

export const StatusBarCustomUniverseSelector = ({
  project,
  commsManager,
  api,
  components,
}: {
  project: string;
  commsManager: CommsManager | null;
  api: ExtraApi;
  components: any;
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const { warning, error } = useError();
  const [universe, setUniverse] = useState<string | undefined>(
    commsManager?.getUniverse()
  );

  const resetUniverse = (e: any) => {
    if (e.detail.state == states.IDLE) {
      setUniverse(undefined);
    }
  };

  useEffect(() => {
    subscribe("CommsManagerStateChange", resetUniverse);

    return () => {
      unsubscribe("CommsManagerStateChange", () => {});
    };
  }, []);

  useEffect(() => {
    if (commsManager) {
      console.log("Change Universe", commsManager.getUniverse());
      setUniverse(commsManager.getUniverse());
    }
  }, [commsManager?.getUniverse()]);

  const terminateUniverse = async () => {
    if (!commsManager) {
      warning(
        "Failed to connect with the Robotics Backend docker. Please make sure it is connected."
      );
      return;
    }
    // Down the RB ladder
    await commsManager.terminateApplication();
    await commsManager.terminateTools();
    await commsManager.terminateUniverse();
  };

  const launchUniverse = async (universe: string) => {
    if (!commsManager) {
      warning(
        "Failed to connect with the Robotics Backend docker. Please make sure it is connected."
      );
      return;
    }

    if (project === "") {
      error("Failed to find the current project name.");
      return;
    }

    const universeConfig = await api.universes.get_config(project, universe);

    const tools = universeConfig.tools;

    if (!tools.includes("state_monitor")) {
      tools.push("state_monitor");
    }

    const world_config = universeConfig.world;

    const robot_config = universeConfig.robot;

    const universe_config = {
      name: universe,
      world: world_config,
      robot: robot_config,
    };

    await commsManager.launchWorld(universe_config);
    console.log("RB universe launched!");
    // TODO: update to tools
    await commsManager.prepareTools(tools, universeConfig.tools_config);
    console.log("Viz ready!");
  };

  const selectUniverse = async (universeName: string) => {
    console.log(universeName);
    setOpen(false);

    if (!universeName) return;

    try {
      // Launch if new universe selected
      if (universeName !== universe) {
        if (universe) await api.universes.list(project);
        if (universe) await terminateUniverse();
        await launchUniverse(universeName);
        console.log("Launch universe successful");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Unable to retrieve universe config: " + e.message);
        error("Unable to retrieve universe config: " + e.message);
      }
    }
  };

  return (
    <div>
      <StyledStatusBarEntry
        id="universe-selector"
        title="Universe selector"
        onClick={() => setOpen(true)}
        text={theme.palette.text}
      >
        <label>
          {universe ? `Universe: ${universe}` : "Click to select universe"}
        </label>
      </StyledStatusBarEntry>
      {open && (
        <components.universeSelector
          isOpen={open}
          onSelect={selectUniverse}
          onClose={() => setOpen(false)}
          project={project}
        />
      )}
    </div>
  );
};
