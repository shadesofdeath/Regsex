"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RegistryTweak } from "@/types/registry"
import { toast } from "sonner"
import { Copy, Download, AlertTriangle, Info, Zap } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TweakCardProps {
  tweak: RegistryTweak;
  viewMode?: "grid" | "list";
}

export function TweakCard({ tweak, viewMode = "grid" }: TweakCardProps) {
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success("Code copied to clipboard!")
  }

  const downloadFile = (code: string, type: string, extension: string) => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${tweak.id}-${type}.${extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`${extension.toUpperCase()} file downloaded!`)
  }

  const convertToCMD = (regCode: string) => {
    const lines = regCode.split('\n').filter(line => line.trim() && !line.includes('Windows Registry Editor'));
    let cmdCommands = '';

    let currentPath = '';
    lines.forEach(line => {
      if (line.startsWith('[') && line.endsWith(']')) {
        currentPath = line.slice(1, -1);
        cmdCommands += `REG ADD "${currentPath}" /f\n`;
      } else if (line.includes('=')) {
        const [name, value] = line.split('=');
        const cleanName = name.trim().replace(/"/g, '');
        const cleanValue = value.trim().replace(/"/g, '');
        
        if (cleanValue.startsWith('dword:')) {
          const dwordValue = cleanValue.replace('dword:', '');
          cmdCommands += `REG ADD "${currentPath}" /v "${cleanName}" /t REG_DWORD /d ${dwordValue} /f\n`;
        } else {
          cmdCommands += `REG ADD "${currentPath}" /v "${cleanName}" /t REG_SZ /d "${cleanValue}" /f\n`;
        }
      }
    });

    return cmdCommands.trim();
  }

  const convertToPowerShell = (regCode: string) => {
    const lines = regCode.split('\n').filter(line => line.trim() && !line.includes('Windows Registry Editor'));
    let psCommands = '';

    let currentPath = '';
    lines.forEach(line => {
      if (line.startsWith('[') && line.endsWith(']')) {
        currentPath = line.slice(1, -1);
        const pspath = currentPath.replace('HKEY_LOCAL_MACHINE', 'HKLM:').replace('HKEY_CURRENT_USER', 'HKCU:');
        psCommands += `New-Item -Path "${pspath}" -Force | Out-Null\n`;
      } else if (line.includes('=')) {
        const [name, value] = line.split('=');
        const cleanName = name.trim().replace(/"/g, '');
        const cleanValue = value.trim().replace(/"/g, '');
        const pspath = currentPath.replace('HKEY_LOCAL_MACHINE', 'HKLM:').replace('HKEY_CURRENT_USER', 'HKCU:');
        
        if (cleanValue.startsWith('dword:')) {
          const dwordValue = parseInt(cleanValue.replace('dword:', ''), 16);
          psCommands += `Set-ItemProperty -Path "${pspath}" -Name "${cleanName}" -Value ${dwordValue} -Type DWord\n`;
        } else {
          psCommands += `Set-ItemProperty -Path "${pspath}" -Name "${cleanName}" -Value "${cleanValue}"\n`;
        }
      }
    });

    return psCommands.trim();
  }

  const renderCodeBlock = (code: string, type: string, mode: 'enable' | 'disable') => {
    let finalCode = code;
    if (type === 'cmd') finalCode = convertToCMD(code);
    if (type === 'powershell') finalCode = convertToPowerShell(code);

    const extension = type === 'reg' ? 'reg' : type === 'cmd' ? 'cmd' : 'ps1';

    return (
      <div className="relative">
        <div className="absolute right-2 top-2 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(finalCode)}
                  className="hover:bg-primary/20"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => downloadFile(finalCode, mode, extension)}
                  className="hover:bg-primary/20"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download .{extension} file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="rounded-md bg-muted p-4 mt-2 font-mono text-sm overflow-x-auto">
          <pre className="whitespace-pre-wrap break-all">{finalCode}</pre>
        </div>
      </div>
    );
  };

  if (viewMode === "list") {
    return (
      <div className="flex items-start gap-4 p-4 rounded-lg border hover:shadow-md transition-shadow">
        <div className="flex-1">
          <div className="mb-2">
            <h3 className="font-semibold">{tweak.title}</h3>
            <p className="text-sm text-muted-foreground">{tweak.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {tweak.requiresRestart && (
              <Badge variant="secondary" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                Requires Restart
              </Badge>
            )}
            {tweak.systemImpact && (
              <Badge 
                variant={tweak.systemImpact === "high" ? "destructive" : "outline"}
                className="gap-1"
              >
                <AlertTriangle className="h-3 w-3" />
                {tweak.systemImpact.charAt(0).toUpperCase() + tweak.systemImpact.slice(1)} Impact
              </Badge>
            )}
            {tweak.compatibility && (
              <Badge variant="outline" className="gap-1">
                <Info className="h-3 w-3" />
                {tweak.compatibility}
              </Badge>
            )}
            <Badge variant="secondary" className="gap-1">
              <Zap className="h-3 w-3" />
              {tweak.category.charAt(0).toUpperCase() + tweak.category.slice(1)}
            </Badge>
          </div>
          {tweak.warning && (
            <p className="text-sm text-yellow-500 mt-2">
              Warning: {tweak.warning}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(tweak.enableCode)}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadFile(tweak.enableCode, 'enable', 'reg')}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">{tweak.title}</CardTitle>
          <CardDescription className="text-base">{tweak.description}</CardDescription>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tweak.requiresRestart && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="secondary" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Requires Restart
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This tweak requires a system restart to take effect</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {tweak.systemImpact && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge 
                    variant={tweak.systemImpact === "high" ? "destructive" : "outline"}
                    className="gap-1"
                  >
                    <AlertTriangle className="h-3 w-3" />
                    {tweak.systemImpact.charAt(0).toUpperCase() + tweak.systemImpact.slice(1)} Impact
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Level of impact on system behavior</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {tweak.compatibility && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="gap-1">
                    <Info className="h-3 w-3" />
                    {tweak.compatibility}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Windows version compatibility</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <Badge variant="secondary" className="gap-1">
            <Zap className="h-3 w-3" />
            {tweak.category.charAt(0).toUpperCase() + tweak.category.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="enable" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="enable">Enable</TabsTrigger>
            <TabsTrigger value="disable">Disable</TabsTrigger>
          </TabsList>
          <TabsContent value="enable">
            <Tabs defaultValue="reg" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="reg">Registry</TabsTrigger>
                <TabsTrigger value="cmd">CMD</TabsTrigger>
                <TabsTrigger value="powershell">PowerShell</TabsTrigger>
              </TabsList>
              <TabsContent value="reg">
                {renderCodeBlock(tweak.enableCode, 'reg', 'enable')}
              </TabsContent>
              <TabsContent value="cmd">
                {renderCodeBlock(tweak.enableCode, 'cmd', 'enable')}
              </TabsContent>
              <TabsContent value="powershell">
                {renderCodeBlock(tweak.enableCode, 'powershell', 'enable')}
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="disable">
            <Tabs defaultValue="reg" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="reg">Registry</TabsTrigger>
                <TabsTrigger value="cmd">CMD</TabsTrigger>
                <TabsTrigger value="powershell">PowerShell</TabsTrigger>
              </TabsList>
              <TabsContent value="reg">
                {renderCodeBlock(tweak.disableCode, 'reg', 'disable')}
              </TabsContent>
              <TabsContent value="cmd">
                {renderCodeBlock(tweak.disableCode, 'cmd', 'disable')}
              </TabsContent>
              <TabsContent value="powershell">
                {renderCodeBlock(tweak.disableCode, 'powershell', 'disable')}
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
        {tweak.warning && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">{tweak.warning}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}