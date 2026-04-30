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
    <div className="fixed inset-0 bg-black/70 flex justify-center items-start top-30 z-50">
      <div className="pointer-events-auto w-[80%] max-w-6xl bg-[#0d1314] border border-border rounded p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-acid font-display text-[22px]">Saved Requests</h2>
          <button
            onClick={onClose}
            className="cursor-pointer font-mono text-warn"
          >
            Close
          </button>
        </div>

        {savedRequests && savedRequests.length > 0 ? (
          savedRequests.map((req) => (
            <details
              key={req.id}
              className="mb-2 border border-border rounded group"
            >
              <summary className="font-mono flex justify-between items-center px-3 py-2 cursor-pointer">
                <span className="truncate">
                  {req.method} - {req.url}
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
            p-1 rounded
            text-danger
            opacity-0 group-hover:opacity-100
            hover:bg-red-500/10 hover:text-red-400
            transition-all duration-150
            cursor-pointer
          "
                  title="Delete request"
                >
                  <Trash size={22} />
                </span>
              </summary>

              <div className="px-3 pb-3 text-[13px]">
                <div className="mb-2">Body: {req.body || "None"}</div>

                <button
                  onClick={() => {
                    setUrl(req.url);
                    setMethod(req.method);
                    setBody(req.body || "");
                    setHeaders(req.headers || "");
                    setToast("Request Loaded", "success");

                    setTimeout(() => onClose(), 0);
                  }}
                  className="text-acid cursor-pointer"
                >
                  LOAD
                </button>
              </div>
            </details>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-light">
            <div className="text-lg font-mono mb-2">No saved requests</div>
            <div className="text-s">Save a request to reuse it later</div>
          </div>
        )}
      </div>
    </div>
  );
}
