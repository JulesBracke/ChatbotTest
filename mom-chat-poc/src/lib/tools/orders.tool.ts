import { countOrders } from "../clients/servicesClient";

export async function ordersCountByProcessStage(args: {
  process: string;
  stage: string;
}) {
  return countOrders(args.process, args.stage);
}