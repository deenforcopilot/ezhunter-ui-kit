import { useState } from "react";
import { Filter, MapPin, ChevronDown, Grid3X3, List } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { JobCard } from "@/components/jobs/JobCard";
import { FilterDrawer } from "@/components/jobs/FilterDrawer";
import { Button } from "@/components/ui/button";

const mockJobs = [
  {
    id: 1,
    title: "Urgent! Sales Representative at Lotus's Money Plus - Nong Khai Branch",
    company: "Krungsri Consumer",
    location: "Nong Khai District",
    salary: "13,000 - 17,000",
    type: "Full-time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Krungsri_Logo.svg/1200px-Krungsri_Logo.svg.png",
    urgent: true,
    date: "Dec 11, 68",
  },
  {
    id: 2,
    title: "Urgent! Sales Representative at Lotus's Money Plus - Lamphun Branch",
    company: "Krungsri Consumer",
    location: "Lamphun District",
    salary: "13,000 - 17,000",
    type: "Full-time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Krungsri_Logo.svg/1200px-Krungsri_Logo.svg.png",
    urgent: true,
    date: "Dec 11, 68",
  },
  {
    id: 3,
    title: "Sales & Marketing Promotion - Chemical Agriculture",
    company: "Singha Mingkorn Generation Co., Ltd",
    location: "Chachoengsao District",
    salary: "20,000 - 40,000+",
    type: "Full-time",
    urgent: false,
    date: "Dec 11, 68",
  },
  {
    id: 4,
    title: "Frontend Developer - React/TypeScript",
    company: "Tech Startup Inc.",
    location: "Bangkok, Remote",
    salary: "45,000 - 80,000",
    type: "Full-time",
    urgent: false,
    date: "Dec 10, 68",
  },
];

const filterTabs = [
  { id: "all", label: "All Results" },
  { id: "workplace", label: "Any Workplace" },
  { id: "type", label: "All Job Types" },
];

const Jobs = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [sortBy, setSortBy] = useState("latest");

  const handleApplyFilters = (filters: any) => {
    console.log("Applied filters:", filters);
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border">
          <div className="px-4 py-3">
            <h1 className="text-xl font-bold text-foreground mb-1">
              Found 45,436 Jobs
            </h1>
            
            {/* Filter Tabs */}
            <div className="scroll-smooth-x flex gap-2 -mx-4 px-4 py-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`category-chip ${activeTab === tab.id ? "category-chip-active" : ""}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort & View Options */}
            <div className="flex items-center justify-between pt-2">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 text-sm font-medium text-primary"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 text-sm text-muted-foreground">
                  Sort: <span className="font-medium text-foreground">Latest</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("map")}
                    className={`p-2 ${viewMode === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Job List */}
        <div className="px-4 py-4 space-y-3">
          {mockJobs.map((job) => (
            <JobCard
              key={job.id}
              {...job}
              onSave={() => console.log("Save job:", job.id)}
            />
          ))}
        </div>

        {/* Filter Drawer */}
        <FilterDrawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={handleApplyFilters}
        />
      </div>
    </AppLayout>
  );
};

export default Jobs;
