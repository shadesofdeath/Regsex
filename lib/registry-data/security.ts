import { RegistryTweak } from "@/types/registry";

export const securityTweaks: RegistryTweak[] = [
  {
    id: "disable-remote-assistance",
    title: "Disable Remote Assistance",
    description: "Prevent remote assistance connections to your PC",
    category: "security",
    systemImpact: "low",
    compatibility: "Win10/11",
    warning: "This will prevent others from providing remote help",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Remote Assistance]
"fAllowToGetHelp"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Remote Assistance]
"fAllowToGetHelp"=dword:00000001`
  },
  {
    id: "disable-autorun",
    title: "Disable AutoRun",
    description: "Prevent automatic execution of programs from removable media",
    category: "security",
    systemImpact: "low",
    compatibility: "Win10/11",
    warning: "May affect USB device functionality",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer]
"NoDriveTypeAutoRun"=dword:000000ff`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer]
"NoDriveTypeAutoRun"=dword:00000091`
  }
];