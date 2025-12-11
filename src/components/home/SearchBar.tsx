import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const navigate = useNavigate();

  return (
    <div 
      className="relative cursor-pointer"
      onClick={() => navigate("/search")}
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-accent">
        <Sparkles className="w-5 h-5" />
      </div>
      <Input
        placeholder="Search jobs, companies..."
        className="pl-12 pr-14 bg-card border-2 border-primary/20 focus-visible:border-primary cursor-pointer"
        readOnly
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition-colors">
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}
