import useChaosStore from "../store/useChaosStore";

export async function chaosFetch(url, options = {}) {
  console.log("chaosFetch called");

  const startTime = Date.now();
  const state = useChaosStore.getState();
  console.log(state);

  const { latency, errorRate, isOffline, addLog } = state;

  let status = "success";
  let errorMessage = null;

  try {
    if (isOffline) {
      throw new Error("Network Offline");
    }

    await new Promise((res) => setTimeout(res, latency));

    const random = Math.random() * 100;
    if (random < errorRate) {
      throw new Error("Injected Failure");
    }

    const response = await fetch(url, options);
    return response;
  } catch (error) {
    status = "error";
    errorMessage = error.message;
    throw error;
  } finally {
    const endTime = Date.now();

    console.log("ADDING LOG");

    addLog({
      id: crypto.randomUUID(),
      url,
      method: options.method || "GET",
      status,
      errorMessage,
      time: endTime - startTime,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
}
