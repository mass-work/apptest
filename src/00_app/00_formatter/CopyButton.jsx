import React from 'react';
import styled from "styled-components";

const CopyButton = ({ inputPrompt, summaryText, folderData, selectedPdfs, setCopyStatus }) => {
  const handleCopyClick = async () => {
    const textToCopy = [
      inputPrompt || summaryText,
      folderData.map((file) => `${file.name}\n${file.content.join('\n')}`),
      selectedPdfs.map(async (pdfFile) => {
        const pdfTextExtractor = document.getElementById(`pdfTextExtractor-${pdfFile.name}`);
        const textWrapper = pdfTextExtractor.querySelector('div');
        return `${pdfFile.name}\n${textWrapper.textContent}`;
      }),
    ];

    const resolvedTextToCopy = await Promise.all(textToCopy.flat());
    navigator.clipboard.writeText(resolvedTextToCopy.join('\n\n')).then(() => {
      setCopyStatus('copied!');
      setTimeout(() => setCopyStatus(''), 1500);
    });
  };

  return (
    <ItemContainer>
      <Button onClick={handleCopyClick}>Copy</Button>
    </ItemContainer>
  );
};

export default CopyButton;

const ItemContainer = styled.div``;

const Button = styled.button`
  padding: 0.4rem;
  border: none;
  background-color: #292929;
  color: #eee;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #4f4f4f;
  }
`;
