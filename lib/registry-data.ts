export type RegistryTweak = {
  id: string;
  title: string;
  description: string;
  category: string;
  enableCode: string;
  disableCode: string;
};

export type Category = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const categories: Category[] = [
  {
    id: 'performance',
    title: 'Performance',
    description: 'Tweaks to improve system performance',
    icon: 'zap',
  },
  {
    id: 'privacy',
    title: 'Privacy',
    description: 'Enhance your system privacy',
    icon: 'shield',
  },
  {
    id: 'ui',
    title: 'User Interface',
    description: 'Customize Windows appearance',
    icon: 'layout',
  },
  {
    id: 'network',
    title: 'Network',
    description: 'Network and internet related tweaks',
    icon: 'wifi',
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    description: 'Tweaks to improve accessibility',
    icon: 'person-standing',
  },
  {
    id: 'gaming',
    title: 'Gaming',
    description: 'Tweaks for gaming performance',
    icon: 'gamepad-2',
  },
  {
    id: 'system',
    title: 'System',
    description: 'General system-level tweaks',
    icon: 'settings',
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Tweaks to enhance system security',
    icon: 'lock',
  },
];

export const tweaks: RegistryTweak[] = [
  {
    id: 'disable-telemetry',
    title: 'Disable Telemetry',
    description: 'Disable Windows telemetry and data collection',
    category: 'privacy',
    enableCode: `Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\DataCollection]
"AllowTelemetry"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\DataCollection]
"AllowTelemetry"=dword:00000001`,
  },
  {
    id: 'disable-animations',
    title: 'Disable Animations',
    description: 'Disable Windows animations for better performance',
    category: 'performance',
    enableCode: `Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Control Panel\Desktop\WindowMetrics]
"MinAnimate"="0"`,
    disableCode: `Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Control Panel\Desktop\WindowMetrics]
"MinAnimate"="1"`,
  },
  {
    id: 'dark-title-bars',
    title: 'Dark Title Bars',
    description: 'Enable dark mode for window title bars',
    category: 'ui',
    enableCode: `Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\DWM]
"EnableWindowColorization"=dword:00000001
"ColorPrevalence"=dword:00000001`,
    disableCode: `Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\DWM]
"EnableWindowColorization"=dword:00000000
"ColorPrevalence"=dword:00000000`,
  },
  {
    id: 'accessibility.ts',
    title: 'Accessibility Tweaks',
    description: 'Enhance accessibility features in Windows',
    category: 'accessibility',
    enableCode: `Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Control Panel\Accessibility]
"EnableMouseKeys"=dword:00000001
"EnableHighContrast"=dword:00000001
"EnableStickyKeys"=dword:00000001
"EnableToggleKeys"=dword:00000001`,
    disableCode: `Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Control Panel\Accessibility]
"EnableMouseKeys"=dword:00000000
"EnableHighContrast"=dword:00000000
"EnableStickyKeys"=dword:00000000
"EnableToggleKeys"=dword:00000000`,
  },
  {
    id: 'gaming.ts',
    title: 'Gaming Optimizations',
    description: 'Improve gaming performance and experience',
    category: 'gaming',
    enableCode: `Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\GameDVR]
"AppCaptureEnabled"=dword:00000000
[HKEY_CURRENT_USER\System\GameConfigStore]
"GameDVR_Enabled"=dword:00000000
[HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\StorageSense\Parameters\StoragePolicy]
"01"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\GameDVR]
"AppCaptureEnabled"=dword:00000001
[HKEY_CURRENT_USER\System\GameConfigStore]
"GameDVR_Enabled"=dword:00000001
[HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\StorageSense\Parameters\StoragePolicy]
"01"=dword:00000001`,
  },
  {
    id: 'system.ts',
    title: 'System Tweaks',
    description: 'General system-level optimizations',
    category: 'system',
    enableCode: `Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Control Panel\Desktop]
"AutoEndTasks"="1"
"HungAppTimeout"="1000"
"MenuShowDelay"="0"
"WaitToKillAppTimeout"="2000"
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\System]
"DisableTaskMgr"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Control Panel\Desktop]
"AutoEndTasks"="0"
"HungAppTimeout"="5000"
"MenuShowDelay"="400"
"WaitToKillAppTimeout"="20000"
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\System]
"DisableTaskMgr"=dword:00000001`,
  },
  {
    id: 'security.ts',
    title: 'Security Enhancements',
    description: 'Tweaks to improve system security',
    category: 'security',
    enableCode: `Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System]
"ConsentPromptBehaviorAdmin"=dword:00000005
"EnableLUA"=dword:00000001
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Lsa]
"LimitBlankPasswordUse"=dword:00000001
"RestrictAnonymous"=dword:00000001`,
    disableCode: `Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System]
"ConsentPromptBehaviorAdmin"=dword:00000000
"EnableLUA"=dword:00000000
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Lsa]
"LimitBlankPasswordUse"=dword:00000000
"RestrictAnonymous"=dword:00000000`,
  },
];
