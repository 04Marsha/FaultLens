import TestButton from "./TestButton";
import useChaosStore from "../store/useChaosStore";

export default function RequestBuilder() {
  const { url, method, setUrl, setMethod } = useChaosStore();

  return (
    <div className="w-[80%] max-w-4xl flex items-center gap-3 bg-[#0d1314] border border-border px-3 py-2 rounded-md">
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
  );
}
