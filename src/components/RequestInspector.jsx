import useChaosStore from "../store/useChaosStore";

export default function RequestInspector() {
  const { selectedLog, clearSelectedLog } = useChaosStore();

  if (!selectedLog) {
    return (
      <div className="h-[40%] border-t border-border flex items-center justify-center text-light/50 text-sm">
        Select a request to inspect
      </div>
    );
  }

  return (
    <div className="h-full max-h-75 border-t-2 border-acid/20 bg-[#0d1314] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b-2 border-acid/20">
        <span className="text-sm uppercase tracking-widest text-acid">
          Request Inspector
        </span>

        <button
          onClick={() => {
            console.log("closing...");
            clearSelectedLog();
          }}
          className="text-[14px] tracking-[0.15em] uppercase text-danger/50 hover:text-danger transition-colors duration-150 font-display"
        >
          Close
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 text-xs text-light font-mono">
        {/* Status */}
        <div className="mb-3">
          <span className="text-acid">Status:</span> {selectedLog.status}
        </div>

        {/* URL */}
        <div className="mb-3 break-all">
          <span className="text-acid">URL:</span> {selectedLog.url}
        </div>

        {/* Method */}
        <div className="mb-3">
          <span className="text-acid">Method:</span> {selectedLog.method}
        </div>

        {/* Error */}
        {selectedLog.errorMessage && (
          <div className="mb-3 text-danger">
            <span className="text-acid">Error:</span> {selectedLog.errorMessage}
          </div>
        )}

        {/* Response */}
        <div>
          <span className="text-acid">Response:</span>

          <pre className="mt-2 p-3 bg-black/70 border border-border rounded overflow-auto">
            {JSON.stringify(selectedLog.response, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
