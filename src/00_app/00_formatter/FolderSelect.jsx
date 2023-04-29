import React, { useState, useRef } from "react";
import styled from "styled-components";
import PdfTextExtractor from "./PdfTextExtractor";
import TextExtractor from "./TextExtractor";

const FolderSelect = (props) => {
  const [folderData, setFolderData] = useState([]);
  const [selectedPdfs, setSelectedPdfs] = useState([]);
  const fileInput = useRef(null);

  const handleFolderSelect = (event) => {
    const files = event.target.files;
    if (files.length === 0) {
      return;
    }

    const pdfFiles = [];
    const textFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === "application/pdf") {
        pdfFiles.push(file);
      } else {
        textFiles.push(file);
      }
    }

    if (pdfFiles.length > 0) {
      setSelectedPdfs(pdfFiles);
      setFolderData([]);
    } else {
      setSelectedPdfs([]);
    }

    readFiles(textFiles, setFolderData);
  };

  const resetFileInput = () => {
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  props.setFolderData(folderData);
  props.setSelectedPdfs(selectedPdfs);

  return (
    <FolderContainer>
      <InputContainer
        type="file"
        ref={fileInput}
        onClick={resetFileInput}
        onChange={handleFolderSelect}
        multiple
      />
      <FileList files={[...folderData, ...selectedPdfs]} />
    </FolderContainer>
  );
};

const readFiles = (files, setData) => {
  if (files.length === 0) return;

  setData([]);
  const newFiles = files.slice();

  const readFile = (fileIndex) => {
    if (fileIndex < newFiles.length) {
      const file = newFiles[fileIndex];
      const reader = new FileReader();
      reader.onload = (e) => {
        setData((prevData) => [
          ...prevData,
          { name: file.name, content: e.target.result.split("\n") },
        ]);
        readFile(fileIndex + 1);
      };
      reader.readAsText(file);
    }
  };

  readFile(0);
};

const FileList = ({ files }) => {
  return (
    <>
      {files.map((file, fileIndex) => (
        <FileContainer key={fileIndex}>
          <h4>{file.name}</h4>
          {file.type === "application/pdf" ? (
            <PdfTextExtractor file={file} />
          ) : (
            <TextExtractor file={file} />
          )}
        </FileContainer>
      ))}
    </>
  );
};

export default FolderSelect;

const FolderContainer = styled.div`
  margin-top: 1rem;
`;

const InputContainer = styled.input`
  border-radius: 5px;
  color: transparent;
  &:hover {
    cursor: pointer;
  }
  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  &::before {
    content: "ファイルを選択";
    display: inline-block;
    background: #292929;
    color: white;
    border-radius: 5px;
    padding: 8px 16px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    cursor: pointer;
  }
`;

const FileContainer = styled.div`
  margin-top: 1rem;
  background-color: #292929;
  color: white;
  padding: 4px 16px;
  border-radius: 10px;
`;
