import { create } from "zustand";

const useChaosStore = create((set) => ({
  latency: 0,
  errorRate: 0,
  isOffline: false,

  url: "",
  method: "GET",

  logs: [],

  setUrl: (url) => set({ url: url }),
  setMethod: (method) => set({ method: method }),
  setLatency: (value) => set({ latency: value }),
  setErrorRate: (value) => set({ errorRate: value }),
  toggleOffline: () => set((state) => ({ isOffline: !state.isOffline })),

  addLog: (log) =>
    set((state) => ({
      logs: [log, ...state.logs],
    })),

  clearLogs: () => set({ logs: [] }),
}));

export default useChaosStore;
