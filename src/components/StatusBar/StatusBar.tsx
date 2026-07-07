import React from "react";
import { CommsManager, states } from "jderobot-commsmanager";
import { useEffect, useState } from "react";
import {
  contrastSelector,
  publish,
  subscribe,
  unsubscribe,
  useError,
  useTheme,
} from "Utils";
import {
  DummySpacer,
  StyledStatusBarContainer,
  StyledStatusBarEntry,
} from "./StatusBar.style";
import { DropdownStatusBar } from "Components";
import { StatusBarComponents, ExtraApi, ViewersEntry } from "Types";

const StatusBar = ({
  project,
  viewers,
  commsManager,
  api,
  baseWorld,
  extraComponents,
}: {
  project: string;
  commsManager: CommsManager | null;
  baseWorld?: string;
  api: ExtraApi;
  viewers: ViewersEntry[];
  extraComponents: StatusBarComponents;
}) => {
  const theme = useTheme();
  const [dockerData, setDockerData] = useState<any>(
    commsManager?.getHostData(),
  );
  const [state, setState] = useState<string | undefined>(
    commsManager?.getState(),
  );

  const statusText = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.primary,
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
    const T = CustomEvent<{ detail: unknown }>;
    if (e instanceof T) {
      setState(e.detail.state);
      if (e.detail.state == states.IDLE) {
        setDockerData(undefined);
        connectWithRetry();
      }
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
      {dockerData !== undefined ? (
        <>
          <StyledStatusBarEntry text={statusText} title="ROS 2 version">
            <label>{`ROS 2: ${dockerData.ros_version}`}</label>
          </StyledStatusBarEntry>
          <StyledStatusBarEntry text={statusText} title="GPU status">
            <label>{`GPU: ${dockerData.gpu_avaliable}`}</label>
          </StyledStatusBarEntry>
          <StyledStatusBarEntry
            text={statusText}
            title="Robotics Backend version"
          >
            <label>{`Robotics Backend: ${dockerData.robotics_backend_version}`}</label>
          </StyledStatusBarEntry>
        </>
      ) : (
        <DummySpacer />
      )}
      <StyledStatusBarEntry text={statusText} title="Robotics Backend state">
        <label id="robotics-backend-state">{state}</label>
      </StyledStatusBarEntry>
      {extraComponents.worldSelector ? (
        <StatusBarCustomWorldSelector
          project={project}
          commsManager={commsManager}
          api={api}
          components={extraComponents}
        />
      ) : (
        <DefaultWorldSelector
          project={project}
          commsManager={commsManager}
          api={api}
          baseWorld={baseWorld}
        />
      )}
      <DefaultToolsSelector tools={viewers} />
      <div style={{ marginLeft: "auto" }} />
      {extraComponents.extras.map((component: any) => {
        return component;
      })}
    </StyledStatusBarContainer>
  );
};

export default StatusBar;

const DefaultWorldSelector = ({
  project,
  commsManager,
  api,
  baseWorld,
}: {
  project: string;
  commsManager: CommsManager | null;
  api: ExtraApi;
  baseWorld?: string;
}) => {
  const { warning, error } = useError();
  const [world, setWorld] = useState<string | undefined>(
    commsManager?.getWorld(),
  );

  const [worldList, setWorldList] = useState<string[]>([]);
  const wrnMsg =
    "Failed to connect with the Robotics Backend. Please make sure it is connected.";

  const resetWorld = (e: any) => {
    if (e.detail.state == states.IDLE) {
      setWorld(baseWorld);
    }
  };

  useEffect(() => {
    subscribe("CommsManagerStateChange", resetWorld);

    return () => {
      unsubscribe("CommsManagerStateChange", () => {});
    };
  }, []);

  useEffect(() => {
    if (commsManager) {
      console.log("Change World", commsManager.getWorld());
      setWorld(commsManager.getWorld());
    }
  }, [commsManager?.getWorld()]);

  useEffect(() => {
    const get_world_list = async () => {
      const list = await api.worlds.list(project);
      setWorldList(list);
    };
    get_world_list();
  }, [project]);

  useEffect(() => {
    if (baseWorld !== undefined) {
      selectWorld(baseWorld);
    }
  }, [baseWorld]);

  const terminateWorld = async () => {
    if (!commsManager) {
      warning(wrnMsg);
      return;
    }
    // Down the RB ladder
    await commsManager.terminateApplication();
    await commsManager.terminateTools();
    await commsManager.terminateWorld();
  };

  const launchWorld = async (world: string) => {
    if (!commsManager) {
      warning(wrnMsg);
      return;
    }

    if (project === "") {
      error("Failed to find the current project name.");
      return;
    }

    const worldConfig = await api.worlds.get_config(project, world);

    const tools = worldConfig.tools;
    const scene_config = worldConfig.scene;
    const robot_config = worldConfig.robot;

    const world_config = {
      name: world,
      scene: scene_config,
      robot: robot_config,
    };

    await commsManager.launchWorld(world_config);
    console.log("RB world launched!");
    await commsManager.prepareTools(tools, worldConfig.tools_config);
    console.log("Tools ready!");
  };

  const selectWorld = async (worldName: string) => {
    console.log(worldName);

    try {
      // Launch if new world selected
      if (worldName !== world) {
        if (world) await api.worlds.list(project);
        if (world) await terminateWorld();
        await launchWorld(worldName);
        console.log("Launch world successful");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Unable to retrieve world config: " + e.message);
        error("Unable to retrieve world config: " + e.message);
      }
    }
  };

  const checkManager = () => {
    if (commsManager === null || commsManager.getState() === "idle") {
      const msg =
        "The Robotics Backend is disconnected. Make sure to connect by clicking on the button at the top right corner.";
      error(msg);
      throw Error(msg);
    }
  };

  return (
    <DropdownStatusBar
      id="world-selector"
      title="world Selector"
      width={300}
      baseHeight={24}
      down={false}
      setter={selectWorld}
      onOpen={checkManager}
      possibleValues={worldList}
    >
      <label>
        {world
          ? `World: ${world}`
          : worldList.length === 0
            ? `No worlds to select`
            : "Click to select world"}
      </label>
    </DropdownStatusBar>
  );
};

const DefaultToolsSelector = ({ tools }: { tools: ViewersEntry[] }) => {
  const [tool, setTool] = useState<string | undefined>(undefined);

  const selectTools = (newTool: string) => {
    setTool(newTool);
    publish("changeToolGroup", { tool: newTool });
  };

  let toggleGroup = undefined;
  const groups: string[] = [];

  for (let index = 0; index < tools.length; index++) {
    const element = tools[index];
    if (element.group !== undefined) {
      if (groups.includes(element.group)) {
        toggleGroup = element.group;
      } else {
        groups.push(element.group);
      }
    }
  }

  const toggles = [];

  if (toggleGroup !== undefined) {
    for (let index = 0; index < tools.length; index++) {
      const element = tools[index];
      if (element.group === toggleGroup) {
        toggles.push(element.name);
      }
    }
  }

  return (
    <DropdownStatusBar
      id="tools-selector"
      title="Tools Selector"
      width={300}
      baseHeight={24}
      down={false}
      setter={selectTools}
      onOpen={() => {}}
      possibleValues={toggles}
    >
      <label>
        {toggles.length > 1
          ? `Tool: ${tool ? tool : toggles[0]}`
          : `No tools to select`}
      </label>
    </DropdownStatusBar>
  );
};

export const StatusBarCustomWorldSelector = ({
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
  const [world, setWorld] = useState<string | undefined>(
    commsManager?.getWorld(),
  );

  const statusText = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.primary,
  );

  const resetWorld = (e: any) => {
    if (e.detail.state == states.IDLE) {
      setWorld(undefined);
    }
  };

  useEffect(() => {
    subscribe("CommsManagerStateChange", resetWorld);

    return () => {
      unsubscribe("CommsManagerStateChange", () => {});
    };
  }, []);

  useEffect(() => {
    if (commsManager) {
      console.log("Change World", commsManager.getWorld());
      setWorld(commsManager.getWorld());
    }
  }, [commsManager?.getWorld()]);

  const terminateWorld = async () => {
    if (!commsManager) {
      warning(
        "Failed to connect with the Robotics Backend docker. Please make sure it is connected.",
      );
      return;
    }
    // Down the RB ladder
    await commsManager.terminateApplication();
    await commsManager.terminateTools();
    await commsManager.terminateWorld();
  };

  const launchWorld = async (world: string) => {
    if (!commsManager) {
      warning(
        "Failed to connect with the Robotics Backend docker. Please make sure it is connected.",
      );
      return;
    }

    if (project === "") {
      error("Failed to find the current project name.");
      return;
    }

    const worldConfig = await api.worlds.get_config(project, world);

    const tools = worldConfig.tools;

    if (!tools.includes("state_monitor")) {
      tools.push("state_monitor");
    }

    const scene_config = worldConfig.scene;
    const robot_config = worldConfig.robot;

    const world_config = {
      name: world,
      scene: scene_config,
      robot: robot_config,
    };

    await commsManager.launchWorld(world_config);
    console.log("RB world launched!");
    await commsManager.prepareTools(tools, worldConfig.tools_config);
    console.log("Tools ready!");
  };

  const selectWorld = async (worldName: string) => {
    console.log(worldName);
    setOpen(false);

    if (!worldName) return;

    try {
      // Launch if new world selected
      if (worldName !== world) {
        if (world) await api.worlds.list(project);
        if (world) await terminateWorld();
        await launchWorld(worldName);
        console.log("Launch world successful");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Unable to retrieve world config: " + e.message);
        error("Unable to retrieve world config: " + e.message);
      }
    }
  };

  return (
    <div>
      <StyledStatusBarEntry
        id="world-selector"
        title="world selector"
        onClick={() => setOpen(true)}
        text={statusText}
      >
        <label>{world ? `World: ${world}` : "Click to select world"}</label>
      </StyledStatusBarEntry>
      {open && (
        <components.worldSelector
          isOpen={open}
          onSelect={selectWorld}
          onClose={() => setOpen(false)}
          project={project}
        />
      )}
    </div>
  );
};
