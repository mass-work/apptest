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

    let totalFileSize = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      totalFileSize += file.size;
      if (file.type === "application/pdf") {
        pdfFiles.push(file);
      } else {
        textFiles.push(file);
      }
    }

    if (totalFileSize > 5 * 1024 * 1024) {
      // 5MB以下の合計ファイルサイズに制限
      alert("合計ファイルサイズが5MBを超えています");
    } else {
      if (pdfFiles.length > 0) {
        setSelectedPdfs(pdfFiles);
        setFolderData([]);
      } else {
        setSelectedPdfs([]);
      }

      readFiles(textFiles, setFolderData);
    }
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
      <InputContainer type="file" ref={fileInput} onClick={resetFileInput} onChange={handleFolderSelect} multiple />
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
        setData((prevData) => [...prevData, { name: file.name, content: e.target.result.split("\n") }]);
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
          <FileTitle>{file.name}</FileTitle>
          <FileContents>
            {file.type === "application/pdf" ? <PdfTextExtractor file={file} /> : <TextExtractor file={file} />}
          </FileContents>
        </FileContainer>
      ))}
    </>
  );
};

export default FolderSelect;

const FolderContainer = styled.div``;

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
    font-weight: 700;
    content: "テキスト / PDFファイルを読込";
    display: inline-block;
    background-color: rgb(40, 40, 40);
    color: rgb(210, 210, 210);
    border-radius: 5px;
    padding: 0.4rem;
    cursor: pointer;
  }
`;
const FileTitle = styled.div`
  color: rgb(230, 230, 230);
  margin: 2px;
  font-size: 1.2rem;
  font-weight: 700;
`;
const FileContents = styled.div`
  padding: 5px 10px;
`;
const FileContainer = styled.div`
  margin-top: 1rem;
  background-color: rgb(40, 40, 40);
  padding: 2px 5px;
  border-radius: 5px;
`;
