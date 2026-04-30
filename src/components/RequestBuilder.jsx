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
    setToast
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
    <div className="h-full w-[90%] max-w-7xl flex flex-col gap-3">
      <div className="w-full h-1/5 flex items-center gap-3 bg-[#0d1314] border border-border px-3 py-2 rounded-md">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="bg-panel text-acid font-display outline-none"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          placeholder="https://api.example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
        />
        <TestButton />
        <button
          onClick={handleSave}
          className="px-2 py-1.5 border border-acid text-acid hover:bg-acid/10 font-mono cursor-pointer"
        >
          SAVE REQUEST
        </button>
      </div>
      <div className="w-full bg-[#0d1314] border border-border px-3 py-2 rounded-md">
        <label className="text-xs text-acid uppercase tracking-widest">
          Headers
        </label>

        <textarea
          placeholder='{"Authorization": "Bearer token"}'
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          className="w-full mt-2 bg-transparent outline-none text-sm font-mono"
        />
      </div>
      {method !== "GET" && method !== "DELETE" && (
        <div className="min-h-1/3 w-full flex items-center gap-3 bg-[#0d1314] border border-border px-3 py-2 rounded-md">
          <textarea
            placeholder='{"key": "value"}'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full mt-2 bg-[#0d1314] border-border p-2 text-sm h-full"
          />
        </div>
      )}
    </div>
  );
}
