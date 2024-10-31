"use client"

import { useState } from 'react';
import { AnalysisBoard } from '@/components/analysis-board';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Puzzle, Star, Trophy, Award, Swords ,Menu } from 'lucide-react'; 
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const EndgameTrainer = () => {
  const [startingFEN, setStartingFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'); // Default starting position with all pieces
  const categorizedPuzzles = {
    'Basic Endgames': [
      { name: 'Puzzle 1', fen: '6k1/5p2/6p1/8/7p/8/6PP/6K1 b - - 0 1' },
      { name: 'Puzzle 2', fen: '3k4/2n2B2/1KP5/2B2p2/5b1p/7P/8/8 b - - 0 1' },
    ],
    'Intermediate Endgames': [
      { name: 'Puzzle 3', fen: 'r7/4R2P/3p4/3k1K2/2p5/8/8/8 b - - 0 1' },
      { name: 'Puzzle 4', fen: '8/8/5p2/1P1K1k2/8/2r5/8/7R w - - 0 1' },
    ],
    'Advanced Endgames': [
      { name: 'Puzzle 5', fen: '5n2/R7/4pk2/8/5PK1/8/8/8 b - - 0 1' },
      { name: 'Puzzle 6', fen: '3Q4/8/1k6/7p/p1p4P/2q3PB/7K/8 b - - 0 1' },
    ],
    'Expert Endgames': [
      { name: 'Puzzle 7', fen: '4q3/2R4P/5R2/1p6/p3k3/P7/KP6/8 b - - 0 1' },
      { name: 'Puzzle 8', fen: 'R7/8/5rk1/5p2/1p5P/5KP1/P7/8 b - - 0 1' },
      { name: 'Puzzle 9', fen: '3k4/5ppp/2q5/3p2r1/8/1Q3P2/P4P1P/3R3K w - - 0 1' },
      { name: 'Puzzle 10', fen: '4R3/1k6/1p2P1p1/p7/4r3/1P1r4/1K6/2R5 w - - 0 1' },
    ],
    'Mate in 3': [
      { name: 'Madame de Remusat vs Napoleon I, Paris, 1802', fen: 'r1b1kb1r/pppp1ppp/5q2/4n3/3KP3/2N3PN/PPP4P/R1BQ1B1R b kq - 0 1' },
      { name: 'William Evans vs Alexander MacDonnell, London, 1826', fen: 'r3k2r/ppp2Npp/1b5n/4p2b/2B1P2q/BQP2P2/P5PP/RN5K w kq - 1 1' },
      { name: 'William Evans vs Alexander MacDonnell, London, 1829', fen: 'r1b3kr/ppp1Bp1p/1b6/n2P4/2p3q1/2Q2N2/P4PPP/RN2R1K1 w - - 1 1' },
      { name: 'H Popert vs John Cochrane, London, 1841', fen: 'r2n1rk1/1ppb2pp/1p1p4/3Ppq1n/2B3P1/2P4P/PP1N1P1K/R2Q1RN1 b - - 0 1' },
      { name: 'Daniel Harrwitz vs Bernhard Horwitz, London, 1846', fen: '3q1r1k/2p4p/1p1pBrp1/p2Pp3/2PnP3/5PP1/PP1Q2K1/5R1R w - - 1 1' },
      { name: 'Bernhard Horwitz vs Howard Staunton, London, 1846', fen: '6k1/ppp2ppp/8/2n2K1P/2P2P1P/2Bpr3/PP4r1/4RR2 b - - 0 1' },
    ],
  };

  const categoryIcons = {
    'Basic Endgames': <Puzzle className="w-4 h-4 mr-2" />,
    'Intermediate Endgames': <Star className="w-4 h-4 mr-2" />,
    'Advanced Endgames': <Trophy className="w-4 h-4 mr-2" />,
    'Expert Endgames': <Award className="w-4 h-4 mr-2" />,
    'Mate in 3': <Swords className="w-4 h-4 mr-2" />,
  };

  const handlePuzzleSelect = (fen: string) => {
    setStartingFEN(fen);
  };

  const getBoardOrientation = (fen: string) => {
    return fen.split(' ')[1] === 'w' ? 'white' : 'black';
  };

  const getEngineColor = (fen: string) => {
    return fen.split(' ')[1] === 'w' ? 'b' : 'w';
  };

  return (
    <div className="endgame-trainer w-full h-full flex">
      <div className="hidden md:block sidebar w-1/5 bg-amber-50 p-4 shadow-inner">
        <Accordion type="single" collapsible>
          {Object.entries(categorizedPuzzles).map(([category, puzzles]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="text-lg font-semibold mb-2 flex items-center">
                {categoryIcons[category as keyof typeof categoryIcons]} {category}
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {puzzles.map((puzzle, index) => (
                    <li key={index} className="mb-2">
                      <button
                        onClick={() => handlePuzzleSelect(puzzle.fen)}
                        className="w-full text-left p-2 bg-amber-200 hover:bg-amber-300 rounded flex items-center"
                      >
                        <Puzzle className="w-4 h-4 mr-2" /> {puzzle.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="content flex-1 flex flex-col items-center justify-center bg-amber-50 text-amber-800">
      <div className="md:hidden w-full">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" className="w-full bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors">
              <Menu className="inline-block mr-2" /> Select Puzzle
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-3/4 bg-amber-50">
            <Accordion type="single" collapsible>
              {Object.entries(categorizedPuzzles).map(([category, puzzles]) => (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger className="text-lg font-semibold mb-2 flex items-center">
                    {categoryIcons[category as keyof typeof categoryIcons]} {category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {puzzles.map((puzzle, index) => (
                        <li key={index} className="mb-2">
                          <button
                            onClick={() => handlePuzzleSelect(puzzle.fen)}
                            className="w-full text-left p-2 bg-amber-200 hover:bg-amber-300 rounded flex items-center"
                          >
                            <Puzzle className="w-4 h-4 mr-2" /> {puzzle.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SheetContent>
        </Sheet>
      </div>
        <AnalysisBoard 
          startingFEN={startingFEN} 
          playVsEngine={true} 
          engineColor={getEngineColor(startingFEN)} 
          boardOrientation={getBoardOrientation(startingFEN)} 
        />
      </div>
    </div>
  );
};

export default EndgameTrainer;
