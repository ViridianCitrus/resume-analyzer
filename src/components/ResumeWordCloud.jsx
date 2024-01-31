import React, { useEffect, useRef, useContext } from "react";
import WordCloud from "wordcloud";
import { ResumeContext } from "../context/ResumeContext";

const ResumeWordCloud = () => {
  const canvasRef = useRef(null);

  const context = useContext(ResumeContext);
  const {keywordsDupe} = context;

  useEffect(() => {
      if(canvasRef.current){
        if (keywordsDupe){
        const cloudMap = new Map();
        //Reformat keywords into compatible array
        keywordsDupe.forEach((word) => {
          cloudMap.set(word, (cloudMap.get(word) || 0) + 1);
        });
        const keyWordList = Array.from(cloudMap).map(([word, count]) => [word, count]);
      
      //Generate WordCloud Display
      WordCloud(canvasRef.current, {
        list: keyWordList,
        weightFactor: 12,
        shape: "circle",

      });
    };
    }
  }, [keywordsDupe]);


  return(
    <div className="flex items-center flex-col pt-10">
      <div className="font-semibold text-2xl my-4">
        Word Cloud
      </div>
      <div className="mb-12 border">
        <canvas ref={canvasRef} height={500} width={800}/>
      </div>
    </div>
  );
};

export default ResumeWordCloud