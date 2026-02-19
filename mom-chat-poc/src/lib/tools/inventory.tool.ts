import { getContainerLocation } from "../clients/servicesClient";

export async function inventoryGetContainerLocation(args: {
  containerId: string;
}) {
  return getContainerLocation(args.containerId);
}