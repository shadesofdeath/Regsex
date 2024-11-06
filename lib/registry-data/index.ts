import { Category } from "@/types/registry";
import { performanceTweaks } from "./performance";
import { privacyTweaks } from "./privacy";
import { uiTweaks } from "./ui";
import { networkTweaks } from "./network";
import { gamingTweaks } from "./gaming";
import { securityTweaks } from "./security";
import { storageTweaks } from "./storage";
import { powerTweaks } from "./power";
import { systemTweaks } from "./system";
import { accessibilityTweaks } from "./accessibility";

export const categories: Category[] = [
  {
    id: "performance",
    title: "Performance",
    description: "Optimize system performance",
    icon: "zap"
  },
  {
    id: "privacy",
    title: "Privacy",
    description: "Enhance system privacy",
    icon: "shield"
  },
  {
    id: "ui",
    title: "User Interface",
    description: "Customize Windows appearance",
    icon: "layout"
  },
  {
    id: "network",
    title: "Network",
    description: "Network optimization tweaks",
    icon: "wifi"
  },
  {
    id: "gaming",
    title: "Gaming",
    description: "Optimize for gaming performance",
    icon: "gamepad-2"
  },
  {
    id: "security",
    title: "Security",
    description: "Enhance system security",
    icon: "lock"
  },
  {
    id: "storage",
    title: "Storage",
    description: "Optimize disk and storage",
    icon: "hard-drive"
  },
  {
    id: "power",
    title: "Power",
    description: "Battery and power tweaks",
    icon: "battery"
  },
  {
    id: "system",
    title: "System",
    description: "Core system modifications",
    icon: "settings"
  },
  {
    id: "accessibility",
    title: "Accessibility",
    description: "Accessibility enhancements",
    icon: "accessibility"
  }
];

export const tweaks = [
  ...performanceTweaks,
  ...privacyTweaks,
  ...uiTweaks,
  ...networkTweaks,
  ...gamingTweaks,
  ...securityTweaks,
  ...storageTweaks,
  ...powerTweaks,
  ...systemTweaks,
  ...accessibilityTweaks
];