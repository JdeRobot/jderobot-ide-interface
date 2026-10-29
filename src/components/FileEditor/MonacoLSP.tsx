import { type RegisterLocalProcessExtensionResult } from '@codingame/monaco-vscode-api/extensions';
import { MonacoEditorReactComp } from '@typefox/monaco-editor-react';
import { configureDebugging } from 'monaco-languageclient/debugger';
import type { MonacoVscodeApiWrapper } from 'monaco-languageclient/vscodeApiWrapper';
import React from 'react';
import * as vscode from 'vscode';
import { createPythonAppConfig } from './config.js';

const FileEditor = () => {
  const appConfig = createPythonAppConfig();

  const onVscodeApiInitDone = async (apiWrapper: MonacoVscodeApiWrapper) => {
    const result = apiWrapper.getExtensionRegisterResult('mlc-python-example') as RegisterLocalProcessExtensionResult;
    await result.setAsDefaultApi();

    const initResult = apiWrapper.getExtensionRegisterResult('debugger-py-client') as RegisterLocalProcessExtensionResult | undefined;
    if (initResult !== undefined) {
      await configureDebugging(await initResult.getApi(), appConfig.configParams);
    }

    // await vscode.commands.executeCommand('workbench.view.explorer');
    await vscode.window.showTextDocument(appConfig.configParams.files.get('hello2.py')!.uri);
  };

  return (
    <MonacoEditorReactComp
      vscodeApiConfig={appConfig.vscodeApiConfig}
      editorAppConfig={appConfig.editorAppConfig}
      languageClientConfig={appConfig.languageClientConfig}
      style={{ height: '100%' }}
      onVscodeApiInitDone={onVscodeApiInitDone}
      onError={(e) => {
        console.error(e);
      }}
    />
  );
};

export default FileEditor;
