// GET REQUEST
// https://jsonplaceholder.typicode.com/posts

// POST REQUEST
// https://jsonplaceholder.typicode.com/posts
// BODY: {
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
  const { url, method, body, setUrl, setMethod, setBody } = useChaosStore();

  return (
    <div className="max-h-3/5 w-[90%] max-w-7xl flex flex-col gap-3">
      <div className="w-full flex items-center gap-3 bg-[#0d1314] border border-border px-3 py-2 rounded-md">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="bg-panel text-acid font-display outline-none"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <input
          type="text"
          placeholder="https://api.example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
        />
        <TestButton />
      </div>
      {method !== "GET" && method !== "DELETE" && (
        <div className="max-h-full w-full flex items-center gap-3 bg-[#0d1314] border border-border px-3 py-2 rounded-md">
          <textarea
            placeholder='{"key": "value"}'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full mt-2 bg-[#0d1314] border-border p-2 text-sm"
          />
        </div>
      )}
    </div>
  );
}
