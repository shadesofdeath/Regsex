export type RegistryTweak = {
  id: string;
  title: string;
  description: string;
  category: string;
  enableCode: string;
  disableCode: string;
  requiresRestart?: boolean;
  systemImpact?: "low" | "medium" | "high";
  compatibility?: string;
  warning?: string;
};

export type Category = {
  id: string;
  title: string;
  description: string;
  icon: string;
};