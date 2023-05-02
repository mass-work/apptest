import React from "react";
import styled from "styled-components";

const TextExtractor = ({ file }) => {
  console.log("txt");
  return (
    <TextContainer>
      {file.content.map((item, index) => (
        <div key={`${file.name}-${index}`}>{item}</div>
      ))}
    </TextContainer>
  );
};

export default TextExtractor;

const TextContainer = styled.div`
  white-space: pre-wrap;
`;
