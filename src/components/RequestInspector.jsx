import { useState } from "react";
import { chaosFetch } from "../chaos-engine/chaosFetch";
import useChaosStore from "../store/useChaosStore";

export default function RequestInspector() {
  const { selectedLog, clearSelectedLog } = useChaosStore();
  const [copied, setCopied] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [copying, setCopying] = useState(false);

  const hasCopyData =
    (selectedLog?.response !== undefined && selectedLog?.response !== null) ||
    selectedLog?.errorMessage;

  const handleCopy = async () => {
    if (!selectedLog) return;

    let text = "";

    if (selectedLog.response != null) {
      text = JSON.stringify(selectedLog.response, null, 2);
    } else if (selectedLog.errorMessage) {
      text = selectedLog.errorMessage;
    } else {
      alert("Nothing to copy");
      return;
    }

    setCopying(true);

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    clearTimeout(window.copyTimer);

    setCopied(true);
    window.copyTimer = setTimeout(() => setCopied(false), 1500);
    setCopying(false);
  };

  const handleRetry = async () => {
    if (!selectedLog) return;

    setRetrying(true);

    try {
      await chaosFetch(selectedLog.url, {
        method: selectedLog.method,
        headers: selectedLog.headers,
        body: selectedLog.body,
      });
    } catch (err) {
      console.error("Retry failed:", err.message);
    } finally {
      setRetrying(false);
    }
  };

  if (!selectedLog) {
    return (
      <div className="h-full border-t border-border flex items-center justify-center text-light/50 text-xs">
        Select a request to inspect
      </div>
    );
  }

  return (
    <div className="h-full border-t-2 border-acid/20 bg-[#0d1314] flex flex-col overflow-hidden">
      <div className="flex justify-between items-center px-3 py-1.5 border-b-2 border-acid/20 shrink-0">
        <span className="text-xs uppercase tracking-widest text-acid">
          Inspector
        </span>
        <div className="flex gap-3">
          <button
            onClick={handleRetry}
            disabled={retrying}
            className={`text-[12px] md:text-[14px] tracking-[0.15em] transition-colors duration-150 font-display
            ${retrying ? "opacity-50 cursor-not-allowed" : "text-acid hover:text-acid/70"}`}
          >
            {retrying ? "Retrying..." : "RETRY"}
          </button>
          <button
            onClick={clearSelectedLog}
            className="text-[12px] md:text-[14px] tracking-[0.15em] uppercase text-danger/50 hover:text-danger transition-colors duration-150 font-display"
          >
            CLOSE
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/4 md:border-r border-border/40 md:overflow-y-auto shrink-0">
          <div className="p-3 text-xs text-light font-mono space-y-2">
            <div>
              <span className="text-acid">Status:</span> {selectedLog.status}
            </div>
            <div className="break-all">
              <span className="text-acid">URL:</span> {selectedLog.url}
            </div>
            <div>
              <span className="text-acid">Method:</span> {selectedLog.method}
            </div>
            {selectedLog.errorMessage && (
              <div className="text-danger">
                <span className="text-acid">Error:</span>{" "}
                {selectedLog.errorMessage}
              </div>
            )}

            <div className="hidden md:block mt-2">
              <span className="text-acid">Timeline:</span>
              <div className="mt-2 border-l border-border pl-3 flex flex-col gap-2">
                {selectedLog.timeline?.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        step.type === "success"
                          ? "bg-green-400"
                          : step.type === "error"
                            ? "bg-red-400"
                            : step.type === "warning"
                              ? "bg-yellow-400"
                              : "bg-acid"
                      }`}
                    />
                    <span
                      className={`${
                        step.type === "success"
                          ? "text-green-400"
                          : step.type === "error"
                            ? "text-red-400"
                            : "text-light"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:hidden mt-2">
              <span className="text-acid">Timeline:</span>
              <div className="mt-2 border-l border-border pl-3 flex flex-col gap-2">
                {selectedLog.timeline?.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        step.type === "success"
                          ? "bg-green-400"
                          : step.type === "error"
                            ? "bg-red-400"
                            : step.type === "warning"
                              ? "bg-yellow-400"
                              : "bg-acid"
                      }`}
                    />
                    <span
                      className={`${
                        step.type === "success"
                          ? "text-green-400"
                          : step.type === "error"
                            ? "text-red-400"
                            : "text-light"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-3 md:min-h-0">
          <div className="flex justify-between items-center shrink-0">
            <span className="text-acid text-xs">Response:</span>
            <button
              onClick={handleCopy}
              disabled={!hasCopyData || copying}
              className={`text-[12px] md:text-[14px] tracking-[0.15em] uppercase font-display ${
                !hasCopyData || copying
                  ? "opacity-50 cursor-not-allowed"
                  : "text-acid hover:text-acid/70"
              }`}
            >
              {copied ? "COPIED" : copying ? "COPYING..." : "COPY"}
            </button>
          </div>

          <pre
            className="mt-2 p-2 md:p-3 text-xs bg-black/70 border border-border rounded overflow-auto
          max-h-48 md:max-h-none md:flex-1 md:min-h-0"
          >
            {selectedLog.response != null
              ? JSON.stringify(selectedLog.response, null, 2)
              : selectedLog.errorMessage || "No response"}
          </pre>
        </div>
      </div>
    </div>
  );
}
