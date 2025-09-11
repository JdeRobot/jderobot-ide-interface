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
import { ExtraApi, StatusBarComponents } from "Types";

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
  statusBarComponents: StatusBarComponents;
  viewers: ViewersEntry[];
  layout: Layout;
  options?: Options;
  splashIcon?: JSX.Element;
  baseFile?: Entry;
  baseUniverse?: string;
}

const IdeInterface = ({
  commsManager,
  resetManager,
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
}: IdeInterfaceProps) => {
  const theme = useTheme();

  var [currentFile, setCurrentFile] = useState<Entry | undefined>(baseFile);

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
                setCurrentFile={setCurrentFile}
                currentFile={currentFile}
                project={project}
                api={explorer}
              />
            ))}
          </ResizableColumn>
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
                options={options}
              />
            </StyledIdeContainer>
          </StyledIdeVertContainer>
          <StyledIdeVertContainer bgColor={theme.palette?.primary}>
            <StyledIdeContainer bgColor={theme.palette?.background}>
              <ViewersContainer viewers={viewers} splashIcon={splashIcon} />
            </StyledIdeContainer>
          </StyledIdeVertContainer>
        </ResizableLayout>
        <StatusBar
          project={project}
          commsManager={commsManager}
          resetManager={resetManager}
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
  const theme = useTheme();

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

  return (
    <>
      <StyledViewerMenu bgColor={theme.palette?.primary}>
        <StyledButtonsContainer>
          {viewers.map((viewer, index) => (
            <Button
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
          ))}
        </StyledButtonsContainer>
      </StyledViewerMenu>
      <CollapsableResizableColumn state={visibility} splashIcon={splashIcon}>
        {viewers.map((viewer) => viewer.component)}
      </CollapsableResizableColumn>
    </>
  );
};
