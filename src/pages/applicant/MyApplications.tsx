import { useState } from "react";
import { Bell, MapPin, Building2, Clock, ChevronRight, Package, CheckCircle, XCircle, Clock3 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useNavigate } from "react-router-dom";

const tabs = ["ทั้งหมด", "รอตรวจ", "สัมภาษณ์", "รับเข้าทำงาน"];

const applications = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Corp Thailand",
    location: "กรุงเทพมหานคร",
    salary: "80,000 - 120,000",
    appliedDate: "10 ธ.ค. 67",
    status: "interview",
    stage: 3,
    totalStages: 5,
    nextStep: "สัมภาษณ์รอบ 2 - 15 ธ.ค. 67",
    recruiterName: "คุณมานี",
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Global Brand Co.",
    location: "กรุงเทพมหานคร",
    salary: "60,000 - 80,000",
    appliedDate: "8 ธ.ค. 67",
    status: "pending",
    stage: 1,
    totalStages: 5,
    nextStep: "รอพิจารณาเอกสาร",
    recruiterName: "คุณสมศรี",
  },
  {
    id: 3,
    title: "Product Designer",
    company: "Creative Studio",
    location: "เชียงใหม่",
    salary: "50,000 - 70,000",
    appliedDate: "5 ธ.ค. 67",
    status: "accepted",
    stage: 5,
    totalStages: 5,
    nextStep: "รับเข้าทำงาน!",
    recruiterName: "คุณจันทร์",
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Data Inc.",
    location: "กรุงเทพมหานคร",
    salary: "45,000 - 60,000",
    appliedDate: "1 ธ.ค. 67",
    status: "rejected",
    stage: 2,
    totalStages: 5,
    nextStep: "ไม่ผ่านการคัดเลือก",
    recruiterName: "คุณมะลิ",
  },
];

const stageLabels = ["ส่งใบสมัคร", "ตรวจเอกสาร", "สัมภาษณ์ HR", "สัมภาษณ์ผู้บริหาร", "รับเข้าทำงาน"];

const MyApplications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ทั้งหมด");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-500 bg-yellow-500/10";
      case "interview": return "text-primary bg-primary/10";
      case "accepted": return "text-green-500 bg-green-500/10";
      case "rejected": return "text-red-500 bg-red-500/10";
      default: return "text-muted-foreground bg-secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "รอตรวจ";
      case "interview": return "สัมภาษณ์";
      case "accepted": return "รับเข้าทำงาน";
      case "rejected": return "ไม่ผ่าน";
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return Clock3;
      case "interview": return Clock;
      case "accepted": return CheckCircle;
      case "rejected": return XCircle;
      default: return Package;
    }
  };

  const filteredApps = applications.filter(app => {
    if (activeTab === "ทั้งหมด") return true;
    if (activeTab === "รอตรวจ") return app.status === "pending";
    if (activeTab === "สัมภาษณ์") return app.status === "interview";
    if (activeTab === "รับเข้าทำงาน") return app.status === "accepted";
    return true;
  });

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold">งานที่สมัคร</h1>
                <p className="text-sm opacity-90">ติดตามสถานะการสมัครงาน</p>
              </div>
              <button 
                onClick={() => navigate("/notifications")}
                className="relative p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white/10 rounded-xl p-2 text-center">
                <p className="text-xl font-bold">{applications.length}</p>
                <p className="text-xs opacity-75">ทั้งหมด</p>
              </div>
              <div className="bg-white/10 rounded-xl p-2 text-center">
                <p className="text-xl font-bold">{applications.filter(a => a.status === "pending").length}</p>
                <p className="text-xs opacity-75">รอตรวจ</p>
              </div>
              <div className="bg-white/10 rounded-xl p-2 text-center">
                <p className="text-xl font-bold">{applications.filter(a => a.status === "interview").length}</p>
                <p className="text-xs opacity-75">สัมภาษณ์</p>
              </div>
              <div className="bg-white/10 rounded-xl p-2 text-center">
                <p className="text-xl font-bold">{applications.filter(a => a.status === "accepted").length}</p>
                <p className="text-xs opacity-75">ได้งาน</p>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="px-4 py-3 border-b border-border overflow-x-auto">
          <div className="flex gap-2">
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

        {/* Application List */}
        <div className="px-4 py-4 space-y-4">
          {filteredApps.map((app) => {
            const StatusIcon = getStatusIcon(app.status);
            return (
              <div
                key={app.id}
                className="bg-card rounded-xl border border-border overflow-hidden"
                onClick={() => navigate(`/applicant/application/${app.id}`)}
              >
                {/* Header */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{app.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Building2 className="w-4 h-4" />
                        <span>{app.company}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(app.status)}`}>
                      <StatusIcon className="w-3 h-3" />
                      {getStatusLabel(app.status)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {app.location}
                    </span>
                    <span>฿{app.salary}</span>
                  </div>
                </div>

                {/* Progress Tracking (Grab-style) */}
                <div className="px-4 py-3 bg-secondary/50 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">ความคืบหน้า</span>
                    <span className="text-xs font-medium text-foreground">{app.stage}/{app.totalStages}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {stageLabels.map((label, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div className={`w-full h-1 rounded-full ${
                          i < app.stage ? "bg-primary" : "bg-border"
                        }`} />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">ขั้นตอนถัดไป</p>
                      <p className="text-sm font-medium text-foreground">{app.nextStep}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default MyApplications;
