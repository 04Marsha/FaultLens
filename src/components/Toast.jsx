import useChaosStore from "../store/useChaosStore";
import { useEffect } from "react";

export default function Toast() {
  const toast = useChaosStore((s) => s.toast);
  const clearToast = useChaosStore((s) => s.clearToast);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      clearToast();
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast?.id, clearToast]);

  if (!toast) return null;

  const colorMap = {
    success: "bg-green-500/10 text-green-400 border-green-500/30",
    error: "bg-red-500/10 text-red-400 border-red-500/30",
    info: "bg-acid/10 text-acid border-acid/30",
  };

  return (
    <div className="fixed bottom-6 right-6 z-999">
      <div
        className={`px-4 py-2 border rounded text-sm font-mono backdrop-blur transition-all duration-300 ${
          colorMap[toast.type]
        }`}
      >
        {toast.message}
      </div>
    </div>
  );
}
