import useChaosStore from "../store/useChaosStore";

export default function RequestMonitor() {
  const { logs, clearLogs } = useChaosStore();
  return (
    <div className="h-full flex flex-col bg-surface text-xs font-mono">
      <div className="flex justify-between items-center px-4 py-2 border-b border-border">
        <span className="text-[16px] tracking-[0.22em] uppercase text-light font-display">
          Network Monitor
        </span>
        <button
          onClick={clearLogs}
          className="text-[14px] tracking-[0.15em] uppercase text-danger/50 hover:text-danger transition-colors duration-150 font-display"
        >
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-5 px-4 py-2 border-b border-border">
          {["Status", "Method", "URL", "Time", "Info"].map((col) => (
            <span
              key={col}
              className="text-[12px] tracking-[0.22em] uppercase text-light"
            >
              {col}
            </span>
          ))}
        </div>

        {logs.map((log) => (
          <div
            key={log.id}
            className="grid grid-cols-5 px-4 py-2 border-b border-border/40 hover:bg-[#0d1314] transition-colors duration-100 items-center"
          >
            <span
              className={`text-[16px] tracking-widest uppercase font-display
            ${log.status === "success" ? "text-acid" : "text-danger"}`}
            >
              {log.status}
            </span>

            <span
              className={`text-[16px] tracking-widest font-display
            ${
              log.method === "GET"
                ? "text-acid"
                : log.method === "POST"
                  ? "text-warn"
                  : log.method === "DELETE"
                    ? "text-danger"
                    : "text-body"
            }`}
            >
              {log.method}
            </span>

            <span className="truncate text-light">{log.url}</span>

            <span className="text-body">
              <span className="text-[13px] font-display">{log.time}</span>
              <span className="text-[13px] text-light ml-0.5"> ms</span>
            </span>

            <span
              className={`truncate ${log.errorMessage ? "text-danger" : "text-light"}`}
            >
              {log.errorMessage || "OK"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
