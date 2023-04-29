// TextExtractor.jsx
import React from "react";

const TextExtractor = ({ file }) => {
  return (
    <div>
      {file.content.map((item, index) => (
        <div key={`${file.name}-${index}`}>{item}</div>
      ))}
    </div>
  );
};

export default TextExtractor;
