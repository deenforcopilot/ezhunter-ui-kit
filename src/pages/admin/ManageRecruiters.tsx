import { useState } from "react";
import { ChevronLeft, Search, Filter, Star, CheckCircle, XCircle, MoreVertical, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const recruiters = [
  {
    id: 1,
    name: "สมศรี รักงาน",
    level: "Gold",
    rating: 4.8,
    completedJobs: 45,
    successRate: 78,
    totalEarnings: 285000,
    status: "active",
    avatar: null,
  },
  {
    id: 2,
    name: "มานะ ทำดี",
    level: "Silver",
    rating: 4.5,
    completedJobs: 23,
    successRate: 65,
    totalEarnings: 156000,
    status: "active",
    avatar: null,
  },
  {
    id: 3,
    name: "สมหญิง ใจดี",
    level: "Bronze",
    rating: 0,
    completedJobs: 0,
    successRate: 0,
    totalEarnings: 0,
    status: "pending",
    avatar: null,
  },
];

const tabs = ["ทั้งหมด", "รออนุมัติ", "Active", "ระงับ"];

const ManageRecruiters = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Gold": return "text-yellow-500 bg-yellow-500/10";
      case "Silver": return "text-gray-400 bg-gray-400/10";
      case "Bronze": return "text-amber-700 bg-amber-700/10";
      default: return "text-muted-foreground bg-secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-600";
      case "pending": return "bg-yellow-500/10 text-yellow-600";
      case "suspended": return "bg-red-500/10 text-red-600";
      default: return "bg-secondary text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "Active";
      case "pending": return "รออนุมัติ";
      case "suspended": return "ระงับ";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-foreground">จัดการรีครูทเตอร์</h1>
              <p className="text-sm text-muted-foreground">{recruiters.length} รีครูทเตอร์</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ค้นหารีครูทเตอร์..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Recruiter List */}
      <div className="px-4 py-4 space-y-3">
        {recruiters.map((recruiter) => (
          <div key={recruiter.id} className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{recruiter.name[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{recruiter.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(recruiter.level)}`}>
                      {recruiter.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(recruiter.status)}`}>
                      {getStatusLabel(recruiter.status)}
                    </span>
                    {recruiter.rating > 0 && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>{recruiter.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-secondary rounded-lg">
                <MoreVertical className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {recruiter.status === "active" && (
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{recruiter.completedJobs}</p>
                  <p className="text-xs text-muted-foreground">งานสำเร็จ</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{recruiter.successRate}%</p>
                  <p className="text-xs text-muted-foreground">อัตราผ่าน</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-accent">฿{(recruiter.totalEarnings / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">รายได้รวม</p>
                </div>
              </div>
            )}

            {recruiter.status === "pending" && (
              <div className="flex gap-2 pt-3 border-t border-border">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-500 text-white rounded-lg font-medium">
                  <CheckCircle className="w-5 h-5" />
                  อนุมัติ
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-500 text-white rounded-lg font-medium">
                  <XCircle className="w-5 h-5" />
                  ปฏิเสธ
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRecruiters;
