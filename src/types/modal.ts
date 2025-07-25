export type ModelRowTypes = "all" | "buttons" | "input" | "list";

export interface ModalInputSelectIconEntry {
  id: string;
  title: string;
  iconType: "fill" | "stroke";
  icon: JSX.Element;
}
