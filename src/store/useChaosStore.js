import { create } from "zustand";

const useChaosStore = create((set) => ({
  latency: 0,
  errorRate: 0,
  isOffline: false,

  url: "",
  method: "GET",
  body: "",
  headers: `{"Content-Type": "application/json"}`,

  search: "",
  methodFilter: "ALL",
  statusFilter: "ALL",

  savedRequests: JSON.parse(localStorage.getItem("savedRequests")) || [],

  logs: [],
  selectedLog: null,

  toast: null,

  setUrl: (url) => set({ url: url }),
  setMethod: (method) => set({ method }),
  setBody: (body) => set({ body }),
  setHeaders: (headers) => set({ headers }),

  setSelectedLog: (log) => set({ selectedLog: log }),
  clearSelectedLog: () => set({ selectedLog: null }),

  setLatency: (value) => set({ latency: value }),
  setErrorRate: (value) => set({ errorRate: value }),
  toggleOffline: () => set((state) => ({ isOffline: !state.isOffline })),

  setSearch: (value) => set({ search: value }),
  setMethodFilter: (value) => set({ methodFilter: value }),
  setStatusFilter: (value) => set({ statusFilter: value }),

  addSavedRequest: (req) =>
    set((state) => {
      const updated = [req, ...state.savedRequests];
      localStorage.setItem("savedRequests", JSON.stringify(updated));
      return { savedRequests: updated };
    }),

  deleteSavedRequest: (id) =>
    set((state) => {
      const updated = state.savedRequests.filter((r) => r.id !== id);
      localStorage.setItem("savedRequests", JSON.stringify(updated));
      return { savedRequests: updated };
    }),

  addLog: (log) =>
    set((state) => ({
      logs: [log, ...state.logs],
    })),

  setToast: (message, type = "info") =>
    set({
      toast: { message, type, id: Date.now() },
    }),

  clearToast: () => set({ toast: null }),

  clearLogs: () => set({ logs: [] }),
}));

export default useChaosStore;
