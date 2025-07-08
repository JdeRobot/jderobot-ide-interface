import { useError, useTheme } from "Utils";
import { ErrorType } from "Types";
import {
  StyledModalError,
  StyledModalErrorRow,
  StyledModalErrorTitlebar,
} from "./ErrorModal.styles";
import { ModalRow } from "./Modal";

export type ErrorVariant = "error" | "warning" | "info";

const ErrorModal = () => {
  const theme = useTheme();
  const { isOpen, msg, type, close } = useError();

  var type_str: ErrorVariant = "error";
  var type_header = "Error";

  var onClose = () => close();

  switch (type) {
    case ErrorType.ERROR:
      type_str = "error";
      type_header = "Error";
      break;
    case ErrorType.ERROR_CRITICAL:
      type_str = "error";
      type_header = "Error";
      onClose = () => {
        document.location.href = "/apps";
      };
      break;
    case ErrorType.WARNING:
      type_str = "warning";
      type_header = "Warning";
      break;
    case ErrorType.INFO:
      type_str = "info";
      type_header = "Info";
      break;

    default:
      break;
  }

  return (
    <StyledModalError
      id={`${type_str}-modal`}
      isOpen={isOpen}
      onClose={onClose}
      variant={type_str}
      error={theme.palette.error}
      errorBorder={theme.palette.border.info}
      info={theme.palette.background}
      infoBorder={theme.palette.border.info}
      warning={theme.palette.warning}
      warningBorder={theme.palette.border.warning}
    >
      <StyledModalErrorTitlebar
        color={theme.palette.text}
        darkColor={theme.palette.text}
        title={type_header}
        htmlFor="actionName"
        variant={type_str}
      />
      <ModalRow>
        <StyledModalErrorRow
          roundness={theme.roundness}
          variant={type_str}
          errorButtonColor={theme.palette.button.error}
          errorHoverColor={theme.palette.button.hoverError}
          errorTextColor={theme.palette.text}
          infoButtonColor={theme.palette.button.info}
          infoHoverColor={theme.palette.button.hoverInfo}
          infoTextColor={theme.palette.text}
          warningButtonColor={theme.palette.button.warning}
          warningHoverColor={theme.palette.button.hoverWarning}
          warningTextColor={theme.palette.darkText}
        >
          <label id="errorMsg">{msg}</label>
        </StyledModalErrorRow>
      </ModalRow>
      <ModalRow>
        <StyledModalErrorRow
          roundness={theme.roundness}
          variant={type_str}
          errorButtonColor={theme.palette.button.error}
          errorHoverColor={theme.palette.button.hoverError}
          errorTextColor={theme.palette.text}
          infoButtonColor={theme.palette.button.info}
          infoHoverColor={theme.palette.button.hoverInfo}
          infoTextColor={theme.palette.text}
          warningButtonColor={theme.palette.button.warning}
          warningHoverColor={theme.palette.button.hoverWarning}
          warningTextColor={theme.palette.darkText}
        >
          <div onClick={() => onClose()}>Close</div>
        </StyledModalErrorRow>
      </ModalRow>
    </StyledModalError>
  );
};

export default ErrorModal;
