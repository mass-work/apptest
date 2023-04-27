import React, { useState, useEffect, useCallback } from 'react';

const TextExtractor = ({ files, onFolderDataChange }) => {
  const [folderData, setFolderData] = useState([]);

  const updateFolderData = useCallback((newData) => {
    setFolderData(newData);
    onFolderDataChange(newData);
  }, [onFolderDataChange]);

  useEffect(() => {
    if (files.length === 0) {
      return;
    }

    const newFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let isDuplicate = false;
      let duplicateIndex = -1;

      for (let j = 0; j < folderData.length; j++) {
        if (folderData[j].name === file.name) {
          isDuplicate = true;
          duplicateIndex = j;
          break;
        }
      }
      if (isDuplicate) {
        folderData.splice(duplicateIndex, 1);
      }
      newFiles.push(file);
    }
    if (newFiles.length === 0) {
      return;
    }

    const handleNextFile = (fileIndex) => {
      if (fileIndex < newFiles.length) {
        const file = newFiles[fileIndex];
        const reader = new FileReader();
        reader.onload = (e) => {
          updateFolderData((prevData) => [
            ...prevData,
            { name: file.name, content: e.target.result.split('\n') },
          ]);
          handleNextFile(fileIndex + 1);
        };
        reader.readAsText(file);
      }
    };

    handleNextFile(0);
  }, [files, folderData, updateFolderData]);

  return (
    <div>
      {folderData.map((file, fileIndex) => (
        <div key={fileIndex}>
          <h4>{file.name}</h4>
          {file.content.map((item, index) => (
            <div key={`${fileIndex}-${index}`}>{item}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TextExtractor;
