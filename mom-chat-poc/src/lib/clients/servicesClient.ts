const SCHEDULE_URL = process.env.SCHEDULE_URL ?? "http://localhost:4001";
const ORDER_URL = process.env.ORDER_URL ?? "http://localhost:4002";
const INVENTORY_URL = process.env.INVENTORY_URL ?? "http://localhost:4003";

export async function getPlanning(line: string, date: string) {
  const res = await fetch(`${SCHEDULE_URL}/planning?line=${line}&date=${date}`);
  if (!res.ok) throw new Error("schedule-service failed");
  return res.json();
}

export async function countOrders(process: string, stage: string) {
  const res = await fetch(`${ORDER_URL}/orders/count?process=${process}&stage=${stage}`);
  if (!res.ok) throw new Error("order-service failed");
  return res.json();
}

export async function getContainerLocation(containerId: string) {
  const res = await fetch(`${INVENTORY_URL}/containers/${containerId}/location`);
  if (!res.ok) throw new Error("inventory-service failed");
  return res.json();
}