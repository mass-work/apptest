import React, { useState } from "react";
import styled from "styled-components";

const CopyButton = ({ inputPrompt, summaryText, folderData, selectedPdfs }) => {
  const [copyStatus, setCopyStatus] = useState("");

  const handleCopyClick = async () => {
    const textToCopy = [
      inputPrompt || summaryText,
      folderData.map((file) => `${file.name}\n${file.content.join("\n")}`),
      selectedPdfs.map(async (pdfFile) => {
        const pdfTextExtractor = document.getElementById(`pdfTextExtractor-${pdfFile.name}`);
        const textWrapper = pdfTextExtractor.querySelector("div");
        return `${pdfFile.name}\n${textWrapper.textContent}`;
      }),
    ];

    const resolvedTextToCopy = await Promise.all(textToCopy.flat());
    navigator.clipboard.writeText(resolvedTextToCopy.join("\n\n")).then(() => {
      setCopyStatus("copied!");
      setTimeout(() => setCopyStatus(""), 1500);
    });
  };

  return (
    <ItemContainer>
      <Button onClick={handleCopyClick}>COPY</Button> (プロンプト、テキスト、PDFデータをクリップボードにコピー)
      <CopyStatus>{copyStatus}</CopyStatus>
    </ItemContainer>
  );
};
export default CopyButton;

const ItemContainer = styled.div`
  padding-bottom: 1rem;
`;

const Button = styled.button`
  font-weight: 700;
  padding: 0.4rem;
  border: none;
  background-color: rgb(40, 40, 40);
  color: rgb(210, 210, 210);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgb(60, 60, 60);
  }
`;

const CopyStatus = styled.span`
  margin-left: 1rem;
`;
