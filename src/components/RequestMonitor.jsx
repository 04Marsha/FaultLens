import useChaosStore from "../store/useChaosStore";
import { getStatusText } from "../utils/statusMapper";

export default function RequestMonitor() {
  const {
    logs,
    clearLogs,
    search,
    methodFilter,
    statusFilter,
    setSelectedLog,
    selectedLog,
    setSearch,
    setMethodFilter,
    setStatusFilter,
  } = useChaosStore();

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.url.toLowerCase().includes(search.toLowerCase());

    const matchesMethod = methodFilter === "ALL" || log.method === methodFilter;

    const isError = typeof log.status !== "number" || log.status >= 400;

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "SUCCESS" && !isError) ||
      (statusFilter === "ERROR" && isError);

    return matchesSearch && matchesMethod && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col bg-surface text-xs font-mono">
      <div className="flex justify-between items-center px-4 py-2 border-b border-border">
        <span className="text-[16px] tracking-[0.22em] uppercase text-light font-display">
          Network Monitor
        </span>
        <div className="flex flex-row gap-7 items-center justify-center">
          <div className="flex gap-4 px-7 py-2 border-b border-border bg-[#0d1314]">
            {/* Search */}
            <input
              type="text"
              placeholder="Search URL..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-black/40 px-2 py-1 text-[12px] outline-none w-2xl"
            />

            {/* Method filter */}
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="bg-panel text-acid font-display outline-none text-[18px]"
            >
              <option value="ALL">ALL</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-panel text-acid font-display outline-none text-[18px]"
            >
              <option value="ALL">ALL</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="ERROR">ERROR</option>
            </select>
          </div>
          <button
            onClick={clearLogs}
            className="text-[14px] tracking-[0.15em] uppercase text-danger/50 hover:text-danger transition-colors duration-150 font-display"
          >
            Clear
          </button>
        </div>
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

        {filteredLogs.map((log) => (
          <div
            key={log.id}
            onClick={() => setSelectedLog(log)}
            className={`grid grid-cols-5 px-4 py-2 border-b border-border/40 cursor-pointer transition-colors duration-100 items-center
              ${selectedLog?.id === log.id ? "bg-acid/10" : "hover:bg-[#0d1314]"}`}
          >
            <span
              className={`text-[16px] tracking-widest uppercase font-display ${
                typeof log.status === "number"
                  ? log.status >= 200 && log.status < 300
                    ? "text-acid"
                    : log.status >= 400 && log.status < 500
                      ? "text-warn"
                      : "text-danger"
                  : "text-danger"
              }`}
            >
              {typeof log.status === "number"
                ? `${log.status} ${getStatusText(log.status)}`
                : "ERR"}
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
              className={`truncate ${
                typeof log.status === "number" && log.status >= 400
                  ? "text-danger"
                  : log.errorMessage
                    ? "text-danger"
                    : "text-light"
              }`}
            >
              {getStatusText(log.status, log.errorMessage)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
