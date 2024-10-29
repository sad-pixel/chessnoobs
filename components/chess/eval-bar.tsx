import { Progress } from "@/components/ui/progress";

interface EvaluationBarProps {
    evaluation: number;
    mateIn: number | null;
  }
  
 export const EvaluationBar: React.FC<EvaluationBarProps> = ({ evaluation, mateIn }) => {
    return (
      <>
        <div className="flex items-center justify-between w-full max-w-md">
          <span className="text-sm font-medium text-amber-800">Black</span>
          <Progress value={evaluation} className="flex-1 mx-2" />
          <span className="text-sm font-medium text-amber-800">White</span>
        </div>
        {mateIn !== null && (
          <div className="text-center mt-2">
            <span className="text-sm font-bold text-red-600">
              {mateIn > 0 ? `M${mateIn}` : `M-${Math.abs(mateIn)}`}
            </span>
          </div>
        )}
      </>
    );
  };