export const registryCommands = {
  "system-features": [
    {
      title: "Windows Copilot",
      description: "Enable or disable Windows Copilot AI assistant",
      commands: {
        enable: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced]
"ShowCopilot"=dword:00000001`,
        disable: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced]
"ShowCopilot"=dword:00000000`
      }
    },
    {
      title: "Widgets",
      description: "Control the Windows widgets panel visibility",
      commands: {
        enable: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Dsh]
"AllowNewsAndInterests"=dword:00000001`,
        disable: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Dsh]
"AllowNewsAndInterests"=dword:00000000`
      }
    }
  ],
  "privacy-security": [
    {
      title: "Telemetry",
      description: "Control Windows diagnostic data collection",
      commands: {
        enable: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection]
"AllowTelemetry"=dword:00000001`,
        disable: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection]
"AllowTelemetry"=dword:00000000`
      }
    },
    {
      title: "Activity History",
      description: "Manage Windows activity history collection",
      commands: {
        enable: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\System]
"EnableActivityFeed"=dword:00000001`,
        disable: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\System]
"EnableActivityFeed"=dword:00000000`
      }
    }
  ]
};