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
  const [activeTab, setActiveTab] = useState("monitor");

  return (
    <div className="h-screen bg-surface text-body flex flex-col overflow-hidden">
      <div className="h-0.5 bg-acid shrink-0" />

      <header className="flex items-center justify-between border-b border-muted shrink-0 px-3 py-2">
        <div className="flex flex-row items-center gap-2">
          <img src="/faultlens.svg" alt="FaultLens" className="h-5 md:h-6" />
          <h1 className="text-sm md:text-4xl leading-none tracking-wide text-body font-display">
            Fault<span className="text-acid">Lens</span>
          </h1>
        </div>
        <button
          onClick={() => setShowSaved(true)}
          className="px-2 py-1 border border-acid text-xs md:text-sm text-acid font-mono cursor-pointer whitespace-nowrap"
        >
          SAVED<span className="hidden sm:inline"> REQUESTS</span>
        </button>
      </header>

      <div
        className="relative overflow-hidden flex justify-center items-start
    h-[38%] md:flex-1 md:h-auto mt-3 md:mt-6 shrink-0"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,255,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,255,0,0.04) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 h-full w-full flex justify-center overflow-y-auto">
          <RequestBuilder />
        </div>
      </div>

      <div className="border-t border-border shrink-0">
        <div className="flex flex-col md:flex-row md:h-64">
          <div className="md:w-1/3 md:border-r border-border flex flex-col min-w-0">
            <div className="px-3 py-1.5 border-b border-t md:border-t-0 border-border shrink-0 bg-[#0d1314]">
              <span className="text-xs md:text-base tracking-wider text-body font-display">
                Control Panel
              </span>
            </div>
            <div className="overflow-hidden">
              <ControlPanel />
            </div>
          </div>

          <div className="hidden md:flex flex-1 flex-col min-w-0">
            <div className="px-3 py-1.5 border-b border-border shrink-0 bg-[#0d1314]">
              <span className="text-base tracking-wider text-body font-display">
                Request Monitor
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <RequestMonitor />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block border-t border-border h-[35%] max-h-65 shrink-0">
        <RequestInspector />
      </div>

      <div className="md:hidden flex flex-col border-t border-border flex-1 min-h-0">
        <div className="flex shrink-0 bg-[#0d1314]">
          {[
            { id: "monitor", label: "Network Monitor" },
            { id: "inspector", label: "Inspector" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-3 py-2 text-[11px] tracking-[0.18em] uppercase font-display transition-colors duration-150 border-r last:border-r-0 border-border
            ${
              activeTab === tab.id
                ? "text-acid border-b-2 border-b-acid bg-acid/5"
                : "text-light/50 hover:text-light border-b-2 border-b-transparent"
            }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-hidden min-h-0">
          {activeTab === "monitor" && <RequestMonitor />}
          {activeTab === "inspector" && <RequestInspector />}
        </div>
      </div>

      {showSaved && <SavedRequestsPanel onClose={() => setShowSaved(false)} />}
      <div className="h-0.5 bg-acid shrink-0" />
      <Toast />
    </div>
  );
}

export default App;
