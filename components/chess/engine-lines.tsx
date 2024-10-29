import { FileText, RefreshCw, Cog } from "lucide-react";

interface EngineLinesSectionProps {
    showEngineLines: boolean;
    engineLines: string | null;
    reachedDepth: number | null;
    engineDepth: number;
  }
  
export const EngineLinesSection: React.FC<EngineLinesSectionProps> = ({ showEngineLines, engineLines, reachedDepth, engineDepth }) => (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mb-2"></div>
      {showEngineLines && (
        <div className="bg-amber-100 shadow-lg rounded-lg p-5 mb-2 w-full max-w-md">
          {engineLines && (
            <div className="flex items-center mb-3">
              <FileText className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-sm font-semibold text-amber-900">{engineLines}</span>
            </div>
          )}
          {reachedDepth !== null && (
            <div className="flex items-center">
              {reachedDepth < engineDepth ? (
                <RefreshCw className="w-5 h-5 text-blue-500 mr-3 animate-spin" />
              ) : (
                <Cog className="w-5 h-5 text-gray-500 mr-3" />
              )}
              <span className="text-sm font-semibold text-amber-900">
                Depth {reachedDepth} / {engineDepth}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );