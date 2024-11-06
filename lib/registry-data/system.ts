import { RegistryTweak } from "@/types/registry";

export const systemTweaks: RegistryTweak[] = [
  {
    id: "disable-fast-startup",
    title: "Disable Fast Startup",
    description: "Disable Windows Fast Startup feature",
    category: "system",
    systemImpact: "medium",
    compatibility: "Win10/11",
    requiresRestart: true,
    warning: "May increase boot time but can prevent some system issues",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power]
"HiberbootEnabled"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power]
"HiberbootEnabled"=dword:00000001`
  },
  {
    id: "disable-system-restore",
    title: "Disable System Restore",
    description: "Disable System Restore to free up disk space",
    category: "system",
    systemImpact: "high",
    compatibility: "Win10/11",
    warning: "This will prevent system restore point creation",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\SystemRestore]
"DisableSR"=dword:00000001`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\SystemRestore]
"DisableSR"=dword:00000000`
  }
];