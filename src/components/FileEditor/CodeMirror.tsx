/* eslint-disable react/react-in-jsx-scope */
import { python } from "@codemirror/lang-python";
import { languageServerExtensions, LSPClient, Transport } from "@codemirror/lsp-client";
import { Compartment, EditorState } from "@codemirror/state";
import { customSearchKeymap, vscodeSearch } from '@rigstech/codemirror-vscodesearch';
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { basicSetup } from "codemirror";
import "./a.css";

import CodeMirror, { keymap } from "@uiw/react-codemirror";
import { useRef, useState } from "react";

function simpleWebSocketTransport(uri: string): Promise<Transport> {
  let handlers: ((value: string) => void)[] = []
  let sock = new WebSocket(uri)
  sock.onmessage = e => { for (let h of handlers) h(e.data.toString()) }
  return new Promise(resolve => {
    sock.onopen = () => resolve({
      send(message: string) { sock.send(message) },
      subscribe(handler: (value: string) => void) { handlers.push(handler) },
      unsubscribe(handler: (value: string) => void) { handlers = handlers.filter(h => h != handler) }
    })
  })
}

function App() {
  const [a, setA] = useState(false);
  const clientRef = useRef(null);
  const language = new Compartment(),
    tabSize = new Compartment();

  simpleWebSocketTransport("ws://localhost:7163/py_server/").then((transport) => {
    clientRef.current = new LSPClient({ extensions: languageServerExtensions() }).connect(transport)
    setA(true)
  })

  if (!a || clientRef === null) {
    return <div></div>
  }

  return (
    <CodeMirror
      value={"import numpy"}
      theme={vscodeDark}
      extensions={[
        basicSetup,
        language.of(python()),
        tabSize.of(EditorState.tabSize.of(8)),
        vscodeSearch,
        keymap.of([
          // Your other keymaps...
          ...customSearchKeymap
        ]),
        clientRef.current.plugin("file:///some/file.ts", "python")
      ]}
      style={{ height: "100%" }}
    />
  );
}
export default App;
