export type ToolName =
  | "planning.getByLineDate"
  | "orders.countByProcessStage"
  | "inventory.getContainerLocation";

export type ToolCall = {
  name: ToolName;
  args: Record<string, any>;
};

export const TOOL_DESCRIPTIONS: Record<ToolName, string> = {
  "planning.getByLineDate": "Get planning entries for a line on a date.",
  "orders.countByProcessStage": "Count work orders for a given process and stage.",
  "inventory.getContainerLocation": "Get the location/address for a container ID.",
};