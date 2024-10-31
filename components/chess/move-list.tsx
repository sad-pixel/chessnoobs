import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Chess } from "chess.js";
import { Button } from "@/components/ui/button";
import { Move } from "@/lib/interface";

import { useEffect, useRef } from "react";

interface MoveListProps {
    moves: Move[];
    setGame: (game: Chess) => void;
    setCurrentMoveIndex: (index: number) => void;
    currentMoveIndex: number;
}

export const MoveList: React.FC<MoveListProps> = ({ moves, setGame, setCurrentMoveIndex, currentMoveIndex }) => {
    const scrollAreaRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [moves]);

    return (
        <ScrollArea ref={scrollAreaRef} className="move-list w-full h-96 max-w-md rounded-md p-2 bg-amber-50 overflow-y-auto">
            {moves.length === 0 ? (
                <div className="text-center text-sm text-amber-600">
                    No moves made yet. Start playing to see the move history.
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-2">
                    {moves.map((move: Move, index: number) => (
                        <Button
                            key={index}
                            onClick={() => {
                                setGame(new Chess(move.fen));
                                setCurrentMoveIndex(index + 1);
                            }}
                            variant="secondary"
                            size="sm"
                            className={`move text-sm flex justify-between items-center ${currentMoveIndex === index + 1 ? 'bg-amber-700 text-amber-50' : 'bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors'}`}
                        >
                            {Math.floor(index / 2) + 1}{index % 2 === 0 ? '.' : '...'} {move.san}
                        </Button>
                    ))}
                </div>
            )}
        </ScrollArea>
    );
};