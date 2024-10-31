import { FileText, RefreshCw, Cog } from "lucide-react";

interface EngineLinesSectionProps {
    showEngineLines: boolean;
    engineLines: string | null;
    reachedDepth: number | null;
    engineDepth: number;
  }
  
export const EngineLinesSection: React.FC<EngineLinesSectionProps> = ({ showEngineLines, engineLines, reachedDepth, engineDepth }) => (
    <div className="flex-1 flex flex-col justify-center">
      {showEngineLines && engineLines && (
        <div className="bg-amber-100 shadow-lg rounded-lg p-5 mb-2 w-full max-w-md">
            <div className="flex mb-3">
              <FileText className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-sm font-semibold text-amber-900">{engineLines}</span>
            </div>
            {reachedDepth !== null && (
              <div className="flex">
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