import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Move } from "@/lib/interface";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MoveToolbarProps {
    goToFirstMove: () => void;
    goToPreviousMove: () => void;
    goToNextMove: () => void;
    goToLastMove: () => void;
    currentMoveIndex: number;
    moves: Move[];
  }
  
export const MoveToolbar: React.FC<MoveToolbarProps> = ({ goToFirstMove, goToPreviousMove, goToNextMove, goToLastMove, currentMoveIndex, moves }) => (
    <div className="toolbar flex items-center justify-center gap-2 mb-2 w-full max-w-md">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={goToFirstMove} variant="outline" size="sm" className="flex-none bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors" disabled={currentMoveIndex === 0}>
              <ChevronsLeft className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-amber-50 shadow-md rounded-lg p-2 text-amber-800">
            <p>Go to First Move</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={goToPreviousMove} variant="outline" size="sm" className="flex-none bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors" disabled={currentMoveIndex === 0}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-amber-50 shadow-md rounded-lg p-2 text-amber-800">
            <p>Go to Previous Move</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={goToNextMove} variant="outline" size="sm" className="flex-none bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors" disabled={currentMoveIndex >= moves.length}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-amber-50 shadow-md rounded-lg p-2 text-amber-800">
            <p>Go to Next Move</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={goToLastMove} variant="outline" size="sm" className="flex-none bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors" disabled={currentMoveIndex >= moves.length}>
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-amber-50 shadow-md rounded-lg p-2 text-amber-800">
            <p>Go to Last Move</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
  