import { useState } from "react";
import { Bell, Plus, Users, Briefcase, Clock, CheckCircle, TrendingUp, Eye } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "งานที่เปิดรับ", value: 5, icon: Briefcase, color: "bg-primary" },
  { label: "ผู้สมัครทั้งหมด", value: 48, icon: Users, color: "bg-accent" },
  { label: "รอสัมภาษณ์", value: 12, icon: Clock, color: "bg-yellow-500" },
  { label: "ผ่านการคัดเลือก", value: 8, icon: CheckCircle, color: "bg-green-500" },
];

const activeJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    applicants: 15,
    interviews: 5,
    status: "กำลังสรรหา",
    recruiter: "สมศรี รักงาน",
    progress: 60,
  },
  {
    id: 2,
    title: "UX/UI Designer",
    applicants: 22,
    interviews: 8,
    status: "รอสัมภาษณ์",
    recruiter: "มานะ ทำดี",
    progress: 40,
  },
  {
    id: 3,
    title: "Product Manager",
    applicants: 8,
    interviews: 2,
    status: "เริ่มต้น",
    recruiter: "กำลังจับคู่...",
    progress: 15,
  },
];

const ClientDashboard = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold">แดชบอร์ดลูกค้า</h1>
                <p className="text-sm opacity-90">ติดตามการสรรหาแบบ Real-time</p>
              </div>
              <button 
                onClick={() => navigate("/notifications")}
                className="relative p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="px-4 -mt-2">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl p-4 border border-border">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Create Job Button */}
        <div className="px-4 py-4">
          <Button 
            onClick={() => navigate("/client/jobs/create")}
            className="w-full" 
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            สร้างประกาศงานใหม่
          </Button>
        </div>

        {/* Active Jobs */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">งานที่กำลังสรรหา</h2>
            <button className="text-sm text-primary font-medium">ดูทั้งหมด</button>
          </div>

          <div className="space-y-3">
            {activeJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-card rounded-xl p-4 border border-border"
                onClick={() => navigate(`/client/jobs/${job.id}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">รีครูทเตอร์: {job.recruiter}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    job.status === "กำลังสรรหา" ? "bg-primary/10 text-primary" :
                    job.status === "รอสัมภาษณ์" ? "bg-yellow-500/10 text-yellow-600" :
                    "bg-secondary text-muted-foreground"
                  }`}>
                    {job.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">ความคืบหน้า</span>
                    <span className="font-medium text-foreground">{job.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{job.applicants} ผู้สมัคร</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{job.interviews} รอสัมภาษณ์</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ClientDashboard;
