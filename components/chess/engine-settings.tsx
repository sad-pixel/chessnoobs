import { Switch } from "@/components/ui/switch";
import { Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface EngineSettingsProps {
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
    showAnnotations: boolean;
    setShowAnnotations: (show: boolean) => void;
  }
  
export const EngineSettings: React.FC<EngineSettingsProps> = ({
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
    showAnnotations,
    setShowAnnotations,
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex-1 bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors">
          <Cog className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-amber-50 shadow-md rounded-lg p-4">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-amber-800">Engine Depth</label>
          <input
            type="number"
            value={engineDepth}
            onChange={(e) => setEngineDepth(Number(e.target.value))}
            min="1"
            max="24"
            className="border rounded p-1 bg-amber-50 text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <div className="flex gap-2">
            {[10, 15, 20, 30, 50].map((depth) => (
              <Button key={depth} onClick={() => setEngineDepth(depth)} size="sm" variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors">
                {depth}
              </Button>
            ))}
          </div>
          <label className="flex items-center text-sm font-medium text-amber-800">
            <Switch checked={showEvalBar} onCheckedChange={() => setShowEvalBar(!showEvalBar)} className="mr-2" />
            Show Evaluation Bar
          </label>
          <label className="flex items-center text-sm font-medium text-amber-800">
            <Switch checked={showEngineLines} onCheckedChange={() => setShowEngineLines(!showEngineLines)} className="mr-2" />
            Show Engine Lines
          </label>
          <label className="flex items-center text-sm font-medium text-amber-800">
            <Switch checked={showAnnotations} onCheckedChange={() => setShowAnnotations(!showAnnotations)} className="mr-2" />
            Show Annotations
          </label>
          <label className="flex items-center text-sm font-medium text-amber-800">
            <Switch checked={playVsEngine} onCheckedChange={() => setPlayVsEngine(!playVsEngine)} className="mr-2" />
            Play vs Engine
          </label>
          {playVsEngine && (
            <label className="flex items-center text-sm font-medium text-amber-800">
              <span className="mr-2">Engine Plays:</span>
              <div className="flex items-center">
                <span className="mr-2">White</span>
                <Switch
                  checked={engineColor === 'b'}
                  onCheckedChange={() => setEngineColor(engineColor === 'w' ? 'b' : 'w')}
                  className="mr-2"
                />
                <span>Black</span>
              </div>
            </label>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
  