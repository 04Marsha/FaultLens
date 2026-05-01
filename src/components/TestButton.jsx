import { chaosFetch } from "../chaos-engine/chaosFetch";
import useChaosStore from "../store/useChaosStore";

export default function TestButton() {
  const { url, method, body, headers } = useChaosStore();
  const setToast = useChaosStore((s) => s.setToast);

  const testAPI = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    let parsedHeaders = {};

    try {
      if (!headers.trim()) {
        parsedHeaders = {};
      } else {
        parsedHeaders = JSON.parse(headers);
      }
    } catch {
      alert("Invalid Headers JSON");
      return;
    }

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...parsedHeaders,
      },
    };

    try {
      if (method === "POST" || method === "PUT") {
        if (!body) {
          alert(`${method} request requires a body`);
          return;
        }

        try {
          JSON.parse(body);
        } catch {
          alert("Invalid JSON body");
          return;
        }

        options.body = body;
      }

      if (method === "DELETE" && body) {
        options.body = body;
      }

      let res;

      try {
        res = await chaosFetch(url, options);

        setToast("Request Sent", "success");
      } catch (err) {
        setToast("Request Failed", "error");
        return;
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <button
      onClick={testAPI}
      className="
    flex items-center gap-2
    px-2 py-1
    bg-acid text-surface
    text-[12px] md:text-[14px] tracking-[0.2em] uppercase
    border border-acid
    hover:bg-transparent hover:text-acid
    active:scale-95
    transition-all duration-150 font-display cursor-pointer
    whitespace-nowrap
  "
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
      <span className="hidden sm:inline">Send Request</span>
      <span className="sm:hidden">Send</span>
    </button>
  );
}
