import Header from "./componets/Header";
import "./App.css";
import Chatcontainer from "./componets/Chatcontainer";
import { useState } from "react";

function App() {
  const [file, setfile] = useState(null);
  const [fileid, setfileid] = useState(null);
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header setfile={setfile} setfileid={setfileid} />
      {(() => {
        console.log(fileid, " app ke andr fileid");
        return null;
      })()}
      <Chatcontainer fileid={fileid} />

      <main className="flex-1 overflow-y-auto p-4"></main>
    </div>
  );
}

export default App;
