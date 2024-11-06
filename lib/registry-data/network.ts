import { RegistryTweak } from "@/types/registry";

export const networkTweaks: RegistryTweak[] = [
  {
    id: "network-throttling",
    title: "Disable Network Throttling",
    description: "Disable Windows network throttling for better speeds",
    category: "network",
    systemImpact: "medium",
    compatibility: "Win10/11",
    warning: "May affect network stability",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile]
"NetworkThrottlingIndex"=dword:ffffffff`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile]
"NetworkThrottlingIndex"=dword:0000000a`
  },
  {
    id: "dns-cache",
    title: "Optimize DNS Cache",
    description: "Optimize DNS cache settings for faster browsing",
    category: "network",
    systemImpact: "low",
    compatibility: "Win10/11",
    warning: "May affect DNS resolution",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Dnscache\\Parameters]
"MaxCacheTtl"=dword:00002a30
"MaxNegativeCacheTtl"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Dnscache\\Parameters]
"MaxCacheTtl"=dword:00015180
"MaxNegativeCacheTtl"=dword:0000384`
  },
  {
    id: "network-auto-tuning",
    title: "Network Auto-Tuning",
    description: "Optimize network auto-tuning level",
    category: "network",
    systemImpact: "medium",
    compatibility: "Win10/11",
    warning: "May affect network performance",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters]
"EnableWsd"=dword:00000000
"Tcp1323Opts"=dword:00000001`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters]
"EnableWsd"=dword:00000001
"Tcp1323Opts"=dword:00000000`
  },
  {
    id: "wifi-power-saving",
    title: "Disable WiFi Power Saving",
    description: "Disable power saving for WiFi adapters",
    category: "network",
    systemImpact: "medium",
    compatibility: "Win10/11",
    warning: "Will increase power consumption",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerSettings\\19cbb8fa-5279-450e-9fac-8a3d5fedd0c1\\12bbebe6-58d6-4636-95bb-3217ef867c1a]
"Attributes"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerSettings\\19cbb8fa-5279-450e-9fac-8a3d5fedd0c1\\12bbebe6-58d6-4636-95bb-3217ef867c1a]
"Attributes"=dword:00000001`
  }
];