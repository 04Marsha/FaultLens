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
      <div className="h-[40%] border-t border-border flex items-center justify-center text-light/50 text-sm">
        Select a request to inspect
      </div>
    );
  }

  return (
    <div className="h-full max-h-75 border-t-2 border-acid/20 bg-[#0d1314] flex flex-col">
      <div className="flex justify-between items-center px-4 py-2 border-b-2 border-acid/20">
        <span className="text-sm uppercase tracking-widest text-acid">
          Request Inspector
        </span>

        <div className="flex gap-4">
          <button
            onClick={handleRetry}
            disabled={retrying}
            className={`text-[14px] tracking-[0.15em] transition-colors duration-150 font-display
              ${
                retrying
                  ? "opacity-50 cursor-not-allowed"
                  : "text-acid hover:text-acid/70"
              }`}
          >
            {retrying ? "Retrying..." : "RETRY"}
          </button>

          <button
            onClick={clearSelectedLog}
            className="text-[14px] tracking-[0.15em] uppercase text-danger/50 hover:text-danger transition-colors duration-150 font-display"
          >
            CLOSE
          </button>
        </div>
      </div>

      <div className="flex flex-row w-full">
        <div className="flex flex-col w-1/4 max-h-[80%]">
          <div className="flex-1 overflow-scroll h-full p-4 text-xs text-light font-mono">
            <div className="mb-3">
              <span className="text-acid">Status:</span> {selectedLog.status}
            </div>

            <div className="mb-3 break-all">
              <span className="text-acid">URL:</span> {selectedLog.url}
            </div>

            <div className="mb-3">
              <span className="text-acid">Method:</span> {selectedLog.method}
            </div>

            {selectedLog.errorMessage && (
              <div className="mb-3 text-danger">
                <span className="text-acid">Error:</span>{" "}
                {selectedLog.errorMessage}
              </div>
            )}

            <div className="mt-4">
              <span className="text-acid">Timeline:</span>

              <div className="mt-2 border-l border-border pl-3 flex flex-col gap-2">
                {selectedLog.timeline?.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <span
                      className={`w-2 h-2 rounded-full ${
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

        <div className="w-3/4 p-4 text-s flex flex-col max-h-75">
          <div className="flex justify-between">
            <span className="text-acid">Response:</span>
            <button
              onClick={handleCopy}
              disabled={!hasCopyData || copying}
              className={`text-[14px] tracking-[0.15em] uppercase font-display ${
                !hasCopyData || copying
                  ? "opacity-50 cursor-not-allowed"
                  : "text-acid hover:text-acid/70"
              }
              `}
            >
              {copied ? "COPIED" : copying ? "COPYING..." : "COPY"}
            </button>
          </div>

          <pre className="mt-2 p-3 text-xs bg-black/70 border border-border rounded overflow-auto">
            {selectedLog.response != null
              ? JSON.stringify(selectedLog.response, null, 2)
              : selectedLog.errorMessage || "No response"}
          </pre>
        </div>
      </div>
    </div>
  );
}
