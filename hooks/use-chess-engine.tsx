import { Chess } from 'chess.js';
import { Move } from "@/lib/interface";
import { useState, useEffect, useCallback } from 'react';

export const useChessEngine = (startingFEN: string | undefined, initialPlayVsEngine: boolean, initialEngineColor: 'w' | 'b', initialBoardOrientation: 'white' | 'black') => {
    const [engine, setEngine] = useState<any | null>(null);
    const [game, setGame] = useState(new Chess(startingFEN || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'));
    const [moves, setMoves] = useState<Move[]>([]);
    const [evaluation, setEvaluation] = useState(50);
    const [message, setMessage] = useState('');
    const [currentMoveIndex, setCurrentMoveIndex] = useState(moves.length);
    const [bestMove, setBestMove] = useState<string | null>(null);
    const [showBestMove, setShowBestMove] = useState(false);
    const [engineDepth, setEngineDepth] = useState(10);
    const [engineLines, setEngineLines] = useState<string | null>(null);
    const [showEvalBar, setShowEvalBar] = useState(true);
    const [showEngineLines, setShowEngineLines] = useState(true);
    const [reachedDepth, setReachedDepth] = useState<number | null>(null);
    const [playVsEngine, setPlayVsEngine] = useState(initialPlayVsEngine);
    const [engineColor, setEngineColor] = useState<'w' | 'b'>(initialEngineColor);
    const [isFlipped, setIsFlipped] = useState(initialBoardOrientation === 'black');
    const [mateIn, setMateIn] = useState<number | null>(null);
    const [previousEvaluation, setPreviousEvaluation] = useState<number | null>(null);
  
    useEffect(() => {
      const loadEngine = async () => {
        const EngineModule = await import('@/app/engine');
        const Engine = EngineModule.default;
        setEngine(new Engine());
      };
      loadEngine();
    }, []);
  
    useEffect(() => {
      if (startingFEN) {
        const newGame = new Chess(startingFEN);
        setGame(newGame);
        setMoves([]);
        setCurrentMoveIndex(0);
        setMessage('');
        setEvaluation(50);
        setPreviousEvaluation(null);
        updateEvaluationAndBestMove(startingFEN);
      }
    }, [startingFEN]);
  
    useEffect(() => {
      setPlayVsEngine(initialPlayVsEngine);
    }, [initialPlayVsEngine]);
  
    useEffect(() => {
      setEngineColor(initialEngineColor);
    }, [initialEngineColor]);
  
    useEffect(() => {
      setIsFlipped(initialBoardOrientation === 'black');
    }, [initialBoardOrientation]);
  
    const updateEvaluationAndBestMove = useCallback((fen: string) => {
      if (!engine) return;
      engine.evaluatePosition(fen, engineDepth);
      engine.onMessage((message: { positionEvaluation: string; bestMove: string; pv: string; depth: number; possibleMate: string }) => {
        const { positionEvaluation, bestMove, pv, depth, possibleMate } = message;
        if (positionEvaluation) {
          const evalValue = parseInt(positionEvaluation, 10);
          const evalPercentage = Math.min(Math.max((evalValue + 1000) / 20, 0), 100);
          const adjustedEval = game.turn() === 'w' ? 100 - evalPercentage : evalPercentage;
          
          if (previousEvaluation !== null && game.turn() !== engineColor) { // Check if it's the human's turn
            const evalChange = adjustedEval - previousEvaluation;
            if (evalChange <= -50) {
              setMessage('Blunder');
            } else if (evalChange <= -20) {
              setMessage('Mistake');
            } else if (evalChange <= -5) {
              setMessage('Inaccuracy');
            } else if (evalChange <= 10) {
              setMessage('Good');
            } else {
              setMessage('Excellent');
            }
          }
          
          setPreviousEvaluation(adjustedEval);
          setEvaluation(adjustedEval);
        }
        if (possibleMate !== undefined) {
          const mateInNumber = parseInt(possibleMate, 10);
          setMateIn(isNaN(mateInNumber) ? null : mateInNumber);
        } else {
          setMateIn(null);
        }
        try {
          if (bestMove) {
            const gameCopy = new Chess(game.fen());
            const moveResult = gameCopy.move(bestMove);
            const bestMoveSAN = moveResult ? moveResult.san : bestMove;
            setBestMove(bestMoveSAN);
  
            if (playVsEngine && game.turn() === engineColor && (currentMoveIndex === moves.length || currentMoveIndex < moves.length - 1)) {
              const engineMove = game.move(bestMove);
              if (engineMove) {
                const newGame = new Chess(game.fen());
                setGame(newGame);
                setMoves((prevMoves) => {
                  const newMoves = [...prevMoves, { san: engineMove.san, fen: newGame.fen() }];
                  setCurrentMoveIndex(newMoves.length);
                  return newMoves;
                });
                updateEvaluationAndBestMove(newGame.fen());
              }
            }
          }
        } catch (error) {
          console.error('Error processing best move:', error);
        }
  
        try {
          if (pv) {
            const gameCopy2 = new Chess(game.fen());
            const pvMoves = pv.split(' ').map(move => {
              const moveResult = gameCopy2.move(move);
              const moveSAN = moveResult ? moveResult.san : move;
              return moveSAN;
            });
            setEngineLines(pvMoves.join(' '));
          }
        } catch (error) {
          console.error('Error processing engine lines:', error);
        }
        if (depth) {
          setReachedDepth(depth);
        }
      });
    }, [engine, engineDepth, game, playVsEngine, engineColor, previousEvaluation, currentMoveIndex, moves.length]);
  
    const loadFEN = useCallback((fen: string) => {
      const newGame = new Chess(fen);
      if (newGame) {
        setGame(newGame);
        setMoves([]);
        setCurrentMoveIndex(0);
        setMessage('');
        setEvaluation(50);
        setPreviousEvaluation(null);
        updateEvaluationAndBestMove(fen);
      } else {
        setMessage('Invalid FEN string.');
      }
    }, [setGame, setMoves, setCurrentMoveIndex, setMessage, setEvaluation, setPreviousEvaluation, updateEvaluationAndBestMove]);
  
    const loadPGN = useCallback((pgn: string) => {
      const newGame = new Chess();
      newGame.loadPgn(pgn);
      setGame(newGame);
      const newMoves = newGame.history({ verbose: true }).map(move => ({
        san: move.san,
        fen: newGame.fen(),
      }));
      setMoves(newMoves);
      setCurrentMoveIndex(newMoves.length);
      setMessage('');
      setPreviousEvaluation(null);
      updateEvaluationAndBestMove(newGame.fen());
    }, [setGame, setMoves, setCurrentMoveIndex, setMessage, setPreviousEvaluation, updateEvaluationAndBestMove]);
  
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const fenParam = params.get('fen');
      const pgnParam = params.get('pgn');
  
      if (fenParam) {
        try {
          const decodedFEN = atob(fenParam);
          loadFEN(decodedFEN);
        } catch (error) {
          setMessage('Invalid FEN in URL.' + error);
        }
      } else if (pgnParam) {
        try {
          const decodedPGN = atob(pgnParam);
          loadPGN(decodedPGN);
        } catch (error) {
          setMessage('Invalid PGN in URL.' + error);
        }
      }
    }, [loadFEN, loadPGN]);
  
    return {
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
      setReachedDepth,
      setPlayVsEngine,
      setEngineColor,
      setIsFlipped,
      setMateIn,
      setPreviousEvaluation,
      updateEvaluationAndBestMove,
      loadFEN,
      loadPGN,
    };
  };