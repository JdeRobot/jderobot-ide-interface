import React from "react";
import { useState, useEffect, useRef } from "react";

import Modal, { ModalInputDropArea, ModalRow, ModalTitlebar } from "./Modal";
import { ProgressBar } from "Components";
import { useError } from "Utils";

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
  const { error } = useError();

  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

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
    let n_files_uploaded = 0;

    file_array.forEach((file: File) => {
      const reader = new FileReader();

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
        <ModalInputDropArea
          areaRef={uploadAreaRef}
          inputRef={uploadInputRef}
          id="uploadDropInput"
          dropTitle="Drop files here"
          onChange={(e) => handleAcceptedFiles(e.target.files)}
          onDrop={handleDrop}
          type="file"
          multiple
          required
        />
      </ModalRow>
      {uploadStatus !== "" && <ProgressBar completed={uploadPercentage} />}
    </Modal>
  );
};

export default UploadModal;
