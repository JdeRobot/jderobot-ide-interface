import { useState } from "react";
import { CommsManager } from "jderobot-commsmanager";

import {
  StatusBar,
  Explorer,
  CollapsableResizableColumn,
  ResizableColumn,
  ResizableRow,
  FileEditor,
  Button,
  StyledButtonsContainer,
} from "Components";
import { OptionsProvider, useTheme } from "Utils";
import {
  Entry,
  Layout,
  ExplorerEntry,
  EditorsEntry,
  ViewersEntry,
  Options,
} from "Types";

import {
  StyledIdeContainer,
  StyledIdeHorizContainer,
  StyledIdeVertContainer,
  StyledMonocolorSplashIcon,
  StyledViewerMenu,
} from "./IdeInterface.styles";
import { ExtraApi } from "src/types/fileTypes";

export interface IdeInterfaceStyles {
  bgColor?: string;
}

interface IdeInterfaceProps {
  commsManager: CommsManager | null;
  resetManager: Function;
  project: string;
  explorers: ExplorerEntry[];
  api: ExtraApi;
  extraEditors: EditorsEntry[];
  viewers: ViewersEntry[];
  layout: Layout;
  options?: Options;
  splashIcon?: JSX.Element;
}

const IdeInterface = ({
  commsManager,
  resetManager,
  project,
  explorers,
  api,
  extraEditors,
  viewers,
  layout,
  options,
  splashIcon,
}: IdeInterfaceProps) => {
  const [currentFile, setCurrentFile] = useState<Entry | undefined>(undefined);
  const theme = useTheme();

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
        <ResizableRow
          baseWidth={[20, 40, 40]}
          maxWidth={[40, 60, 60]}
          showExplorer={explorers.length > 0}
          layout={layout}
          splashIcon={splashIcon}
        >
          {explorers.length > 0 && (
            <ResizableColumn>
              {explorers.map((explorer) => (
                <Explorer
                  setCurrentFile={setCurrentFile}
                  currentFile={currentFile}
                  project={project}
                  api={explorer}
                />
              ))}
            </ResizableColumn>
          )}
          <StyledIdeVertContainer bgColor={theme.palette?.primary}>
            <StyledIdeContainer bgColor={theme.palette?.background}>
              <FileEditor
                currentFile={currentFile}
                changeCurrentFile={setCurrentFile}
                currentProjectname={project}
                autosave={true}
                manager={commsManager}
                api={api}
                extraEditors={extraEditors}
                splashIcon={splashIcon}
              />
            </StyledIdeContainer>
          </StyledIdeVertContainer>
          <StyledIdeVertContainer bgColor={theme.palette?.primary}>
            <StyledIdeContainer bgColor={theme.palette?.background}>
              <ViewersContainer viewers={viewers} splashIcon={splashIcon} />
            </StyledIdeContainer>
          </StyledIdeVertContainer>
        </ResizableRow>
        <StatusBar
          project={project}
          commsManager={commsManager}
          resetManager={resetManager}
          api={api}
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
    Array(viewers.length).fill(false),
  );
  const theme = useTheme();

  const toggleVisibility = (index: number) => {
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

  return (
    <>
      <StyledViewerMenu bgColor={theme.palette?.primary}>
        <StyledButtonsContainer>
          {viewers.map((viewer, index) => (
            <Button
              active={visibility[index]}
              variant="tab"
              iconType="fill"
              title={`Toggle ${viewer.name}`}
              id={`${viewer.name}-toggle`}
              onClick={() => toggleVisibility(index)}
            >
              {viewer.icon}
            </Button>
          ))}
        </StyledButtonsContainer>
      </StyledViewerMenu>
      <CollapsableResizableColumn state={visibility} splashIcon={splashIcon}>
        {viewers.map((viewer) => viewer.component)}
      </CollapsableResizableColumn>
    </>
  );
};
