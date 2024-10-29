import { AlertCircle, Lightbulb } from "lucide-react";

interface FeedbackMessageProps {
    message: string;
  }
  
export  const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ message }) => (
    <div className="bg-amber-100 p-2 rounded-lg shadow-md">
      <div className="text-sm text-center flex items-center justify-center">
        {message === 'Blunder' && <AlertCircle className="w-4 h-4 mr-2 text-red-600" />}
        {message === 'Mistake' && <AlertCircle className="w-4 h-4 mr-2 text-orange-600" />}
        {message === 'Inaccuracy' && <AlertCircle className="w-4 h-4 mr-2 text-yellow-600" />}
        {message === 'Good' && <Lightbulb className="w-4 h-4 mr-2 text-green-600" />}
        {message === 'Excellent' && <Lightbulb className="w-4 h-4 mr-2 text-blue-600" />}
        <span className={`${message === 'Blunder' ? 'text-red-600' : message === 'Mistake' ? 'text-orange-600' : message === 'Inaccuracy' ? 'text-yellow-600' : message === 'Good' ? 'text-green-600' : message === 'Excellent' ? 'text-blue-600' : 'text-amber-600'}`}>
          {message || 'Make a move to receive feedback.'}
        </span>
      </div>
    </div>
  );
  