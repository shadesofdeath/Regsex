import { RegistryTweak } from "@/types/registry";

export const performanceTweaks: RegistryTweak[] = [
  {
    id: "disable-animations",
    title: "Disable Animations",
    description: "Disable Windows animations for better performance",
    category: "performance",
    systemImpact: "low",
    compatibility: "Win10/11",
    warning: "May affect visual experience but can improve performance on lower-end systems",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Control Panel\\Desktop\\WindowMetrics]
"MinAnimate"="0"`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Control Panel\\Desktop\\WindowMetrics]
"MinAnimate"="1"`
  },
  {
    id: "optimize-memory",
    title: "Optimize Memory Management",
    description: "Enhance system memory management for better performance",
    category: "performance",
    requiresRestart: true,
    systemImpact: "high",
    compatibility: "Win10/11",
    warning: "This tweak modifies system memory management. Create a system restore point before applying.",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management]
"DisablePagingExecutive"=dword:00000001
"LargeSystemCache"=dword:00000000`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management]
"DisablePagingExecutive"=dword:00000000
"LargeSystemCache"=dword:00000001"`
  },
  {
    id: "fsutil-optimization",
    title: "File System Optimization",
    description: "Optimize NTFS settings for better disk performance",
    category: "performance",
    requiresRestart: true,
    systemImpact: "medium",
    compatibility: "Win10/11",
    warning: "This tweak affects file system behavior. Backup important data before applying.",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\FileSystem]
"NtfsMemoryUsage"=dword:00000002
"NtfsDisableLastAccessUpdate"=dword:00000001`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\FileSystem]
"NtfsMemoryUsage"=dword:00000001
"NtfsDisableLastAccessUpdate"=dword:00000000"`
  },
  {
    id: "visual-effects",
    title: "Optimize Visual Effects",
    description: "Optimize visual effects for better performance",
    category: "performance",
    systemImpact: "medium",
    compatibility: "Win10/11",
    warning: "Will reduce visual effects but improve performance",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects]
"VisualFXSetting"=dword:00000002`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects]
"VisualFXSetting"=dword:00000000`
  },
  {
    id: "processor-scheduling",
    title: "Optimize Processor Scheduling",
    description: "Adjust processor scheduling for better performance",
    category: "performance",
    systemImpact: "medium",
    compatibility: "Win10/11",
    requiresRestart: true,
    warning: "May affect background tasks",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl]
"Win32PrioritySeparation"=dword:00000026`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl]
"Win32PrioritySeparation"=dword:00000002`
  },
  {
    id: "menu-show-delay",
    title: "Reduce Menu Show Delay",
    description: "Decrease the delay before menus appear",
    category: "performance",
    systemImpact: "low",
    compatibility: "Win10/11",
    enableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Control Panel\\Desktop]
"MenuShowDelay"="8"`,
    disableCode: `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Control Panel\\Desktop]
"MenuShowDelay"="400"`
  }
];