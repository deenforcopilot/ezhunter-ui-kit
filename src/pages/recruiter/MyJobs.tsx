import { useState } from "react";
import { ChevronLeft, Star, Trash2, CheckCircle, Clock, ChevronRight, Search, Filter, MoreVertical, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type JobStatus = "active" | "completed";

interface MyJob {
  id: number;
  title: string;
  company: string;
  commission: number;
  deadline: string;
  category: string;
  candidatesSent: number;
  status: JobStatus;
  completedDate?: string;
}

const mockMyJobs: MyJob[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Corp Thailand",
    commission: 25000,
    deadline: "25 ธ.ค. 67",
    category: "Technology",
    candidatesSent: 3,
    status: "active",
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Global Brand Co.",
    commission: 20000,
    deadline: "30 ธ.ค. 67",
    category: "Marketing",
    candidatesSent: 5,
    status: "active",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "Creative Studio",
    commission: 18000,
    deadline: "20 ธ.ค. 67",
    category: "Design",
    candidatesSent: 2,
    status: "active",
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "Data Solutions",
    commission: 30000,
    deadline: "15 ธ.ค. 67",
    category: "Technology",
    candidatesSent: 4,
    status: "completed",
    completedDate: "10 ธ.ค. 67",
  },
  {
    id: 5,
    title: "Sales Executive",
    company: "Commerce Plus",
    commission: 15000,
    deadline: "10 ธ.ค. 67",
    category: "Sales",
    candidatesSent: 6,
    status: "completed",
    completedDate: "8 ธ.ค. 67",
  },
];

const tabs = ["งานทั้งหมด", "งานที่เสร็จสิ้น"];

const MyJobs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("งานทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<MyJob[]>(mockMyJobs);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "งานทั้งหมด" ? job.status === "active" : job.status === "completed";
    return matchesSearch && matchesTab;
  });

  const handleCompleteJob = (jobId: number) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: "completed" as JobStatus, completedDate: "16 ธ.ค. 67" }
        : job
    ));
  };

  const handleDeleteJob = (jobId: number) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold">งานของฉัน</h1>
                <p className="text-sm opacity-90">งานที่คุณติดดาวไว้</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
              <Input
                placeholder="ค้นหางาน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex px-4 border-b border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-white text-white"
                    : "border-transparent text-white/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {/* Stats */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="text-sm text-muted-foreground">งานที่รับไว้</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {jobs.filter(j => j.status === "active").length}
              </p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-muted-foreground">เสร็จสิ้น</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {jobs.filter(j => j.status === "completed").length}
              </p>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="px-4 space-y-3">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {activeTab === "งานทั้งหมด" 
                  ? "ยังไม่มีงานที่รับไว้" 
                  : "ยังไม่มีงานที่เสร็จสิ้น"}
              </p>
              <Button 
                variant="link" 
                onClick={() => navigate("/recruiter/marketplace")}
              >
                ไปหางานใน Marketplace
              </Button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => navigate(`/recruiter/my-jobs/${job.id}`)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                    </div>
                    <button 
                      className="p-1 hover:bg-secondary rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Show menu
                      }}
                    >
                      <MoreVertical className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {job.category}
                    </span>
                    {job.status === "completed" ? (
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        เสร็จเมื่อ {job.completedDate}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {job.deadline}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      ส่งผู้สมัครแล้ว: <span className="font-medium text-foreground">{job.candidatesSent} คน</span>
                    </div>
                    <span className="font-semibold text-accent">฿{job.commission.toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                {job.status === "active" && (
                  <div className="flex border-t border-border">
                    <button
                      onClick={() => handleCompleteJob(job.id)}
                      className="flex-1 py-3 text-sm font-medium text-green-500 hover:bg-green-500/5 flex items-center justify-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      เสร็จสิ้น
                    </button>
                    <div className="w-px bg-border" />
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="flex-1 py-3 text-sm font-medium text-red-500 hover:bg-red-500/5 flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      ลบ
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default MyJobs;
