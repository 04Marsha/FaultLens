import useChaosStore from "../store/useChaosStore";

async function safeParse(res) {
  try {
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await res.clone().json();
    }

    return await res.clone().text();
  } catch {
    return null;
  }
}

export async function chaosFetch(url, options = {}) {
  console.log("chaosFetch called");

  const startTime = Date.now();
  const state = useChaosStore.getState();

  const { latency, errorRate, isOffline, addLog } = state;
  const failureTypes = [
    "Timeout",
    "500 Internal Server Error",
    "Network Error",
  ];

  let status = "success";
  let errorMessage = null;
  let httpStatus = null;
  let response = null;

  try {
    if (isOffline) {
      throw new Error("Network Offline");
    }

    await new Promise((res) => setTimeout(res, latency));

    const random = Math.random() * 100;

    if (random < errorRate) {
      const randomFailure =
        failureTypes[Math.floor(Math.random() * failureTypes.length)];

      if (randomFailure === "Timeout") {
        await new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), latency),
        );
      }

      if (randomFailure === "Network Error") {
        throw new TypeError("Failed to fetch");
      }

      if (randomFailure.includes("500")) {
        httpStatus = 500;
        status = "error";
        errorMessage = randomFailure;

        return new Response(
          JSON.stringify({ error: "Internal Server Error" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );

        return response;
      }

      throw new Error(randomFailure);
    }

    response = await fetch(url, options);
    httpStatus = response.status;

    if (!response.ok) {
      status = "error";
      errorMessage = `HTTP ${response.status}`;
      throw new Error(`HTTP ${response.status}`);
    }

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
      headers: options.headers || {},
      body: options.body || null,
      status: httpStatus ?? (status === "error" ? "ERR" : "OK"),
      errorMessage,
      response: response ? await safeParse(response) : null,
      time: endTime - startTime,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
}
