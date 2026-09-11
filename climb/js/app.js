console.log("inne");
import { getRoutes, getRouteById } from "./climb-services.js";

const routeList = document.querySelector("#routeList");
const difficulty = document.querySelector("#difficulty");
const detail = document.querySelector("#detail");

// Bind ett event till rullgardinen

difficulty.addEventListener("input", renderRoutes2);

routeList.addEventListener("click", async (event) => {
  const card = event.target.closest("[data-route-id]");
  if (!card) return;
  const route = await getRouteById(card.dataset.routeId);

  detail.innerHTML = detailCard(route); // <-- här måste vi ha innerHTml
});

function detailCard(route) {
  return `
    <div class="detail__body" style="padding-top: 24px">
      <p class="eyebrow">${route.berg}</p>
      <h3>${route.namn}</h3>

      <div class="detail__grade">
        ${route.svarighetsgrad}
      </div>

      <div class="detail__facts">
        <div>
          <span>Längd</span>
          <strong>${route.langd} m</strong>
        </div>

        <div>
          <span>Skapad av</span>
          <strong>${route.skapadAv}</strong>
        </div>

        <div>
          <span>Säkring</span>
          <strong>${route.borrbultad ? "Borrbultad" : "Traditionell"}</strong>
        </div>
        <div>
         <h4>Rekommenderad utrustning</h4>
      <ul>
        ${equipmentList(route.rekommenderadUtrustning)}
      </ul>
        </div>
      </div>
    </div>
  `;
}

function equipmentList(equipment) {
  return equipment.map((item) => `<li>${item}</li>`).join("");
}

let routes = [];

async function loadRoutes() {
  routes = await getRoutes();
  renderRoutes();
}

function renderRoutes() {
  for (const route of routes) {
    const routeCard = renderRoute(route);

    routeList.append(routeCard);
  }
}

function renderRoutes2() {
  routeList.innerHTML = "";
  const grade = difficulty.value;

  const filteredRoutes = routes.filter((route) =>
    route.svarighetsgrad.startsWith(grade),
  );

  for (const route of filteredRoutes) {
    const routeCard = renderRoute(route);

    routeList.append(routeCard);
  }
}

function renderRoute(route) {
  const routeCard = document.createElement("button");

  routeCard.classList.add("route-card");
  routeCard.dataset.routeId = route.id; // < ---------- dataset

  routeCard.innerHTML = `
        <span class="route-card__id">
            ${route.id}
        </span>

        <span>
            <span class="route-card__name">
                ${route.namn}
            </span>

            <span class="route-card__meta">
                <span>${route.berg}</span>
                <span>${route.langd} m</span>
            </span>
        </span>

        <span class="route-card__grade">
            ${route.svarighetsgrad}
        </span>
    `;

  return routeCard;
}

await loadRoutes();
