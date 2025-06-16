import { useError } from "Utils";
import { ErrorType } from "Types";
import "./ErrorModal.css";
import Modal from "./Modal";


const ErrorModal = () => {
  const { isOpen, msg, type, close } = useError();

  var type_str = "error";
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
    <Modal
      id={`${type_str}-modal`}
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="bt-modal-titlebar">
        <label
          className="bt-modal-titlebar-title"
          htmlFor="actionName"
          style={{ textAlign: "center" }}
        >
          {type_header}
        </label>
      </div>
      <div className="bt-form-row">
        <div className="bt-error-modal-buttons-container">
          <label className={`bt-modal-${type_str}-label`} id="errorMsg">
            {msg}
          </label>
        </div>
      </div>
      <div className="bt-form-row">
        <div className="bt-error-modal-buttons-container">
          <div
            className={`bt-${type_str}-modal-button`}
            onClick={() => onClose()}
          >
            Close
          </div>
        </div>
      </div>
    </Modal>
  );
};


export default ErrorModal;
