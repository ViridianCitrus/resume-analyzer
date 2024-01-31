import { createContext, useState } from 'react';

export const ResumeContext = createContext();

export const useResumeContext = () => {
  //Storing the extracted resume text
  const [resumeText, setResumeText] = useState(null);

  //Storing unique keywords from the resume
  const [keywords, setKeywords] = useState([]);

  //Storing all keyword instances from the resume, used for the wordcloud data format
  const [keywordsDupe, setKeywordsDupe] = useState([]);
  
  return { resumeText, setResumeText, keywords, setKeywords, keywordsDupe, setKeywordsDupe };
  
};