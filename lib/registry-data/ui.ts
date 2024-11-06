import { RegistryTweak } from "@/types/registry";

export const uiTweaks: RegistryTweak[] = [
  {
    id: "dark-title-bars",
    title: "Dark Title Bars",
    description: "Enable dark mode for window title bars",
    category: "ui",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\DWM]
"EnableWindowColorization"=dword:00000001
"ColorPrevalence"=dword:00000001`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\DWM]
"EnableWindowColorization"=dword:00000000
"ColorPrevalence"=dword:00000000`
  },
  {
    id: "taskbar-transparency",
    title: "Taskbar Transparency",
    description: "Enable transparency effect for the taskbar",
    category: "ui",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced]
"UseOLEDTaskbarTransparency"=dword:00000001`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced]
"UseOLEDTaskbarTransparency"=dword:00000000`
  }
];