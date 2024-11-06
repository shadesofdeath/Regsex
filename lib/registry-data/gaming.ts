import { RegistryTweak } from "@/types/registry";

export const gamingTweaks: RegistryTweak[] = [
  {
    id: "game-dvr-disable",
    title: "Disable Game DVR",
    description: "Disable Windows Game DVR for better gaming performance",
    category: "gaming",
    systemImpact: "medium",
    compatibility: "Win10/11",
    warning: "This will disable game recording and broadcasting features",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\System\\GameConfigStore]
"GameDVR_Enabled"=dword:00000000

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR]
"AllowGameDVR"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\System\\GameConfigStore]
"GameDVR_Enabled"=dword:00000001

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR]
"AllowGameDVR"=dword:00000001`
  },
  {
    id: "game-mode-optimization",
    title: "Optimize Game Mode",
    description: "Enhanced Game Mode settings for better performance",
    category: "gaming",
    systemImpact: "medium",
    compatibility: "Win10/11",
    warning: "May affect background applications while gaming",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Software\\Microsoft\\GameBar]
"AllowAutoGameMode"=dword:00000001
"AutoGameModeEnabled"=dword:00000001`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Software\\Microsoft\\GameBar]
"AllowAutoGameMode"=dword:00000000
"AutoGameModeEnabled"=dword:00000000`
  },
  {
    id: "fullscreen-optimization",
    title: "Disable Fullscreen Optimizations",
    description: "Disable Windows fullscreen optimizations for games",
    category: "gaming",
    systemImpact: "low",
    compatibility: "Win10/11",
    warning: "May affect some games' performance",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\System\\GameConfigStore]
"GameDVR_FSEBehaviorMode"=dword:00000002
"GameDVR_HonorUserFSEBehaviorMode"=dword:00000001
"GameDVR_FSEBehavior"=dword:00000002`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\System\\GameConfigStore]
"GameDVR_FSEBehaviorMode"=dword:00000000
"GameDVR_HonorUserFSEBehaviorMode"=dword:00000000
"GameDVR_FSEBehavior"=dword:00000000`
  },
  {
    id: "game-priority",
    title: "Optimize Game Priority",
    description: "Set higher priority for games",
    category: "gaming",
    systemImpact: "medium",
    compatibility: "Win10/11",
    warning: "May affect system responsiveness during gaming",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games]
"GPU Priority"=dword:00000008
"Priority"=dword:00000006
"Scheduling Category"="High"
"SFIO Priority"="High"`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games]
"GPU Priority"=dword:00000000
"Priority"=dword:00000002
"Scheduling Category"="Medium"
"SFIO Priority"="Normal"`
  },
  {
    id: "mouse-acceleration",
    title: "Disable Mouse Acceleration",
    description: "Disable mouse acceleration for better gaming accuracy",
    category: "gaming",
    systemImpact: "low",
    compatibility: "Win10/11",
    warning: "Will affect mouse behavior system-wide",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Control Panel\\Mouse]
"MouseSpeed"="0"
"MouseThreshold1"="0"
"MouseThreshold2"="0"`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Control Panel\\Mouse]
"MouseSpeed"="1"
"MouseThreshold1"="6"
"MouseThreshold2"="10"`
  }
];