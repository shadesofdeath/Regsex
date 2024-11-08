"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { RegistryTweak } from "@/types/registry"
import { Download, Upload, PlayCircle, Search, AlertTriangle, Info, Zap, Copy, Save } from "lucide-react"
import { toast } from "sonner"
import JSZip from 'jszip'

interface BatchOperationsProps {
  tweaks: RegistryTweak[]
  selectedCategory: string | null
}

const convertToCMD = (regCode: string): string => {
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

const convertToPowerShell = (regCode: string): string => {
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

export function BatchOperations({ tweaks, selectedCategory }: BatchOperationsProps) {
  const [selectedTweaks, setSelectedTweaks] = useState<Record<string, 'enable' | 'disable'>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [previewFormat, setPreviewFormat] = useState<'reg' | 'cmd' | 'ps1'>('reg')
  const [previewContent, setPreviewContent] = useState("")
  const [editedContent, setEditedContent] = useState("")

  const filteredTweaks = tweaks.filter(tweak => 
    (selectedCategory ? tweak.category === selectedCategory : true) &&
    (tweak.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tweak.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const generateContent = (format: 'reg' | 'cmd' | 'ps1') => {
    const selectedEntries = Object.entries(selectedTweaks).filter(([_, value]) => value);
    
    if (format === 'reg') {
      return "Windows Registry Editor Version 5.00\n\n" + 
        selectedEntries
          .map(([tweakId, action]) => {
            const [id, _] = tweakId.split('-');
            const tweak = tweaks.find(t => t.id === id);
            if (!tweak) return '';
            const code = action === 'enable' ? tweak.enableCode : tweak.disableCode;
            return `; ${tweak.title} - ${action === 'enable' ? 'Etkinleştir' : 'Devre Dışı Bırak'}\n${code.replace("Windows Registry Editor Version 5.00\n\n", "")}`;
          })
          .filter(Boolean)
          .join("\n\n");
    } else if (format === 'cmd') {
      return selectedEntries
        .map(([tweakId, action]) => {
          const [id, _] = tweakId.split('-');
          const tweak = tweaks.find(t => t.id === id);
          if (!tweak) return '';
          const code = action === 'enable' ? tweak.enableCode : tweak.disableCode;
          return `:: ${tweak.title} - ${action === 'enable' ? 'Etkinleştir' : 'Devre Dışı Bırak'}\n${convertToCMD(code)}`;
        })
        .filter(Boolean)
        .join("\n\nREM --------------------------------\n\n");
    } else {
      return selectedEntries
        .map(([tweakId, action]) => {
          const [id, _] = tweakId.split('-');
          const tweak = tweaks.find(t => t.id === id);
          if (!tweak) return '';
          const code = action === 'enable' ? tweak.enableCode : tweak.disableCode;
          return `# ${tweak.title} - ${action === 'enable' ? 'Etkinleştir' : 'Devre Dışı Bırak'}\n${convertToPowerShell(code)}`;
        })
        .filter(Boolean)
        .join("\n\n# --------------------------------\n\n");
    }
  }

  const handleExport = async (format: 'reg' | 'cmd' | 'ps1' | 'zip', useEdited: boolean = false) => {
    const selectedEntries = Object.entries(selectedTweaks).filter(([_, value]) => value);
    if (selectedEntries.length === 0) {
      toast.error("Lütfen en az bir tweak seçin!");
      return;
    }
    
    if (format === 'zip') {
      const zip = new JSZip()
      
      selectedEntries.forEach(([tweakId, action]) => {
        const [id, _] = tweakId.split('-');
        const tweak = tweaks.find(t => t.id === id);
        if (!tweak) return;
        
        const code = action === 'enable' ? tweak.enableCode : tweak.disableCode;
        const fileName = `${tweak.id}_${action}`;
        
        // REG file
        zip.file(`${fileName}.reg`, `Windows Registry Editor Version 5.00\n\n; ${tweak.title} - ${action === 'enable' ? 'Etkinleştir' : 'Devre Dışı Bırak'}\n${code.replace("Windows Registry Editor Version 5.00\n\n", "")}`);
        
        // CMD file
        const cmdCode = convertToCMD(code);
        zip.file(`${fileName}.cmd`, `:: ${tweak.title} - ${action === 'enable' ? 'Etkinleştir' : 'Devre Dışı Bırak'}\n${cmdCode}`);
        
        // PowerShell file
        const psCode = convertToPowerShell(code);
        zip.file(`${fileName}.ps1`, `# ${tweak.title} - ${action === 'enable' ? 'Etkinleştir' : 'Devre Dışı Bırak'}\n${psCode}`);
      });
      
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'windows-tweaks.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("ZIP dosyası başarıyla indirildi!");
      return;
    }

    const content = useEdited ? editedContent : generateContent(format);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `selected-tweaks.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`${format.toUpperCase()} dosyası başarıyla indirildi!`);
  }

  const handlePreview = (format: 'reg' | 'cmd' | 'ps1') => {
    setPreviewFormat(format);
    const content = generateContent(format);
    setPreviewContent(content);
    setEditedContent(content);
    setShowPreview(true);
  }

  const handleSelectAll = () => {
    if (Object.keys(selectedTweaks).length === filteredTweaks.length * 2) {
      setSelectedTweaks({});
    } else {
      const newSelected: Record<string, 'enable' | 'disable'> = {};
      filteredTweaks.forEach(tweak => {
        newSelected[`${tweak.id}-enable`] = 'enable';
        newSelected[`${tweak.id}-disable`] = 'disable';
      });
      setSelectedTweaks(newSelected);
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <PlayCircle className="h-4 w-4" />
            Toplu İşlemler
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Toplu İşlemler</DialogTitle>
            <DialogDescription>
              Birden fazla tweaki seçip dışa aktarın veya uygulayın
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-between items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tweak ara..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {Object.keys(selectedTweaks).length === filteredTweaks.length * 2 ? "Tümünü Kaldır" : "Tümünü Seç"}
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreview('reg')}
                  disabled={Object.keys(selectedTweaks).length === 0}
                  className="gap-2"
                >
                  <Search className="h-4 w-4" />
                  REG
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreview('cmd')}
                  disabled={Object.keys(selectedTweaks).length === 0}
                  className="gap-2"
                >
                  <Search className="h-4 w-4" />
                  CMD
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreview('ps1')}
                  disabled={Object.keys(selectedTweaks).length === 0}
                  className="gap-2"
                >
                  <Search className="h-4 w-4" />
                  PS1
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport('zip')}
                  disabled={Object.keys(selectedTweaks).length === 0}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  ZIP
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[400px] rounded-md border p-4">
              <div className="space-y-4">
                {filteredTweaks.map(tweak => (
                  <div key={tweak.id} className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none">
                          {tweak.title}
                        </label>
                        <p className="text-sm text-muted-foreground">
                          {tweak.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {tweak.requiresRestart && (
                            <Badge variant="secondary" className="gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Yeniden Başlatma Gerektirir
                            </Badge>
                          )}
                          {tweak.systemImpact && (
                            <Badge 
                              variant={tweak.systemImpact === "high" ? "destructive" : "outline"}
                              className="gap-1"
                            >
                              <AlertTriangle className="h-3 w-3" />
                              {tweak.systemImpact === "high" ? "Yüksek" : tweak.systemImpact === "medium" ? "Orta" : "Düşük"} Etki
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
                      </div>
                    </div>
                    <div className="flex gap-4 ml-8">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${tweak.id}-enable`}
                          checked={selectedTweaks[`${tweak.id}-enable`] === 'enable'}
                          onCheckedChange={(checked) => {
                            setSelectedTweaks(prev => ({
                              ...prev,
                              [`${tweak.id}-enable`]: checked ? 'enable' : undefined
                            }))
                          }}
                        />
                        <label
                          htmlFor={`${tweak.id}-enable`}
                          className="text-sm font-medium leading-none"
                        >
                          Etkinleştir
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${tweak.id}-disable`}
                          checked={selectedTweaks[`${tweak.id}-disable`] === 'disable'}
                          onCheckedChange={(checked) => {
                            setSelectedTweaks(prev => ({
                              ...prev,
                              [`${tweak.id}-disable`]: checked ? 'disable' : undefined
                            }))
                          }}
                        />
                        <label
                          htmlFor={`${tweak.id}-disable`}
                          className="text-sm font-medium leading-none"
                        >
                          Devre Dışı Bırak
                        </label>
                      </div>
                    </div>
                    {tweak.warning && (
                      <p className="text-sm text-yellow-500 mt-1 ml-8">
                        Uyarı: {tweak.warning}
                      </p>
                    )}
                  </div>
                ))}
                {filteredTweaks.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    Aramanızla eşleşen tweak bulunamadı
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Önizleme - {previewFormat.toUpperCase()}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Tabs value={previewFormat} onValueChange={(v) => handlePreview(v as 'reg' | 'cmd' | 'ps1')}>
                <TabsList>
                  <TabsTrigger value="reg">Registry</TabsTrigger>
                  <TabsTrigger value="cmd">CMD</TabsTrigger>
                  <TabsTrigger value="ps1">PowerShell</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditedContent(previewContent);
                    toast.success("Değişiklikler sıfırlandı!");
                  }}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Sıfırla
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(editedContent);
                    toast.success("İçerik panoya kopyalandı!");
                  }}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Kopyala
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport(previewFormat, true)}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  İndir
                </Button>
              </div>
            </div>
            <div className="relative rounded-md border">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[500px] font-mono text-sm resize-none p-4"
                placeholder="Düzenlemek için tıklayın..."
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}