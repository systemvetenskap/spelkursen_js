const baseUrl = "https://api.dsvkurs.miun.se";
const version = "v1";

const apiEndpointBase = `${baseUrl}/${version}`;

// --------------------------------------------------
// Exponerar metoder för att hämta (get) och skicka (post)
// --------------------------------------------------
export async function get(endpoint) {
  return await run(endpoint, "GET");
}

export async function post(endpoint, body) {
  return await run(endpoint, "POST", body);
}
async function run(endpoint, method = "GET", body = null) {
  const url = `${apiEndpointBase}/${endpoint}`;

  const token = localStorage.getItem("token");
  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (body !== null) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body !== null ? JSON.stringify(body) : null,
  });

  if (response.ok) {
    return await response.json();
  }

  let errorData = null;

  try {
    errorData = await response.json();
  } catch {
    // API:t returnerade inte JSON
  }
  if (response.status === 401) {
    const error = new Error("Du måste vara inloggad för att kunna spela.");
    error.status = 401;
    throw error;
  }

  const error = new Error(
    errorData?.detail || errorData?.message || `HTTP error ${response.status}`,
  );

  error.status = response.status;
  error.data = errorData;

  throw error;
}
