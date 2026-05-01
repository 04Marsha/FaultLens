import useChaosStore from "../store/useChaosStore";
import { Trash } from "lucide-react";

export default function SavedRequestsPanel({ onClose }) {
  const {
    url,
    method,
    body,
    headers,
    setUrl,
    setMethod,
    setBody,
    setHeaders,
    savedRequests,
    deleteSavedRequest,
  } = useChaosStore();

  const setToast = useChaosStore((s) => s.setToast);

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-start pt-16 md:pt-24 z-50 px-3 md:px-0">
      <div className="pointer-events-auto w-full md:w-[80%] max-w-6xl bg-[#0d1314] border border-border rounded p-3 md:p-4 max-h-[75vh] flex flex-col">
        <div className="flex justify-between items-center mb-3 shrink-0">
          <h2 className="text-acid font-display text-[16px] md:text-[22px]">
            Saved Requests
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer font-mono text-warn text-sm"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          {savedRequests && savedRequests.length > 0 ? (
            savedRequests.map((req) => (
              <details
                key={req.id}
                className="mb-2 border border-border rounded group"
              >
                <summary className="font-mono flex justify-between items-center px-3 py-2 cursor-pointer text-xs md:text-sm">
                  <span className="truncate mr-2">
                    {req.method} — {req.url}
                  </span>

                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (confirm("Delete this request?")) {
                        deleteSavedRequest(req.id);
                        setToast("Request Deleted", "error");
                      }
                    }}
                    className="
                  p-1 rounded text-danger shrink-0
                  opacity-100 md:opacity-0 md:group-hover:opacity-100
                  hover:bg-red-500/10 hover:text-red-400
                  transition-all duration-150 cursor-pointer
                "
                    title="Delete request"
                  >
                    <Trash size={16} />
                  </span>
                </summary>

                <div className="px-3 pb-3 text-[12px] md:text-[13px]">
                  <div className="mb-2 text-light break-all">
                    Body: {req.body || "None"}
                  </div>
                  <button
                    onClick={() => {
                      setUrl(req.url);
                      setMethod(req.method);
                      setBody(req.body || "");
                      setHeaders(req.headers || "");
                      setToast("Request Loaded", "success");
                      setTimeout(() => onClose(), 0);
                    }}
                    className="text-acid cursor-pointer text-xs tracking-widest font-display hover:text-acid/70 transition-colors"
                  >
                    LOAD
                  </button>
                </div>
              </details>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-light">
              <div className="text-sm font-mono mb-2">No saved requests</div>
              <div className="text-xs">Save a request to reuse it later</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
