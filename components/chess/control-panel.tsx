import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { RotateCw, Upload, FileText, Download, Copy, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EngineSettings } from "@/components/chess/engine-settings";

interface ControlPanelProps {
    flipBoard: () => void;
    loadFEN: (fen: string) => void;
    loadPGN: (pgn: string) => void;
    copyFEN: () => void;
    exportLinkWithFEN: () => void;
    engineDepth: number;
    setEngineDepth: (depth: number) => void;
    showEvalBar: boolean;
    setShowEvalBar: (show: boolean) => void;
    showEngineLines: boolean;
    setShowEngineLines: (show: boolean) => void;
    playVsEngine: boolean;
    setPlayVsEngine: (play: boolean) => void;
    engineColor: 'w' | 'b';
    setEngineColor: (color: 'w' | 'b') => void;
  }
  
 export const ControlPanel: React.FC<ControlPanelProps> = ({
    flipBoard,
    loadFEN,
    loadPGN,
    copyFEN,
    exportLinkWithFEN,
    engineDepth,
    setEngineDepth,
    showEvalBar,
    setShowEvalBar,
    showEngineLines,
    setShowEngineLines,
    playVsEngine,
    setPlayVsEngine,
    engineColor,
    setEngineColor,
  }) => (
    <div className="flex flex-wrap gap-4 mt-4 w-full justify-center">
      <Button onClick={flipBoard} size="sm" className="flex-1 bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors">
        <RotateCw className="w-4 h-4 mr-2" />
        Flip
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" className="flex-1 bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Load
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-amber-50 shadow-lg rounded-lg p-3">
          <div className="flex flex-col gap-2">
            <Button onClick={() => loadFEN(prompt('Enter FEN:') || '')} size="sm" className="bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors">
              <FileText className="w-4 h-4 mr-2" />
              Load FEN
            </Button>
            <Button onClick={() => loadPGN(prompt('Enter PGN:') || '')} size="sm" className="bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors">
              <FileText className="w-4 h-4 mr-2" />
              Load PGN
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" className="flex-1 bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-amber-50 shadow-lg rounded-lg p-3">
          <div className="flex flex-col gap-2">
            <Button onClick={copyFEN} size="sm" className="bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors">
              <Copy className="w-4 h-4 mr-2" />
              Copy FEN
            </Button>
            <Button onClick={exportLinkWithFEN} size="sm" className="bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors">
              <Link className="w-4 h-4 mr-2" />
              Export Link (FEN)
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <EngineSettings
        engineDepth={engineDepth}
        setEngineDepth={setEngineDepth}
        showEvalBar={showEvalBar}
        setShowEvalBar={setShowEvalBar}
        showEngineLines={showEngineLines}
        setShowEngineLines={setShowEngineLines}
        playVsEngine={playVsEngine}
        setPlayVsEngine={setPlayVsEngine}
        engineColor={engineColor}
        setEngineColor={setEngineColor}
      />
    </div>
  );