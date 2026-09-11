import { get } from "./mockApi-engine.js";

export async function getRoutes() {
  return await get("routes");
}

export async function getRouteById(routeId) {
  return await get(`routes/${routeId}`);
}
