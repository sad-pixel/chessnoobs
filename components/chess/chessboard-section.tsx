import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Chess } from "chess.js";
import { Lightbulb, Undo, RefreshCw } from "lucide-react";
import { Chessboard } from "react-chessboard";
import { Button } from "@/components/ui/button";
import { EvaluationBar } from "@/components/chess/eval-bar";
import React, { forwardRef } from "react";
import { CustomSquareRenderer } from "react-chessboard/dist/chessboard/types";

interface ChessboardSectionProps {
    game: Chess;
    onDrop: (sourceSquare: string, targetSquare: string, piece: string) => boolean;
    isFlipped: boolean;
    showEvalBar: boolean;
    evaluation: number;
    mateIn: number | null;
    getHint: () => void;
    showBestMove: boolean;
    bestMove: string | null;
    undoMove: () => void;
    resetBoard: () => void;
    currentMoveIndex: number;
    annotatedSquare?: string;
    annotation?: string;
  }
  
export const ChessboardSection: React.FC<ChessboardSectionProps> = ({
    game,
    onDrop,
    isFlipped,
    showEvalBar,
    evaluation,
    mateIn,
    getHint,
    showBestMove,
    bestMove,
    undoMove,
    resetBoard,
    currentMoveIndex,
    annotatedSquare,
    annotation,
  }) => {
    const CustomSquareRenderer = forwardRef<HTMLDivElement, any>((props, ref) => {
      const { children, square, squareColor, style } = props;
      return (
        <div ref={ref} style={{ ...style, position: "relative", overflow: "visible" }}>
          {children}
          {(square === annotatedSquare) && (
            <div
              style={{
                position: "absolute",
                right: "-5%",
                top: "-5%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40%",
                width: "40%",
                borderRadius: "50%",
                backgroundColor: squareColor === "black" ? "#064e3b" : "#312e81",
                color: "#fff",
                fontSize: "1.3vw",
                zIndex: 9999,
              }}
            >
              {annotation || "??"}
            </div>
          )}
        </div>
      );
    });

    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        {showEvalBar && <EvaluationBar evaluation={evaluation} mateIn={mateIn} />}
        <div className="flex flex-wrap gap-4 my-2 w-full justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                onClick={getHint}
                variant="outline"
                size="sm"
                className="flex-1 bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Hint
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-amber-100 shadow-lg rounded-lg p-3">
              {showBestMove && bestMove && (
                <div className="flex items-center mb-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-sm font-semibold text-amber-900">
                    Best Move:
                  </span>
                  <span className="ml-2 text-sm text-amber-700">{bestMove}</span>
                </div>
              )}
            </PopoverContent>
          </Popover>
          <Button
            onClick={undoMove}
            variant="outline"
            size="sm"
            className="flex-1 bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors"
            disabled={currentMoveIndex === 0}
          >
            <Undo className="w-4 h-4 mr-2" />
            Undo
          </Button>
          <Button
            onClick={resetBoard}
            variant="outline"
            size="sm"
            className="flex-1 bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
        <Chessboard
          position={game.fen()}
          onPieceDrop={(sourceSquare, targetSquare, piece) => onDrop(sourceSquare, targetSquare, piece)}
          boardOrientation={isFlipped ? 'black' : 'white'}
          customSquare={CustomSquareRenderer as CustomSquareRenderer}
          showBoardNotation={false}
        />
      </div>
    );
  };