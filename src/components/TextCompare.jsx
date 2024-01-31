import React, { useCallback, useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import keyword_extractor from "keyword-extractor";
import * as Jaccard from "jaccard-index";

const TextCompare = () => {
  //using the Jaccard Index to compare similarity
  const jaccard = Jaccard()
  const [description, setDescription] = useState("");
  const [similarityScore, setSimilarityScore] = useState(0);
  
  const context = useContext(ResumeContext);
  const {keywords} = context;
  
  const compareText = useCallback(() => {
    const descriptionKeywords = keyword_extractor.extract(description, {
      language:"english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    })
    //Scaling the score based on the ratio between job description and resume keywords, displaying as a percentage to the nearest 2 decimals
    const score = jaccard.index(descriptionKeywords, keywords) * (Math.max(descriptionKeywords.length / keywords.length, keywords.length / descriptionKeywords.length))
    setSimilarityScore(Math.round(score*10000)/100);

  }, [description, keywords, jaccard]);



  return (
    <div className="flex items-center flex-col pt-10">
      <div className="font-semibold text-2xl my-4">
        Job Description Similarity
      </div>
      <textarea onChange={e => setDescription(e.target.value)} placeholder="Job description" className="py-4 px-6 rounded border w-5/6" rows={10}/>
      
      <div className="grid grid-cols-2 mt-4 gap-4">
        <button onClick={compareText} className="bg-slate-700 text-lg text-white rounded-lg p-2 text-wrap">Check Similarity Score</button>
        <div className="text-lg text-slate-700 rounded-lg border p-2 font-sans">{similarityScore + "%"}</div>  
      </div>
    </div>
  );
};

export default TextCompare