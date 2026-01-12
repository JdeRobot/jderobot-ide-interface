import React, { useEffect } from "react";
import { useState } from "react";
import { CommsManager } from "jderobot-commsmanager";

import {
  StatusBar,
  Explorer,
  CollapsableResizableColumn,
  ResizableColumn,
  ResizableLayout,
  FileEditor,
  Button,
  StyledButtonsContainer,
} from "Components";
import { OptionsProvider, subscribe, unsubscribe, useTheme } from "Utils";
import {
  Entry,
  Layout,
  ExplorerEntry,
  EditorsEntry,
  ViewersEntry,
  Options,
  ExtraSnippets,
} from "Types";

import {
  StyledIdeContainer,
  StyledIdeHorizContainer,
  StyledIdeVertContainer,
  StyledMonocolorSplashIcon,
  StyledViewerMenu,
} from "./IdeInterface.styles";
import { ExtraApi, StatusBarComponents } from "Types";

export interface IdeInterfaceStyles {
  bgColor?: string;
}

interface IdeInterfaceProps {
  commsManager: CommsManager | null;
  connectManager: (
    desiredState?: string,
    callback?: () => void
  ) => Promise<void>;
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
  baseUniverse?: string;
  extraSnippets?: ExtraSnippets;
}

const IdeInterface = ({
  commsManager,
  connectManager,
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
  baseUniverse,
  extraSnippets,
}: IdeInterfaceProps) => {
  const theme = useTheme();

  const [currentFile, setCurrentFile] = useState<Entry | undefined>(baseFile);

  if (splashIcon === undefined) {
    splashIcon = (
      <StyledMonocolorSplashIcon
        color={theme.palette.primary}
        viewBox="0 0 200 200"
      />
    );
  }

  return (
    <OptionsProvider options={options}>
      <StyledIdeHorizContainer
        id="styled-ide-container"
        bgColor={theme.palette?.primary}
      >
        <ResizableLayout
          baseWidth={[20, 40, 40]}
          maxWidth={[40, 60, 60]}
          showExplorer={explorers.length > 0}
          layout={layout}
          splashIcon={splashIcon}
        >
          <ResizableColumn>
            {explorers.map((explorer) => (
              <Explorer
                key={explorer.name}
                setCurrentFile={setCurrentFile}
                currentFile={baseFile ? baseFile : currentFile}
                project={project}
                api={explorer}
              />
            ))}
          </ResizableColumn>
          <StyledIdeVertContainer bgColor={theme.palette?.primary}>
            <StyledIdeContainer bgColor={theme.palette?.primary}>
              <FileEditor
                currentFile={baseFile ? baseFile : currentFile}
                changeCurrentFile={setCurrentFile}
                currentProjectname={project}
                autosave={true}
                manager={commsManager}
                api={api}
                extraEditors={extraEditors}
                splashIcon={splashIcon}
                options={options}
                extraSnippets={extraSnippets}
              />
            </StyledIdeContainer>
          </StyledIdeVertContainer>
          <StyledIdeVertContainer bgColor={theme.palette?.primary}>
            <StyledIdeContainer bgColor={theme.palette?.primary}>
              <ViewersContainer viewers={viewers} splashIcon={splashIcon} />
            </StyledIdeContainer>
          </StyledIdeVertContainer>
        </ResizableLayout>
        <StatusBar
          project={project}
          viewers={viewers}
          commsManager={commsManager}
          connectManager={connectManager}
          extraComponents={statusBarComponents}
          api={api}
          baseUniverse={baseUniverse}
        />
      </StyledIdeHorizContainer>
    </OptionsProvider>
  );
};

export default IdeInterface;

const ViewersContainer = ({
  viewers,
  splashIcon,
}: {
  viewers: ViewersEntry[];
  splashIcon: JSX.Element;
}) => {
  const [visibility, setVisibility] = useState<boolean[]>(
    viewers.map((viewer) => viewer.active)
  );

  console.log("AA",visibility, viewers.map((viewer) => viewer.active))
  const theme = useTheme();

  useEffect(() => {
    subscribe("changeToolGroup", changeToolInGroup);

    return () => {
      unsubscribe("changeToolGroup", () => {});
    };
  }, []);

  const changeToolInGroup = (e: any) => {
    setTool(e.detail.tool);
  };

  const toggleVisibility = (index: number) => {
    setVisibility(
      visibility.map((state, i) => {
        if (index === i) {
          return !state;
        } else {
          return state;
        }
      })
    );
  };

  let toggleGroup = undefined;
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
      return
    }


    for (let index = 0; index < viewers.length; index++) {
      const element = viewers[index];
      if (element.group === toggleGroup) {
        if (visibility[index]) {
          isVisible = true;
          vis[index] = false;
        }
        if (element.name === tool) {
          newIndex = index;
        }
      }
    }
    if (isVisible) {
      vis[newIndex] = true;
      setVisibility(
        visibility.map((state, i) => {
          return vis[i];
        })
      );
    }
  }, [tool]);

  const visible = [];

  for (let index = 0; index < viewers.length; index++) {
    const element = viewers[index];
    if (visibility[index]) {
      visible.push(element.component);
    }
  }

  console.log(visibility, visible, viewers.map((viewer) => viewer.active))

  return (
    <>
      <StyledViewerMenu bgColor={theme.palette?.primary}>
        <StyledButtonsContainer>
          {viewers.map((viewer, index) => {
            if (toggleGroup === undefined) {
              return (
                <Button
                  key={`viewer${index}`}
                  active={visibility[index]}
                  variant="tab"
                  iconType="fill"
                  isLabel={false}
                  title={`Toggle ${viewer.name}`}
                  id={`${viewer.name}-toggle`}
                  onClick={() => toggleVisibility(index)}
                >
                  {viewer.icon}
                </Button>
              );
            }

            if (!(viewer.group === toggleGroup && viewer.name !== tool)) {
              return (
                <Button
                  key={`viewer${index}`}
                  active={visibility[index]}
                  variant="tab"
                  iconType="fill"
                  isLabel={false}
                  title={`Toggle ${viewer.name}`}
                  id={`${viewer.name}-toggle`}
                  onClick={() => toggleVisibility(index)}
                >
                  {viewer.icon}
                </Button>
              );
            }
          })}
        </StyledButtonsContainer>
      </StyledViewerMenu>
      <CollapsableResizableColumn splashIcon={splashIcon}>
        {visible}
      </CollapsableResizableColumn>
    </>
  );
};
