import useChaosStore from "../store/useChaosStore";

export default function ControlPanel() {
  const {
    latency,
    errorRate,
    isOffline,
    setLatency,
    setErrorRate,
    toggleOffline,
  } = useChaosStore();

  return (
    <div className="p-5 space-y-2 bg-surface h-full">
      <h2 className="text-base tracking-[0.15em] uppercase text-body font-display">
        Chaos Controls
      </h2>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="text-[12px] tracking-[0.22em] uppercase text-light">
            Latency
          </label>
          <span className="text-[14px] text-acid font-display">
            {latency} ms
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="5000"
          value={latency}
          onChange={(e) => setLatency(Number(e.target.value))}
          className="w-full accent-acid"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="text-[12px] tracking-[0.22em] uppercase text-light">
            Error Rate
          </label>
          <span className="text-[14px] text-acid font-display">
            {errorRate}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={errorRate}
          onChange={(e) => setErrorRate(Number(e.target.value))}
          className="w-full accent-acid"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[12px] tracking-[0.22em] uppercase text-light">
          Offline Mode :
        </span>
        <button
          onClick={toggleOffline}
          className={`px-2 py-0.7 font-display text-[12px] tracking-[0.15em] border transition-all duration-150 active:scale-95
        ${
          isOffline
            ? "bg-danger/10 text-danger border-danger/30 hover:bg-danger/20"
            : "bg-acid/10 text-acid border-acid/30 hover:bg-acid/20"
        }`}
        >
          {isOffline ? "ON" : "OFF"}
        </button>
      </div>
    </div>
  );
}
