import { useState } from "react";
import { ChevronLeft, Wallet, TrendingUp, Download, Calendar, CheckCircle, Clock, DollarSign } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const earningsHistory = [
  {
    id: 1,
    candidateName: "วิชัย ขยันเรียน",
    position: "CFO",
    company: "Investment Group",
    amount: 50000,
    date: "11 ธ.ค. 67",
    status: "paid",
    type: "commission",
  },
  {
    id: 2,
    candidateName: "สมหญิง ใจดี",
    position: "Senior Developer",
    company: "Tech Startup",
    amount: 15000,
    date: "5 ธ.ค. 67",
    status: "paid",
    type: "commission",
  },
  {
    id: 3,
    candidateName: "มานี รักดี",
    position: "Marketing Manager",
    company: "Global Brand Co.",
    amount: 20000,
    date: "-",
    status: "pending",
    type: "commission",
  },
  {
    id: 4,
    candidateName: "สมศักดิ์ มุ่งมั่น",
    position: "Senior Software Engineer",
    company: "Tech Corp Thailand",
    amount: 15000,
    date: "-",
    status: "pending",
    type: "commission",
  },
];

const Earnings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const totalEarnings = earningsHistory.reduce((sum, e) => e.status === "paid" ? sum + e.amount : sum, 0);
  const pendingEarnings = earningsHistory.reduce((sum, e) => e.status === "pending" ? sum + e.amount : sum, 0);
  const thisMonth = earningsHistory.filter(e => e.date.includes("ธ.ค.") && e.status === "paid")
    .reduce((sum, e) => sum + e.amount, 0);

  const filteredEarnings = earningsHistory.filter(e => {
    if (activeTab === "all") return true;
    return e.status === activeTab;
  });

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-lg font-bold">รายได้ของฉัน</h1>
                <p className="text-sm opacity-90">ติดตามรายได้และค่าคอมมิชชัน</p>
              </div>
            </div>

            {/* Total Earnings Card */}
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm opacity-75">รายได้สะสมทั้งหมด</p>
                  <p className="text-3xl font-bold">฿{totalEarnings.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs opacity-75">เดือนนี้</span>
                  </div>
                  <p className="text-lg font-bold">฿{thisMonth.toLocaleString()}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs opacity-75">รอรับ</span>
                  </div>
                  <p className="text-lg font-bold">฿{pendingEarnings.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Withdraw Button */}
        <div className="px-4 py-4">
          <Button className="w-full" size="lg">
            <DollarSign className="w-5 h-5 mr-2" />
            ถอนเงิน (฿{thisMonth.toLocaleString()} ถอนได้)
          </Button>
        </div>

        {/* Tabs */}
        <div className="px-4 border-b border-border">
          <div className="flex gap-2">
            {[
              { key: "all", label: "ทั้งหมด" },
              { key: "paid", label: "ได้รับแล้ว" },
              { key: "pending", label: "รอรับ" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Earnings List */}
        <div className="px-4 py-4 space-y-3">
          {filteredEarnings.map((earning) => (
            <div key={earning.id} className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{earning.candidateName}</h3>
                  <p className="text-sm text-muted-foreground">{earning.position}</p>
                  <p className="text-xs text-muted-foreground">{earning.company}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                  earning.status === "paid" 
                    ? "bg-green-500/10 text-green-500" 
                    : "bg-yellow-500/10 text-yellow-500"
                }`}>
                  {earning.status === "paid" ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      ได้รับแล้ว
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      รอรับ
                    </>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{earning.status === "paid" ? earning.date : "รอผู้สมัครผ่านโปร"}</span>
                </div>
                <span className={`text-lg font-bold ${
                  earning.status === "paid" ? "text-green-500" : "text-accent"
                }`}>
                  +฿{earning.amount.toLocaleString()}
                </span>
              </div>

              {earning.status === "paid" && (
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <Download className="w-4 h-4 mr-2" />
                  ดาวน์โหลดสลิป
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Earnings;
