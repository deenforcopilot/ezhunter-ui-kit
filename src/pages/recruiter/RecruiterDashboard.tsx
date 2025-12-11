import { useState } from "react";
import { Bell, Wallet, Users, CheckCircle, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useNavigate } from "react-router-dom";

const tabs = ["กำลังทำ", "รอผล", "สำเร็จ"];

const activeJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Corp Thailand",
    candidatesSent: 3,
    interviewStage: 2,
    commission: 15000,
    deadline: "15 ธ.ค. 67",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Global Brand Co.",
    candidatesSent: 5,
    interviewStage: 3,
    commission: 20000,
    deadline: "20 ธ.ค. 67",
    status: "waiting",
  },
];

const stats = [
  { label: "รายได้เดือนนี้", value: "฿45,000", icon: Wallet, color: "text-green-500" },
  { label: "งานสำเร็จ", value: "12", icon: CheckCircle, color: "text-primary" },
  { label: "ผู้สมัครส่งแล้ว", value: "48", icon: Users, color: "text-accent" },
  { label: "อัตราผ่าน", value: "68%", icon: TrendingUp, color: "text-yellow-500" },
];

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("กำลังทำ");

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold">แดชบอร์ดรีครูทเตอร์</h1>
                <p className="text-sm opacity-90">ติดตามงานและรายได้ของคุณ</p>
              </div>
              <button 
                onClick={() => navigate("/notifications")}
                className="relative p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
            </div>

            {/* Level Badge */}
            <div className="bg-white/10 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-xs opacity-75">ระดับของคุณ</span>
                <p className="text-lg font-bold">Gold Recruiter</p>
              </div>
              <div className="text-right">
                <span className="text-xs opacity-75">ค่าคอมเพิ่ม</span>
                <p className="text-lg font-bold text-accent">+15%</p>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4">
          <div className="flex gap-2 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Active Jobs */}
        <div className="px-4 py-4 space-y-3">
          {activeJobs.map((job) => (
            <div
              key={job.id}
              className="bg-card rounded-xl p-4 border border-border"
              onClick={() => navigate(`/recruiter/job/${job.id}/candidates`)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Progress */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">ความคืบหน้า</span>
                    <span className="font-medium text-foreground">{job.interviewStage}/5 รอบ</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(job.interviewStage / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">
                    <Users className="w-4 h-4 inline mr-1" />
                    {job.candidatesSent} คน
                  </span>
                  <span className="text-muted-foreground">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {job.deadline}
                  </span>
                </div>
                <span className="font-semibold text-accent">
                  ฿{job.commission.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Earnings Card */}
        <div className="px-4 pb-4">
          <div 
            className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-4 text-primary-foreground"
            onClick={() => navigate("/recruiter/earnings")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">รายได้สะสมทั้งหมด</p>
                <p className="text-2xl font-bold">฿156,500</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">ถอนได้</p>
                <p className="text-xl font-bold">฿45,000</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
              <span className="text-sm">ดูประวัติรายได้ทั้งหมด</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default RecruiterDashboard;
