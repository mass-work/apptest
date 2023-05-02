import React, { useState } from "react";
import styled from "styled-components";
import ItemSelect from "./ItemSelect";
import SummaryInput from "./SummaryInput";
import CopyButton from "./CopyButton";
import FolderSelect from "./FolderSelect";
import Footer from "./Footer";
import ImageTextExtractor from "./ImageTextExtractor";

const ChatGPTTempCreate = () => {
  const [folderData, setFolderData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("プログラミング(修正)");
  const [summaryText, setSummaryText] = useState("");
  const [inputPrompt, setInputPrompt] = useState("");
  const [selectedPdfs, setSelectedPdfs] = useState([]);

  const handleItemSelect = (e) => {
    setSelectedItem(e.target.value);
    setSummaryText("");
  };

  return (
    <AppContainer>
      <Title>
        <img src={process.env.PUBLIC_URL + "/formatterIcon.jpg"} alt="icon" />
        Formatter
      </Title>
      <FormContainer>
        <FormItemContainer>
          <ItemSelect value={selectedItem} onChange={handleItemSelect} />
          <SummaryInput
            value={summaryText}
            setInputPrompt={setInputPrompt}
            onChange={(e) => setSummaryText(e.target.value)}
            selectedItem={selectedItem}
          />
          <CopyButton
            inputPrompt={inputPrompt}
            summaryText={summaryText}
            folderData={folderData}
            selectedPdfs={selectedPdfs}
          />
          <FolderSelect setFolderData={setFolderData} setSelectedPdfs={setSelectedPdfs} />
          <ImageTextExtractor />
        </FormItemContainer>
      </FormContainer>

      <Footer />
    </AppContainer>
  );
};

export default ChatGPTTempCreate;

const AppContainer = styled.div`
  background-color: rgb(20, 20, 20);
  color: rgb(210, 210, 210);
  padding: 5px;
  height: 100%;
  font-family: "Noto Sans JP";
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-left: 0.5rem;
    height: 3rem;
    width: 3rem;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormItemContainer = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
`;
