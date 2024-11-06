import { RegistryTweak } from "@/types/registry";

export const powerTweaks: RegistryTweak[] = [
  {
    id: "ultimate-power",
    title: "Ultimate Performance Power Plan",
    description: "Enable hidden Ultimate Performance power plan",
    category: "power",
    systemImpact: "high",
    compatibility: "Win10/11",
    warning: "Will increase power consumption significantly. Not recommended for laptops on battery",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerSettings]
"Attributes"=dword:00000002`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerSettings]
"Attributes"=dword:00000001`
  },
  {
    id: "disable-hibernation",
    title: "Disable Hibernation",
    description: "Disable system hibernation to free up disk space",
    category: "power",
    requiresRestart: true,
    systemImpact: "medium",
    compatibility: "Win10/11",
    warning: "Will remove hiberfil.sys file and disable hibernation feature",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Power]
"HibernateEnabled"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Power]
"HibernateEnabled"=dword:00000001`
  }
];