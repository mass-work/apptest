import React, { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";
import styled from "styled-components";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfTextExtractor = ({ file }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (file) {
      extractTextFromPdf(file);
    } else {
      setText("");
    }
  }, [file]);

  const extractTextFromPdf = async (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const pdfData = event.target.result;
      const loadingTask = pdfjs.getDocument({ data: pdfData });

      try {
        const pdf = await loadingTask.promise;
        let fullText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          fullText += `${pageText}\n\n`;
        }

        setText(fullText);
      } catch (err) {
        console.error("Error during text extraction:", err);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div id={`pdfTextExtractor-${file.name}`}>
      <TextWrapper>{text}</TextWrapper>
    </div>
  );
};

export default PdfTextExtractor;

const TextWrapper = styled.div`
  white-space: pre-wrap;
`;
