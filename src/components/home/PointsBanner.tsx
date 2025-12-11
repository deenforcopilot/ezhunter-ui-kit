import { Coins, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PointsBannerProps {
  points: number;
  value: number;
}

export function PointsBanner({ points, value }: PointsBannerProps) {
  return (
    <div className="bg-card border-2 border-primary/20 rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-xl points-banner flex items-center justify-center">
            <Coins className="w-6 h-6 text-primary-foreground" />
          </div>
          <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1" />
        </div>
        <div>
          <p className="text-lg font-bold text-primary">{points.toFixed(2)} THB</p>
          <p className="text-sm text-muted-foreground">≈ {value.toFixed(2)} Points</p>
        </div>
      </div>
      <Button variant="default" size="sm" className="rounded-full">
        Collect Points
      </Button>
    </div>
  );
}
