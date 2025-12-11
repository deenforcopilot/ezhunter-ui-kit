import { ChevronRight, Star } from "lucide-react";

interface MemberCardProps {
  level: string;
  serviceFee: number;
  totalSales: number;
  nextLevelAmount: number;
  nextLevelFee: number;
}

export function MemberCard({ level, serviceFee, totalSales, nextLevelAmount, nextLevelFee }: MemberCardProps) {
  const progress = (totalSales / (totalSales + nextLevelAmount)) * 100;

  return (
    <div className="member-card-gradient rounded-2xl p-4 text-primary-foreground">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4" />
            Level {level}
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs opacity-80">Current Service Fee</p>
          <p className="text-xl font-bold">{serviceFee}%</p>
        </div>
      </div>

      <button className="w-full flex items-center justify-between bg-white/10 rounded-xl p-3 hover:bg-white/20 transition-colors">
        <div>
          <p className="text-sm opacity-80">Total Sales</p>
          <p className="text-lg font-bold">฿{totalSales.toLocaleString()}</p>
        </div>
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="opacity-80">Collect ฿{nextLevelAmount.toLocaleString()} more</span>
          <span className="font-semibold">to get {nextLevelFee}% fee</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-center mt-3 opacity-80">
        Check your service fee rates in 'My Jobs' menu
      </p>
    </div>
  );
}
