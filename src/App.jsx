import "./App.css";
import ControlPanel from "./components/ControlPanel";
import RequestMonitor from "./components/RequestMonitor";
import RequestBuilder from "./components/RequestBuilder";
import RequestInspector from "./components/RequestInspector";
import { useState } from "react";
import SavedRequestsPanel from "./components/SavedRequestsPanel";
import Toast from "./components/Toast";

function App() {
  const [showSaved, setShowSaved] = useState(false);

  return (
    <div className="h-screen bg-surface text-body flex flex-col overflow-hidden">
      <div className="h-0.5 bg-acid shrink-0" />

      <header className="flex items-center justify-between border-b border-muted shrink-0 px-4 py-2">
        <div className="flex flex-row items-center gap-3">
          <img src="/faultlens.svg" alt="FaultLens" className="h-8" />
          <h1 className="text-4xl md:text-5xl leading-none tracking-wide text-body font-display">
            Fault<span className="text-acid">Lens</span>
          </h1>
        </div>
        <button
          onClick={() => setShowSaved(true)}
          className="px-2 py-1.5 border border-acid text-[18px] text-acid font-mono cursor-pointer"
        >
          SAVED REQUESTS
        </button>
      </header>

      <div className="flex-1 relative overflow-hidden flex justify-center items-start mt-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,255,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,255,0,0.04) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 h-full w-full flex justify-center">
          <RequestBuilder />
        </div>
      </div>

      <div className="h-64 md:h-82 border-t border-border flex shrink-0">
        <div className="w-1/3 border-r border-border flex flex-col min-w-0">
          <div className="px-4 py-1.5 border-b border-border flex justify-between items-baseline shrink-0 bg-[#0d1314]">
            <span className="text-sm md:text-base tracking-wider text-body truncate font-display">
              Control Panel
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <ControlPanel />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-4 py-1.5 border-b border-border flex justify-between items-baseline shrink-0 bg-[#0d1314]">
            <span className="text-sm md:text-base tracking-wider text-body truncate font-display">
              Request Monitor
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <RequestMonitor />
          </div>
        </div>
      </div>

      <div className="h-[35%] max-h-75 flex-1 relative overflow-hidden">
        <div
          className="relative inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,255,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,255,0,0.04) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <RequestInspector />
      </div>
      {showSaved && <SavedRequestsPanel onClose={() => setShowSaved(false)} />}
      <div className="h-0.5 bg-acid shrink-0" />
      <Toast />
    </div>
  );
}

export default App;
