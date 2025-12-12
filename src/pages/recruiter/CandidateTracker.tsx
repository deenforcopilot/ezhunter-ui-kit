import { useState } from "react";
import { ChevronLeft, User, Phone, Mail, Calendar, CheckCircle, Clock, XCircle, MessageSquare, ChevronRight, Building2 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const candidates = [
  {
    id: 1,
    name: "สมศักดิ์ มุ่งมั่น",
    position: "Senior Software Engineer",
    company: "Tech Corp Thailand",
    phone: "089-123-4567",
    email: "somsak@email.com",
    submittedDate: "10 ธ.ค. 67",
    stage: 3,
    stageLabel: "สัมภาษณ์ HR",
    status: "in-progress",
    matchScore: 85,
    commission: 15000,
    interviewDate: "15 ธ.ค. 67 10:00",
  },
  {
    id: 2,
    name: "มานี รักดี",
    position: "Marketing Manager",
    company: "Global Brand Co.",
    phone: "081-234-5678",
    email: "manee@email.com",
    submittedDate: "8 ธ.ค. 67",
    stage: 4,
    stageLabel: "สัมภาษณ์ผู้บริหาร",
    status: "in-progress",
    matchScore: 92,
    commission: 20000,
    interviewDate: "16 ธ.ค. 67 14:00",
  },
  {
    id: 3,
    name: "วิชัย ขยันเรียน",
    position: "CFO",
    company: "Investment Group",
    phone: "082-345-6789",
    email: "wichai@email.com",
    submittedDate: "5 ธ.ค. 67",
    stage: 5,
    stageLabel: "รับเข้าทำงาน",
    status: "success",
    matchScore: 88,
    commission: 50000,
    interviewDate: null,
  },
];

const stageLabels = ["ส่งใบสมัคร", "ตรวจเอกสาร", "สัมภาษณ์ HR", "สัมภาษณ์ผู้บริหาร", "รับเข้าทำงาน"];

const CandidateTracker = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const filteredCandidates = candidates.filter(c => {
    if (filter === "all") return true;
    if (filter === "in-progress") return c.status === "in-progress";
    if (filter === "success") return c.status === "success";
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress": return "text-primary bg-primary/10";
      case "success": return "text-green-500 bg-green-500/10";
      case "failed": return "text-red-500 bg-red-500/10";
      default: return "text-muted-foreground bg-secondary";
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-lg font-bold">ติดตามผู้สมัคร</h1>
                <p className="text-sm opacity-90">ดูสถานะผู้สมัครที่คุณส่ง</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">{candidates.length}</p>
                <p className="text-xs opacity-75">ทั้งหมด</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">{candidates.filter(c => c.status === "in-progress").length}</p>
                <p className="text-xs opacity-75">กำลังดำเนินการ</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">{candidates.filter(c => c.status === "success").length}</p>
                <p className="text-xs opacity-75">สำเร็จ</p>
              </div>
            </div>
          </div>
        </header>

        {/* Filter Tabs */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex gap-2">
            {[
              { key: "all", label: "ทั้งหมด" },
              { key: "in-progress", label: "กำลังดำเนินการ" },
              { key: "success", label: "สำเร็จ" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Candidate List */}
        <div className="px-4 py-4 space-y-4">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="bg-card rounded-xl border border-border overflow-hidden">
              {/* Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{candidate.name}</h3>
                      <p className="text-sm text-muted-foreground">{candidate.position}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(candidate.status)}`}>
                    {candidate.stageLabel}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>{candidate.company}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">ความคืบหน้า</span>
                    <span className="font-medium text-foreground">{candidate.stage}/5</span>
                  </div>
                  <div className="flex gap-1">
                    {stageLabels.map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-2 rounded-full ${
                          i < candidate.stage 
                            ? candidate.status === "success" ? "bg-green-500" : "bg-primary"
                            : "bg-secondary"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Match Score</p>
                    <p className="font-semibold text-green-500">{candidate.matchScore}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">ค่าคอม</p>
                    <p className="font-semibold text-accent">฿{candidate.commission.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Interview Info */}
              {candidate.interviewDate && (
                <div className="px-4 py-3 bg-primary/5 border-t border-border flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">นัดสัมภาษณ์: {candidate.interviewDate}</span>
                </div>
              )}

              {/* Actions */}
              <div className="px-4 py-3 border-t border-border flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate("/chat")}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  แชท
                </Button>
                <Button size="sm" className="flex-1" onClick={() => navigate(`/recruiter/candidate/${candidate.id}`)}>
                  ดูรายละเอียด
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default CandidateTracker;
