export async function post(endpoint) {
  const fileName = endpoint.split("/").pop();

  const response = await fetch(`./mock/${fileName}.json`);

  if (!response.ok) {
    throw new Error(`Mock API error: ${response.status}`);
  }

  //   url/routes
  // url/routes/1

  return await response.json();
}

export async function get(endpoint) {
  const fileName = endpoint.replaceAll("/", "-");

  const response = await fetch(`./mock/${fileName}.json`);

  if (!response.ok) {
    throw new Error(`Mock API error: ${response.status}`);
  }

  return await response.json();
}
