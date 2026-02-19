import { getPlanning } from "../clients/servicesClient";

export async function planningGetByLineDate(args: { line: string; date: string }) {
  return getPlanning(args.line, args.date);
}