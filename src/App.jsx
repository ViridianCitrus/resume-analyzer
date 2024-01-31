import React from "react";
import PdfUploader from "./components/PdfUpload";
import { ResumeContext, useResumeContext } from "./context/ResumeContext";
import TextCompare from "./components/TextCompare";
import ResumeWordCloud from "./components/ResumeWordCloud";

function App() {
  return (
    <div className="font-raleway text-slate-950">
      <ResumeContext.Provider value={useResumeContext()}>
        <div className="flex items-center flex-col">
          <div className="text-5xl flex mt-12">
            Resume Analyzer Frontend Component
          </div>
          <p className="text-xl mt-5" >Created by: Kevin Wang</p>
        </div>
        <PdfUploader/>
        <TextCompare/>
        <ResumeWordCloud/>
      </ResumeContext.Provider>
    </div>
  );
}

export default App;
