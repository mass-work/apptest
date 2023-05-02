import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import styled from "styled-components";

const ImageTextExtractor = () => {
  const [images, setImages] = useState([]);
  const [ocrResult, setOcrResult] = useState([]);
  const [imgRecognitionText, setImgRecognitionText] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const handleImageUpload = (event) => {
    ocrSimulate("画像認識中・・・");
    const files = event.target.files;
    if (files.length === 0) {
      ocrSimulate("");
      return;
    }
    const imgFiles = [];
    let nonImageFileFound = false;
    let totalFileSize = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        totalFileSize += file.size;
      } else {
        nonImageFileFound = true;
      }
    }

    if (totalFileSize > 5 * 1024 * 1024) {
      // 5MB以下の合計ファイルサイズに制限
      alert("合計ファイルサイズが5MBを超えています");
      ocrSimulate("");
    } else {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          imgFiles.push({ url: URL.createObjectURL(file), name: file.name });
        }
      }
    }

    if (nonImageFileFound) {
      ocrSimulate("画像ファイルではありません");
    }
    setImages(imgFiles);
    setOcrResult([]);
  };

  useEffect(() => {
    const recognizeText = async () => {
      try {
        const results = await Promise.all(
          images.map((image) => Tesseract.recognize(image.url, "eng+jpn", { oem: 2, psm: 6 }))
        );
        const texts = results.map((result, index) => ({
          name: images[index].name,
          text: result.data.text,
        }));
        setOcrResult(texts);
        ocrSimulate("");
      } catch (err) {
        console.error(err);
      }
    };
    if (images.length > 0) {
      recognizeText();
    }
  }, [images]);

  const ocrSimulate = (recognitionText) => {
    setImgRecognitionText(recognitionText);
  };

  const handleCopyClick = () => {
    const textToCopy = ocrResult.map((result) => `${result.name}\n${result.text}`);
    navigator.clipboard.writeText(textToCopy.join("\n\n")).then(() => {
      setCopyStatus("copied!");
      setTimeout(() => setCopyStatus(""), 1500);
    });
  };

  return (
    <OcrContainer>
      ----------------------------------------
      <h3>ImgToText（画像から文字抽出）</h3>
      <ButtonContainer>
        <Button onClick={handleCopyClick}>COPY</Button> (画像ファイルから抽出したデータをクリップボードにコピー)
        <CopyStatus>{copyStatus}</CopyStatus>
      </ButtonContainer>
      <div>{imgRecognitionText}</div>
      <InputContainer type="file" onChange={handleImageUpload} multiple />
      {ocrResult.length > 0 &&
        ocrResult.map((result, index) => (
          <OutputContainer key={index}>
            <div>
              <FileTitle>{result.name}</FileTitle>
              <ImgContainer>
                <img src={images[index].url} alt={`Selected ${index + 1}`} width={"100%"} />
              </ImgContainer>
              <FileContents>{result.text}</FileContents>
            </div>
          </OutputContainer>
        ))}
    </OcrContainer>
  );
};

export default ImageTextExtractor;

const OcrContainer = styled.div`
  padding: 1rem 0rem;
`;
const OutputContainer = styled.div`
  margin-top: 1rem;
  background-color: rgb(40, 40, 40);
  border-radius: 5px;
  padding: 5px 10px;
`;
const ImgContainer = styled.div`
  padding: 1%;
`;
const FileContents = styled.div`
  padding: 5px 10px;
  white-space: pre-wrap;
`;
const FileTitle = styled.div`
  color: rgb(230, 230, 230);
  margin: 2px;
  font-size: 1.2rem;
  font-weight: 700;
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
    font-weight: 700;
    content: "画像ファイルを読込";
    display: inline-block;
    background-color: rgb(40, 40, 40);
    color: rgb(210, 210, 210);
    border-radius: 5px;
    padding: 0.4rem;
    cursor: pointer;
  }
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
const ButtonContainer = styled.div`
  padding-bottom: 1rem;
`;
