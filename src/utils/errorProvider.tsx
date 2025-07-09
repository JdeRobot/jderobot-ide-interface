import { createContext, useContext, useState } from "react";
import ErrorModal from "src/components/Modals/ErrorModal";
import { Error, ErrorType } from "Types";

const ErrorContext = createContext<Error>({
  isOpen: false,
  msg: "",
  type: ErrorType.ERROR,
  error: (msg: string) => {},
  error_critical: (msg: string) => {},
  warning: (msg: string) => {},
  info: (msg: string) => {},
  close: () => {},
});

export const ErrorProvider = ({ children }: { children: any }) => {
  const [isOpen, open] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [type, setType] = useState<ErrorType>(ErrorType.ERROR);

  const showError = (msg: string) => {
    setMsg(msg);
    setType(ErrorType.ERROR);
    open(true);
  };

  const showErrorCritical = (msg: string) => {
    setMsg(msg);
    setType(ErrorType.ERROR_CRITICAL);
    open(true);
  };

  const showWarning = (msg: string) => {
    setMsg(msg);
    setType(ErrorType.WARNING);
    open(true);
  };

  const showInfo = (msg: string) => {
    setMsg(msg);
    setType(ErrorType.INFO);
    open(true);
  };

  const close = () => {
    open(false);
  };

  const context: Error = {
    isOpen: isOpen,
    msg: msg,
    type: type,
    error: (msg: string) => showError(msg),
    error_critical: (msg: string) => showErrorCritical(msg),
    warning: (msg: string) => showWarning(msg),
    info: (msg: string) => showInfo(msg),
    close: () => close(),
  };

  return (
    <ErrorContext.Provider value={context}>
      {children}
      <ErrorModal />
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
