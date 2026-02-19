import { planningGetByLineDate } from "../tools/planning.tool";
import { ordersCountByProcessStage } from "../tools/orders.tool";
import { inventoryGetContainerLocation } from "../tools/inventory.tool";

export async function runToolRouting(userText: string) {
  const t = userText.toLowerCase();

  // Keep it dumb on purpose for now (safe + predictable)
  if (t.includes("planning") && t.includes("sanpac1") && t.includes("17")) {
    const data = await planningGetByLineDate({ line: "SANPAC1", date: "2026-02-17" });
    return { toolUsed: "planning.getByLineDate", data };
  }

  if (t.includes("how many") && t.includes("washing") && t.includes("prepar")) {
    const data = await ordersCountByProcessStage({ process: "Washing", stage: "Prepare" });
    return { toolUsed: "orders.countByProcessStage", data };
  }

  if (t.includes("where") && t.includes("container")) {
    // naive container extraction example: container C-456
    const match = userText.match(/C-\d+/i);
    const id = match?.[0] ?? "C-456";
    const data = await inventoryGetContainerLocation({ containerId: id });
    return { toolUsed: "inventory.getContainerLocation", data };
  }

  return null;
}