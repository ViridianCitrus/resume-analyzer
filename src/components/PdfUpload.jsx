import React, { useContext, useEffect, useState } from "react";

import { ResumeContext } from "../context/ResumeContext";

import { pdfjs } from "react-pdf";
import keyword_extractor from "keyword-extractor";

const PdfUploader = () => {
  //Included as part of react-pdf library use
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });
  
  const [file, setFile] = useState(null);
  const [errMessage, setErrMessage] = useState("Please Upload A Resume");
  
  //Using context for the raw resume text, 
  const context = useContext(ResumeContext);
  const {resumeText, setResumeText, setKeywords, setKeywordsDupe} = context;
  
  //Updating the selected file on upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  
  const extractTextFromPDF = async () => {
    if (!file) return;
    try {
      // Load the PDF file
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      
      // Loop through each page to extract text content
      let textArray = [];
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item) => item.str).join(" ");
        textArray.push(text);
      };
      
      setResumeText(textArray.join("\n"));

      //Extracts keywords from the resume text with no duplicates
      setKeywords((keyword_extractor.extract(textArray.join("\n"), {
        language:"english",
        remove_digits: true,
        return_changed_case:true,
        remove_duplicates: true,
      })).map(word => word.replace(/[^\w\s]/g, '')));

      //Extracts keywords from the resume text with duplicates
      setKeywordsDupe((keyword_extractor.extract(textArray.join("\n"), {
        language:"english",
        remove_digits: true,
        return_changed_case:true,
        remove_duplicates: false,
      })).map(word => word.replace(/[^\w\s]/g, '')));

    } catch (error) {
      console.error("Error reading PDF file:", error);
      setErrMessage("Error reading PDF file")
    };
  };
  
  return (
    <div className="flex items-center flex-col pt-10">
      <div className="flex items-center flex-col border border-slate-900 rounded-lg p-5 text-lg">
        <input type="file" accept=".pdf" onChange={handleFileChange} className="bg-slate-200 rounded-lg p-5 border border-slate-500 border-dashed hover:bg-slate-300"/>
        <button onClick={extractTextFromPDF} className="bg-slate-700 text-white rounded-lg p-2 mt-4">Upload Resume</button>
      </div>
      <div className="pt-6 px-12 flex items-center flex-col">
        <div className="font-semibold text-2xl my-4">Extracted Resume Text</div>
        <div className="py-4 px-6 rounded border">{resumeText ? resumeText : <div className="text-slate-400 italic">{errMessage}</div>}</div>
      </div>
    </div>
    );
  };
  
  export default PdfUploader;