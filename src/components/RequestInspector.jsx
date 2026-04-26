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

      <div className="flex-1 overflow-auto p-4 text-xs text-light font-mono">
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
            <span className="text-acid">Error:</span> {selectedLog.errorMessage}
          </div>
        )}

        <div>
          <div className="flex justify-between">
            <span className="text-acid">Response:</span>
            <button
              onClick={handleCopy}
              disabled={!hasCopyData || copying}
              className={`text-[14px] tracking-[0.15em] uppercase font-display
    ${
      !hasCopyData || copying
        ? "opacity-50 cursor-not-allowed"
        : "text-acid hover:text-acid/70"
    }
  `}
            >
              {copied ? "COPIED" : copying ? "COPYING..." : "COPY"}
            </button>
          </div>

          <pre className="mt-2 p-3 bg-black/70 border border-border rounded overflow-auto">
            {selectedLog.response != null
              ? JSON.stringify(selectedLog.response, null, 2)
              : selectedLog.errorMessage || "No response"}
          </pre>
        </div>
      </div>
    </div>
  );
}
