import { RegistryTweak } from "@/types/registry";

export const privacyTweaks: RegistryTweak[] = [
  {
    id: "disable-telemetry",
    title: "Disable Telemetry",
    description: "Disable Windows telemetry and data collection",
    category: "privacy",
    systemImpact: "low",
    compatibility: "Win10/11",
    warning: "May affect Windows Update functionality",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection]
"AllowTelemetry"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection]
"AllowTelemetry"=dword:00000001`
  },
  {
    id: "disable-advertising-id",
    title: "Disable Advertising ID",
    description: "Disable Windows Advertising ID tracking",
    category: "privacy",
    systemImpact: "low",
    compatibility: "Win10/11",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo]
"Enabled"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo]
"Enabled"=dword:00000001`
  },
  {
    id: "disable-timeline",
    title: "Disable Activity History",
    description: "Disable Windows Timeline and Activity History",
    category: "privacy",
    systemImpact: "low",
    compatibility: "Win10/11",
    warning: "Will affect Timeline feature functionality",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\System]
"EnableActivityFeed"=dword:00000000
"PublishUserActivities"=dword:00000000
"UploadUserActivities"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\System]
"EnableActivityFeed"=dword:00000001
"PublishUserActivities"=dword:00000001
"UploadUserActivities"=dword:00000001`
  },
  {
    id: "disable-location-tracking",
    title: "Disable Location Tracking",
    description: "Disable Windows location services and tracking",
    category: "privacy",
    systemImpact: "medium",
    compatibility: "Win10/11",
    warning: "Will affect location-based apps and services",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\location]
"Value"="Deny"`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\location]
"Value"="Allow"`
  },
  {
    id: "disable-feedback",
    title: "Disable Feedback",
    description: "Disable Windows Feedback requests and notifications",
    category: "privacy",
    systemImpact: "low",
    compatibility: "Win10/11",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Siuf\\Rules]
"NumberOfSIUFInPeriod"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Siuf\\Rules]
"NumberOfSIUFInPeriod"=dword:00000001`
  }
];