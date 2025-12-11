import { Coins, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PointsDisplayProps {
  points: number;
  value: number;
}

export function PointsDisplay({ points, value }: PointsDisplayProps) {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate("/wallet")}
      className="w-full flex items-center justify-between points-banner rounded-xl p-4 text-primary-foreground"
    >
      <div className="flex items-center gap-3">
        <Coins className="w-6 h-6" />
        <span className="font-bold">{points.toFixed(2)} Points</span>
        <span className="opacity-80">≈ {value.toFixed(2)} THB</span>
      </div>
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}
