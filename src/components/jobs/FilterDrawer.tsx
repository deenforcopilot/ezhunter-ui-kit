import { useState } from "react";
import { X, Train, Bus, Factory, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const workplaceTypes = [
  { id: "all", label: "All" },
  { id: "hybrid", label: "Hybrid Work" },
  { id: "remote", label: "Work from Home" },
];

const businessTypes = [
  { id: "all", label: "All" },
  { id: "tech", label: "Technology" },
  { id: "finance", label: "Finance" },
  { id: "retail", label: "Retail" },
];

const transportOptions = [
  { id: "brt", label: "BRT & MRT", icon: Train },
  { id: "bus", label: "Bus", icon: Bus },
  { id: "industrial", label: "Industrial Zone", icon: Factory },
];

export function FilterDrawer({ isOpen, onClose, onApply }: FilterDrawerProps) {
  const [selectedWorkplace, setSelectedWorkplace] = useState("all");
  const [selectedBusiness, setSelectedBusiness] = useState("all");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-card z-50 animate-slide-up overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Transport Options */}
          <div className="flex justify-center gap-4 pb-4 border-b border-border">
            {transportOptions.map((opt) => (
              <button key={opt.id} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                  <opt.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Workplace Type */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Workplace Type</h3>
              <span className="text-sm text-muted-foreground">1/5</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {workplaceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedWorkplace(type.id)}
                  className={`filter-tag ${selectedWorkplace === type.id ? "filter-tag-active" : ""}`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Business Type */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Business Type</h3>
              <span className="text-sm text-muted-foreground">1/5</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {businessTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedBusiness(type.id)}
                  className={`filter-tag ${selectedBusiness === type.id ? "filter-tag-active" : ""}`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <h3 className="font-semibold mb-3">Salary (THB)</h3>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                className="text-center"
              />
              <span className="text-muted-foreground">-</span>
              <Input
                type="number"
                placeholder="400,000+"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                className="text-center"
              />
            </div>
          </div>

          {/* Keyword Search */}
          <div>
            <h3 className="font-semibold mb-3">Keyword Search</h3>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Job title or company name"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Apply Button */}
          <Button 
            className="w-full"
            variant="accent"
            size="lg"
            onClick={() => {
              onApply({
                workplace: selectedWorkplace,
                business: selectedBusiness,
                salaryMin,
                salaryMax,
                keyword: searchKeyword,
              });
              onClose();
            }}
          >
            Search
          </Button>

          {/* Popular Search */}
          <div>
            <h3 className="font-semibold mb-3">Popular Search</h3>
            <div className="flex flex-wrap gap-2">
              {["Sales", "IT", "Marketing", "Admin"].map((tag) => (
                <button key={tag} className="category-chip">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
