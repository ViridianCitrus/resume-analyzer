import { createContext, useState } from 'react';


export const ResumeContext = createContext();

export const useResumeContext = () => {
  const [resumeText, setResumeText] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [keywordsDupe, setKeywordsDupe] = useState([]);
  
  return { resumeText, setResumeText, keywords, setKeywords, keywordsDupe, setKeywordsDupe };
  
};