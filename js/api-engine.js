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

  // Hämta aktuell token vid varje anrop
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

  // Lyckat anrop
  if (response.ok) {
    return await response.json();
  }

  // Försök läsa API:ets felmeddelande
  let errorData = null;

  try {
    errorData = await response.json();
  } catch {
    // API:t returnerade inte JSON
  }

  // inte inloggad
  // detta är med som exempel för att här kanske du vill göra något special

  if (response.status === 401) {
    throw new Error(errorData?.message || "Unauthorized");
  }

  // andra felen skickar vi som de är direkt
  const error = new Error(
    errorData?.message || `HTTP error ${response.status}`,
  );

  error.status = response.status;
  error.data = errorData;

  throw error;
}
