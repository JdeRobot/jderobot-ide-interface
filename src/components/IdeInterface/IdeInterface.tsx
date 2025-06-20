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
import { useTheme } from "Utils";
import {
  Entry,
  Layout,
  ExplorerEntry,
  EditorsEntry,
  ViewersEntry,
} from "Types";

import {
  StyledIdeContainer,
  StyledIdeHorizContainer,
  StyledIdeVertContainer,
  StyledMonocolorSplashIcon,
  StyledViewerMenu,
} from "./IdeInterface.styles";

export interface IdeInterfaceStyles {
  bgColor?: string;
}

interface IdeInterfaceProps {
  commsManager: CommsManager | null;
  resetManager: Function;
  project: string;
  explorers: ExplorerEntry[];
  editorApi: any;
  extraEditors: EditorsEntry[];
  viewers: ViewersEntry[];
  layout: Layout;
  options: any;
  splashIcon?: JSX.Element;
}

const IdeInterface = ({
  commsManager,
  resetManager,
  project,
  explorers,
  editorApi,
  extraEditors,
  viewers,
  layout,
  options,
  splashIcon,
}: IdeInterfaceProps) => {
  const [currentFile, setCurrentFile] = useState<Entry | undefined>(undefined);
  const theme = useTheme();

  if (splashIcon === undefined) {
    splashIcon = <StyledMonocolorSplashIcon color={theme.palette.primary} viewBox="0 0 200 200"/>;
  }

  return (
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
              api={editorApi}
              extraEditors={extraEditors}
              splashIcon={splashIcon}
            />
          </StyledIdeContainer>
        </StyledIdeVertContainer>
        <StyledIdeVertContainer bgColor={theme.palette?.primary}>
          <StyledIdeContainer bgColor={theme.palette?.background}>
            <ViewersContainer
              viewers={viewers}
              splashIcon={splashIcon}
              options={options}
            />
          </StyledIdeContainer>
        </StyledIdeVertContainer>
      </ResizableRow>
      <StatusBar
        project={project}
        commsManager={commsManager}
        resetManager={resetManager}
      />
    </StyledIdeHorizContainer>
  );
};

export default IdeInterface;

const ViewersContainer = ({
  viewers,
  splashIcon,
  options,
}: {
  viewers: ViewersEntry[];
  splashIcon: JSX.Element;
  options: any;
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
