import { useState } from "react";
import { Bell, Filter, TrendingUp, Clock, DollarSign, Building2, MapPin } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useNavigate } from "react-router-dom";

const marketplaceJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Corp Thailand",
    location: "กรุงเทพมหานคร",
    commission: 15000,
    deadline: "15 ธ.ค. 67",
    requirements: ["React", "Node.js", "5+ ปี"],
    difficulty: "medium",
    applicants: 3,
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Global Brand Co.",
    location: "กรุงเทพมหานคร",
    commission: 20000,
    deadline: "20 ธ.ค. 67",
    requirements: ["Digital Marketing", "3+ ปี"],
    difficulty: "easy",
    applicants: 5,
  },
  {
    id: 3,
    title: "CFO",
    company: "Investment Group",
    location: "กรุงเทพมหานคร",
    commission: 50000,
    deadline: "31 ธ.ค. 67",
    requirements: ["Finance", "CPA", "10+ ปี"],
    difficulty: "hard",
    applicants: 1,
  },
];

const filters = ["ทั้งหมด", "ค่าคอมสูง", "ง่าย", "ใกล้ Deadline"];

const RecruiterMarketplace = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("ทั้งหมด");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500/10 text-green-600";
      case "medium": return "bg-yellow-500/10 text-yellow-600";
      case "hard": return "bg-red-500/10 text-red-600";
      default: return "bg-secondary text-muted-foreground";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "ง่าย";
      case "medium": return "ปานกลาง";
      case "hard": return "ยาก";
      default: return difficulty;
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold">มาร์เก็ตเพลสงานสรรหา</h1>
                <p className="text-sm opacity-90">เลือกงานที่คุณสนใจ</p>
              </div>
              <button 
                onClick={() => navigate("/notifications")}
                className="relative p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <Bell className="w-6 h-6" />
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <div className="flex-1 bg-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm">งานว่าง</span>
                </div>
                <p className="text-2xl font-bold mt-1">24</p>
              </div>
              <div className="flex-1 bg-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm">ค่าคอมรวม</span>
                </div>
                <p className="text-2xl font-bold mt-1">฿285K</p>
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Job List */}
        <div className="px-4 py-4 space-y-3">
          {marketplaceJobs.map((job) => (
            <div
              key={job.id}
              className="bg-card rounded-xl p-4 border border-border"
              onClick={() => navigate(`/recruiter/job/${job.id}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Building2 className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(job.difficulty)}`}>
                  {getDifficultyLabel(job.difficulty)}
                </span>
              </div>

              {/* Requirements */}
              <div className="flex flex-wrap gap-1 mb-3">
                {job.requirements.map((req) => (
                  <span key={req} className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                    {req}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-accent font-semibold">
                    <DollarSign className="w-4 h-4" />
                    <span>฿{job.commission.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{job.deadline}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {job.applicants} คนส่งแล้ว
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default RecruiterMarketplace;
