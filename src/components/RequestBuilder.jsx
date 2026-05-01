// GET REQUEST
// https://jsonplaceholder.typicode.com/posts

// POST REQUEST
// https://jsonplaceholder.typicode.com/posts
// {
//   "title": "hello",
//   "body": "world",
//   "userId": 1
// }

// PUT REQUEST
// https://jsonplaceholder.typicode.com/posts/1
// {
//   "id": 1,
//   "title": "Updated",
//   "body": "Chaos update test",
//   "userId": 1
// }

//DELETE REQUEST
// https://jsonplaceholder.typicode.com/posts/1

import TestButton from "./TestButton";
import useChaosStore from "../store/useChaosStore";
import { MethodSelect } from "./MethodSelect";

export default function RequestBuilder() {
  const {
    url,
    method,
    body,
    headers,
    setUrl,
    setMethod,
    setBody,
    setHeaders,
    addSavedRequest,
    setToast,
  } = useChaosStore();

  const handleSave = () => {
    if (!url) return alert("Enter URL first");

    addSavedRequest({
      id: crypto.randomUUID(),
      url,
      method,
      body,
      headers,
      createdAt: new Date().toLocaleDateString(),
    });
    setToast("Request Saved", "success");
  };

  return (
    <div className="h-full w-full px-3 flex flex-col gap-2">
      <div className="w-full bg-[#0d1314] border border-border px-2 py-2 rounded-md">
        <div className="flex items-center gap-2">
          <MethodSelect
            bordered
            value={method}
            onChange={setMethod}
            options={["GET", "POST", "PUT", "DELETE"]}
          />

          <input
            type="text"
            placeholder="https://api.example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[13px] text-body placeholder:text-light/30 min-w-0"
          />
        </div>

        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/40">
          <TestButton />
          <button
            onClick={handleSave}
            className="px-2 py-1 border border-acid/50 text-acid hover:bg-acid/10 font-mono cursor-pointer text-[10px] tracking-widest whitespace-nowrap"
          >
            SAVE
          </button>
        </div>
      </div>

      <div className="w-full bg-[#0d1314] border border-border px-3 py-2 rounded-md">
        <label className="text-[10px] text-acid uppercase tracking-widest">
          Headers
        </label>
        <textarea
          placeholder='{"Authorization": "Bearer token"}'
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          className="w-full mt-1.5 bg-transparent outline-none text-[11px] font-mono resize-none text-body placeholder:text-light/20"
          rows={2}
        />
      </div>

      {method !== "GET" && method !== "DELETE" && (
        <div className="w-full bg-[#0d1314] border border-border px-3 py-2 rounded-md">
          <label className="text-[10px] text-acid uppercase tracking-widest shrink-0">
            Body
          </label>
          <textarea
            placeholder='{"key": "value"}'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full mt-1.5 bg-transparent outline-none text-[11px] font-mono resize-none text-body placeholder:text-light/20"
            rows={4}
          />
        </div>
      )}
    </div>
  );
}
