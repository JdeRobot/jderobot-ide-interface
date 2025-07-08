import { useState, useEffect, useRef } from "react";

import Modal, { ModalRow, ModalTitlebar } from "./Modal";
import { ProgressBar } from "Components";
import { useError, useTheme } from "Utils";
import { StyledModalDrop } from "./UploadModal.styles";

const UploadModal = ({
  onSubmit,
  isOpen,
  onClose,
  upload,
  location,
  currentProject,
}: {
  onSubmit: () => void;
  isOpen: boolean;
  onClose: Function;
  upload: Function;
  location: string;
  currentProject: string;
}) => {
  const theme = useTheme();
  const { error } = useError();

  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [dropActive, setDropActive] = useState<boolean>(false);

  const uploadInputRef = useRef<any>(null);
  const uploadAreaRef = useRef<any>(null);

  useEffect(() => {
    setUploadStatus("");
    setUploadPercentage(0);
    uploadInputRef.current.value = "";
  }, [isOpen]);

  const handleDrop = (event: any) => {
    event.preventDefault();
    uploadAreaRef.current.classList.remove("bt-drag-active");

    if (event.dataTransfer.files.length > 0) {
      uploadInputRef.current.files = event.dataTransfer.files;
      handleAcceptedFiles(uploadInputRef.current.files);
    }
  };

  const handleAcceptedFiles = async (files: FileList | null) => {
    // TODO: Redo for directory
    if (files) {
      handleZipFiles(Array.from(files));
    }
  };

  const handleZipFiles = async (file_array: File[]) => {
    // TODO: check if files are valid
    const n_files = file_array.length;
    var n_files_uploaded = 0;

    file_array.forEach((file: File, index: number) => {
      var reader = new FileReader();

      reader.onprogress = (data) => {
        if (data.lengthComputable) {
          const progress = Math.round((data.loaded / data.total) * 100);
          setUploadPercentage(progress * (n_files_uploaded / n_files));
        }
      };

      reader.onload = (e: any) => {
        const base64String = e.target.result.split(",")[1]; // Remove the data URL prefix
        try {
          upload(currentProject, location, file.name, base64String);
          console.log("Uploading file Completed");
        } catch (e) {
          if (e instanceof Error) {
            console.error("Error uploading file" + e.message);
            error("Error uploading file" + e.message);
          }
        }

        setUploadStatus("Uploaded");
        setUploadPercentage(100 * (n_files_uploaded / n_files));
      };

      reader.readAsDataURL(file);
      n_files_uploaded++;
    });

    onClose();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit();
  };

  const handleCancel = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    onClose();
  };

  return (
    <Modal
      id="upload-modal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onReset={handleCancel}
    >
      <ModalTitlebar
        title="Upload"
        htmlFor="uploadName"
        hasClose
        handleClose={(e: any) => {
          handleCancel(e);
        }}
      />
      <ModalRow>
        <StyledModalDrop
          ref={uploadAreaRef}
          htmlFor="uploadDropInput"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragEnter={() => setDropActive(true)}
          onDragLeave={() => setDropActive(false)}
          onDrop={(e) => handleDrop(e)}
          text={theme.palette.text}
          bgColor={theme.palette.background}
          buttonColor={theme.palette.primary}
          hoverColor={theme.palette.secondary}
          borderColor={theme.palette.primary}
          hoverBorderColor={theme.palette.background}
          roundness={theme.roundness}
          active={dropActive}
        >
          <span>Drop files here</span>
          or
          <input
            ref={uploadInputRef}
            id="uploadDropInput"
            onChange={(e) => handleAcceptedFiles(e.target.files)}
            type="file"
            title="Upload folder contents"
            multiple
            required
          />
        </StyledModalDrop>
      </ModalRow>
      {uploadStatus !== "" && <ProgressBar completed={uploadPercentage} />}
    </Modal>
  );
};

export default UploadModal;
