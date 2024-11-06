import { RegistryTweak } from "@/types/registry";

export const accessibilityTweaks: RegistryTweak[] = [
  {
    id: "high-contrast",
    title: "High Contrast Theme",
    description: "Enable high contrast theme settings",
    category: "accessibility",
    systemImpact: "low",
    compatibility: "Win10/11",
    warning: "Will significantly change the visual appearance",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Control Panel\\Accessibility\\HighContrast]
"Flags"="122"
"High Contrast Scheme"="High Contrast Black"`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Control Panel\\Accessibility\\HighContrast]
"Flags"="0"
"High Contrast Scheme"=""`
  },
  {
    id: "sticky-keys",
    title: "Configure Sticky Keys",
    description: "Customize Sticky Keys behavior",
    category: "accessibility",
    systemImpact: "low",
    compatibility: "Win10/11",
    warning: "May affect keyboard behavior",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Control Panel\\Accessibility\\StickyKeys]
"Flags"="510"
"WindowsEffect"="3"`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Control Panel\\Accessibility\\StickyKeys]
"Flags"="506"
"WindowsEffect"="0"`
  }
];