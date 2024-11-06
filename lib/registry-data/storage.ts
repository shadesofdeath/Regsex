import { RegistryTweak } from "@/types/registry";

export const storageTweaks: RegistryTweak[] = [
  {
    id: "disable-storage-sense",
    title: "Disable Storage Sense",
    description: "Disable automatic disk cleanup and management",
    category: "storage",
    systemImpact: "low",
    compatibility: "Win10/11",
    warning: "You'll need to manage disk space manually",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\StorageSense]
"AllowStorageSenseGlobal"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\StorageSense]
"AllowStorageSenseGlobal"=dword:00000001`
  },
  {
    id: "optimize-ntfs",
    title: "Optimize NTFS Performance",
    description: "Enhance NTFS file system performance",
    category: "storage",
    systemImpact: "medium",
    compatibility: "Win10/11",
    requiresRestart: true,
    warning: "May affect system stability on some configurations",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\FileSystem]
"NtfsDisableLastAccessUpdate"=dword:00000001
"NtfsMemoryUsage"=dword:00000002`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\FileSystem]
"NtfsDisableLastAccessUpdate"=dword:00000000
"NtfsMemoryUsage"=dword:00000001`
  }
];