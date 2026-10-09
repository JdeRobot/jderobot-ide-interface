/* eslint-disable react/react-in-jsx-scope */
import { CommsManager } from "jderobot-commsmanager";
import { JSX, useEffect, useState } from "react";

import { Button, Explorer, FileEditor, StatusBar, StyledButtonsContainer } from "Components";
import { EditorsEntry, Entry, ExplorerEntry, ExtraSnippets, Layout, Options, ViewersEntry } from "Types";
import { OptionsProvider, publish, subscribe, unsubscribe, useTheme } from "Utils";

import { ExtraApi, StatusBarComponents } from "Types";
import { Group, useDefaultLayout } from "react-resizable-panels";
import {
  RoundedPanel,
  StyledHeadlessPanel,
  StyledIdeGrid,
  StyledMonocolorSplashIcon,
  StyledPanel,
  StyledSeparator,
  StyledSplashViewers,
  StyledViewerMenu,
  ToggleGroup
} from "./IdeInterface.styles";

export interface IdeInterfaceStyles {
  bgColor?: string;
}

interface IdeInterfaceProps {
  commsManager: CommsManager | null;
  project: string;
  explorers: ExplorerEntry[];
  api: ExtraApi;
  extraEditors: EditorsEntry[];
  statusBarComponents: StatusBarComponents;
  viewers: ViewersEntry[];
  layout: Layout;
  options?: Options;
  splashIcon?: JSX.Element;
  baseFile?: Entry;
  baseWorld?: string;
  extraSnippets?: ExtraSnippets;
  onCodeChange?: () => void;
}

const IdeInterface = ({
  commsManager,
  project,
  explorers,
  api,
  extraEditors,
  statusBarComponents,
  viewers,
  layout,
  options,
  splashIcon,
  baseFile,
  baseWorld,
  extraSnippets,
  onCodeChange,
}: IdeInterfaceProps) => {
  const theme = useTheme();
  const [currentFile, setCurrentFile] = useState<Entry | undefined>(baseFile);

  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: "main-layout-id",

    panelIds:
      layout === "both"
        ? ["explorers", "editor", "viewers"]
        : layout === "only-editor"
          ? ["explorers", "editor"]
          : ["explorers", "viewers"],

    storage: localStorage,
  });

  useEffect(() => {
    publish("currentFile", { file: currentFile });
  }, [currentFile]);

  if (splashIcon === undefined) {
    splashIcon = <StyledMonocolorSplashIcon color={theme.palette.primary} viewBox="0 0 200 200" />;
  }

  const Separator = <StyledSeparator bg={theme.palette?.primary} hover={theme.palette?.secondary} />;

  return (
    <OptionsProvider options={options}>
      <StyledIdeGrid id="styled-ide-container" bgColor={theme.palette?.primary}>
        <Group
          orientation="horizontal"
          style={{ gridArea: "content" }}
          defaultLayout={defaultLayout}
          onLayoutChanged={onLayoutChanged}
        >
          <StyledHeadlessPanel collapsible minSize="10%" defaultSize="20%" id="explorers">
            {explorers.map(explorer => (
              <Explorer
                key={explorer.name}
                setCurrentFile={setCurrentFile}
                currentFile={currentFile}
                project={project}
                api={explorer}
              />
            ))}
          </StyledHeadlessPanel>
          {Separator}
          {layout === "only-viewers" || (
            <>
              <StyledPanel minSize="25%" id="editor">
                <FileEditor
                  currentFile={currentFile}
                  changeCurrentFile={setCurrentFile}
                  currentProjectname={project}
                  autosave={true}
                  manager={commsManager}
                  api={api}
                  extraEditors={extraEditors}
                  splashIcon={splashIcon}
                  options={options}
                  extraSnippets={extraSnippets}
                  layout={layout}
                  onCodeChange={onCodeChange}
                />
              </StyledPanel>
            </>
          )}
          {layout === "both" && <>{Separator}</>}
          <ViewersContainer viewers={viewers} splashIcon={splashIcon} layout={layout} />
        </Group>
        <StatusBar
          project={project}
          viewers={viewers}
          commsManager={commsManager}
          extraComponents={statusBarComponents}
          api={api}
          baseWorld={baseWorld}
        />
      </StyledIdeGrid>
    </OptionsProvider>
  );
};

export default IdeInterface;

const ViewersContainer = ({
  viewers,
  splashIcon,
  layout,
}: {
  viewers: ViewersEntry[];
  splashIcon: JSX.Element;
  layout: Layout;
}) => {
  const theme = useTheme();
  const [visibility, setVisibility] = useState<boolean[]>(viewers.map(viewer => viewer.active));

  useEffect(() => {
    subscribe("changeToolGroup", changeToolInGroup);

    return () => {
      unsubscribe("changeToolGroup", () => { });
    };
  }, []);

  const changeToolInGroup = (e: any) => {
    setTool(e.detail.tool);
  };

  const toggleVisibility = (index: number) => {
    viewers[index].activate(!visibility[index]);
    setVisibility(
      visibility.map((state, i) => {
        if (index === i) {
          return !state;
        } else {
          return state;
        }
      }),
    );
  };

  let toggleGroup: string | undefined = undefined;
  const groups: string[] = [];

  for (let index = 0; index < viewers.length; index++) {
    const element = viewers[index];
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
    for (let index = 0; index < viewers.length; index++) {
      const element = viewers[index];
      if (element.group === toggleGroup) {
        toggles.push(element.name);
      }
    }
  } else {
    toggles.push(undefined);
  }

  const [tool, setTool] = useState<string | undefined>(toggles[0]);

  useEffect(() => {
    let isVisible = false;
    let newIndex = 0;

    const vis = visibility;

    if (toggleGroup === undefined) {
      return;
    }

    for (let index = 0; index < viewers.length; index++) {
      const element = viewers[index];
      if (element.group === toggleGroup) {
        if (visibility[index]) {
          isVisible = true;
          vis[index] = false;
          viewers[index].activate(false);
        }
        if (element.name === tool) {
          newIndex = index;
        }
      }
    }
    if (isVisible) {
      vis[newIndex] = true;
      viewers[newIndex].activate(true);
      setVisibility(
        visibility.map((state, i) => {
          return vis[i];
        }),
      );
    }
  }, [tool]);

  const Separator = (
    <StyledSeparator bg={theme.palette?.primary} hover={theme.palette?.secondary} orientation="horizontal" />
  );

  if (layout === "only-editor") {
    return <></>;
  }

  return (
    <StyledPanel minSize="25%" id="viewers">
      <StyledViewerMenu bgColor={theme.palette?.primary} style={{ gridArea: "header" }}>
        <StyledButtonsContainer>
          {viewers.map((viewer, i) => {
            if (toggleGroup === undefined || !(viewer.group === toggleGroup && viewer.name !== tool)) {
              return (
                <Button
                  key={`viewer${i}`}
                  active={visibility[i]}
                  variant="tab"
                  isLabel={false}
                  title={`Toggle ${viewer.name}`}
                  id={`${viewer.name}-toggle`}
                  onClick={() => toggleVisibility(i)}
                >
                  {viewer.icon}
                </Button>
              );
            }
          })}
        </StyledButtonsContainer>
      </StyledViewerMenu>
      <ToggleGroup orientation="vertical" style={{ gridArea: "content" }}>
        {viewers.map((viewer, i) => {
          if (toggleGroup === undefined || !(viewer.group === toggleGroup && viewer.name !== tool)) {
            return (
              <>
                <RoundedPanel id={visibility[i] ? viewer.name : `h-${viewer.name}`}>{viewer.component}</RoundedPanel>
                {
                  visibility[i] &&
                  <>
                    {i !== viewers.length - 1 && <>{Separator}</>}
                  </>
                }
              </>
            )
          }
        }
        )}
        {visibility.filter(Boolean).length === 0 && (
          <StyledSplashViewers bgColor={theme.palette.bg} roundness={theme.viewRoundness}>
            {splashIcon}
          </StyledSplashViewers>
        )}
      </ToggleGroup>
    </StyledPanel >
  );
};
