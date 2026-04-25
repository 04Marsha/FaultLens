import { create } from "zustand";

const useChaosStore = create((set) => ({
  latency: 0,
  errorRate: 0,
  isOffline: false,

  url: "",
  method: "GET",
  body: "",
  headers: { "Content-Type": "application/json" },

  logs: [],
  selectedLog: null,

  setUrl: (url) => set({ url: url }),
  setMethod: (method) =>
    set(() => ({
      method,
      body: method === "GET" ? "" : "",
    })),
  setBody: (body) => set({ body }),
  setSelectedLog: (log) => set({ selectedLog: log }),
  clearSelectedLog: () => set({ selectedLog: null }),

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
