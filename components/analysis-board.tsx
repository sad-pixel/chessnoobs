'use client'

import { Chess } from 'chess.js';
import { MoveToolbar } from '@/components/chess/move-toolbar';
import { MoveList } from '@/components/chess/move-list';
import { FeedbackMessage } from '@/components/chess/feedback';
import { EngineLinesSection } from '@/components/chess/engine-lines';
import { ControlPanel } from '@/components/chess/control-panel';
import { ChessboardSection } from '@/components/chess/chessboard-section';
import { useChessEngine } from '@/hooks/use-chess-engine';
import { useEffect } from 'react';

interface AnalysisBoardProps {
  startingFEN?: string;
  playVsEngine?: boolean;
  engineColor?: 'w' | 'b';
  boardOrientation?: 'white' | 'black';
}

export const AnalysisBoard: React.FC<AnalysisBoardProps> = ({
  startingFEN,
  playVsEngine: initialPlayVsEngine = false,
  engineColor: initialEngineColor = 'b',
  boardOrientation: initialBoardOrientation = 'white',
}) => {
  const {
    game,
    moves,
    evaluation,
    message,
    currentMoveIndex,
    bestMove,
    showBestMove,
    engineDepth,
    engineLines,
    showEvalBar,
    showEngineLines,
    reachedDepth,
    playVsEngine,
    engineColor,
    isFlipped,
    mateIn,
    setGame,
    setMoves,
    setCurrentMoveIndex,
    setMessage,
    setBestMove,
    setShowBestMove,
    setEngineDepth,
    setEngineLines,
    setShowEvalBar,
    setShowEngineLines,
    setPlayVsEngine,
    setEngineColor,
    setIsFlipped,
    setMateIn,
    setPreviousEvaluation,
    updateEvaluationAndBestMove,
    loadFEN,
    loadPGN,
  } = useChessEngine(
    startingFEN,
    initialPlayVsEngine,
    initialEngineColor,
    initialBoardOrientation
  );

  useEffect(() => {
    updateEvaluationAndBestMove(game.fen());
  }, [game.fen()]);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move = game.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });

    if (!move) return false;

    const newMoves = [...moves.slice(0, currentMoveIndex), { san: move.san, fen: game.fen() }];
    setMoves(newMoves);
    const newMoveIndex = newMoves.length;
    setCurrentMoveIndex(newMoveIndex);
    setMessage('');
    setShowBestMove(false);

    return true;
  };

  const getHint = () => {
    setMessage('Try to control key squares or push your pawn forward safely.');
    setShowBestMove(true);
  };

  const undoMove = () => {
    if (currentMoveIndex > 0) {
      const newMoveIndex = currentMoveIndex - 1;
      const lastFen =
        newMoveIndex > 0
          ? moves[newMoveIndex - 1].fen
          : startingFEN ||
            'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      setCurrentMoveIndex(newMoveIndex);
      setGame(new Chess(lastFen));
    }
  };

  const resetBoard = () => {
    const initialFEN =
      startingFEN || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    setGame(new Chess(initialFEN));
    setMoves([]);
    setCurrentMoveIndex(0);
    setMessage('');
    setBestMove(null);
    setShowBestMove(false);
    setEngineLines(null);
    setMateIn(null);
    setPreviousEvaluation(null);
  };

  const copyFEN = () => {
    navigator.clipboard.writeText(game.fen()).then(() => {
      setMessage('FEN copied to clipboard.');
    });
  };

  const exportLinkWithFEN = () => {
    const fen = game.fen();
    const encodedFEN = btoa(fen);
    const url = `${window.location.origin}${window.location.pathname}?fen=${encodedFEN}`;
    navigator.clipboard.writeText(url).then(() => {
      setMessage('Link with FEN copied to clipboard.');
    });
  };

  const goToFirstMove = () => {
    if (moves.length > 0) {
      const initialFEN =
        startingFEN || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      setGame(new Chess(initialFEN));
      setCurrentMoveIndex(0);
    }
  };

  const goToLastMove = () => {
    if (moves.length > 0) {
      const lastMove = moves[moves.length - 1];
      setGame(new Chess(lastMove.fen));
      setCurrentMoveIndex(moves.length);
    }
  };

  const goToPreviousMove = () => {
    if (currentMoveIndex > 0) {
      const newMoveIndex = currentMoveIndex - 1;
      const previousFen =
        newMoveIndex > 0
          ? moves[newMoveIndex - 1].fen
          : startingFEN ||
            'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      setGame(new Chess(previousFen));
      setCurrentMoveIndex(newMoveIndex);
    }
  };

  const goToNextMove = () => {
    if (currentMoveIndex < moves.length) {
      const nextMove = moves[currentMoveIndex];
      setGame(new Chess(nextMove.fen));
      setCurrentMoveIndex(currentMoveIndex + 1);
    }
  };

  const flipBoard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full h-full flex flex-col bg-amber-50 text-amber-800">
      <ControlPanel
        flipBoard={flipBoard}
        loadFEN={loadFEN}
        loadPGN={loadPGN}
        copyFEN={copyFEN}
        exportLinkWithFEN={exportLinkWithFEN}
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
      <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-auto">
        <div className="flex-1">
          <ChessboardSection
            game={game}
            onDrop={onDrop}
            isFlipped={isFlipped}
            showEvalBar={showEvalBar}
            evaluation={evaluation}
            mateIn={mateIn}
            getHint={getHint}
            showBestMove={showBestMove}
            bestMove={bestMove}
            undoMove={undoMove}
            resetBoard={resetBoard}
            currentMoveIndex={currentMoveIndex}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <EngineLinesSection
            showEngineLines={showEngineLines}
            engineLines={engineLines}
            reachedDepth={reachedDepth}
            engineDepth={engineDepth}
          />
          {moves.length > 0 && (
            <MoveToolbar
              goToFirstMove={goToFirstMove}
              goToPreviousMove={goToPreviousMove}
              goToNextMove={goToNextMove}
              goToLastMove={goToLastMove}
              currentMoveIndex={currentMoveIndex}
              moves={moves}
            />
          )}
          <MoveList
            moves={moves}
            setGame={setGame}
            setCurrentMoveIndex={setCurrentMoveIndex}
            currentMoveIndex={currentMoveIndex}
          />
        </div>
      </div>
      <FeedbackMessage message={message} />
    </div>
  );
};