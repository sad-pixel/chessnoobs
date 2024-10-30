import { useState, useEffect } from 'react';

interface EvaluationBarProps {
  evaluation: number;
  mateIn: number | null;
}

export const EvaluationBar: React.FC<EvaluationBarProps> = ({ evaluation, mateIn }) => {
  const [animatedEvaluation, setAnimatedEvaluation] = useState(evaluation);

  useEffect(() => {
    const animationDuration = 300; // duration in milliseconds
    const frameRate = 24; // frames per second
    const totalFrames = (animationDuration / 1000) * frameRate;
    const step = (evaluation - animatedEvaluation) / totalFrames;

    let currentFrame = 0;
    const animate = () => {
      if (currentFrame < totalFrames) {
        setAnimatedEvaluation((prev) => prev + step);
        currentFrame++;
        requestAnimationFrame(animate);
      } else {
        setAnimatedEvaluation(evaluation);
      }
    };

    animate();
  }, [evaluation, mateIn]);

  let evaluationPercentage = Math.min(Math.max(animatedEvaluation, 0), 100);

  if (mateIn !== null) {
    evaluationPercentage = mateIn > 0 ? 0 : 100; // Full bar to the side getting mated
  }

  const blackWidth = `${100 - evaluationPercentage}%`;
  const whiteWidth = `${evaluationPercentage}%`;

  return (
    <>
      <div className="flex items-center justify-between w-full max-w-xl">
        <span className="text-sm font-medium text-amber-800">Black</span>
        <div className="flex-1 mx-2 h-4 flex relative">
          <div style={{ width: whiteWidth, transition: 'width 0.3s ease' }} className="bg-amber-900 h-full"></div>
          <div style={{ width: blackWidth, transition: 'width 0.3s ease' }} className="bg-amber-100 h-full"></div>
          <span
            className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${
              mateIn !== null ? (mateIn > 0 ? 'text-amber-900' : 'text-amber-100') : 'text-amber-800'
            }`}
          >
            {mateIn !== null ? (mateIn > 0 ? `M${mateIn}` : `M-${Math.abs(mateIn)}`) : ''}
          </span>
        </div>
        <span className="text-sm font-medium text-amber-800">White</span>
      </div>
    </>
  );
};