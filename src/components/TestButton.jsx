import { chaosFetch } from "../chaos-engine/chaosFetch";
import useChaosStore from "../store/useChaosStore";

export default function TestButton() {
  const { url, method } = useChaosStore();

  const testAPI = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    try {
      const res = await chaosFetch(url, { method });
      const data = await res.json();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <button
      onClick={testAPI}
      className="
        flex items-center gap-2
        px-6 py-2.5
        bg-acid text-surface
        text-sm tracking-[0.2em] uppercase
        border border-acid
        hover:bg-transparent hover:text-acid
        active:scale-95
        transition-all duration-150 font-display cursor-pointer
      "
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      Send Request
    </button>
  );
}
