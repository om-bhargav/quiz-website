export type PlanType = {
  id: string;
  title: string;
  description: string;
  tokens: number;
  price: number;
  status: "DRAFT" | "ACTIVATED" | "DEACTIVATED";
};