import { useState } from "react";
import { ChevronLeft, Search, Building2, Briefcase, DollarSign, MoreVertical, CheckCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const clients = [
  {
    id: 1,
    name: "Tech Corp Thailand",
    industry: "เทคโนโลยี",
    activeJobs: 5,
    totalJobs: 23,
    totalSpent: 485000,
    status: "active",
    joinDate: "มี.ค. 2567",
  },
  {
    id: 2,
    name: "Global Brand Co.",
    industry: "การตลาด",
    activeJobs: 3,
    totalJobs: 12,
    totalSpent: 256000,
    status: "active",
    joinDate: "พ.ค. 2567",
  },
  {
    id: 3,
    name: "Investment Group",
    industry: "การเงิน",
    activeJobs: 0,
    totalJobs: 0,
    totalSpent: 0,
    status: "pending",
    joinDate: "ธ.ค. 2567",
  },
];

const tabs = ["ทั้งหมด", "Active", "รออนุมัติ", "ไม่เคลื่อนไหว"];

const ManageClients = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-600";
      case "pending": return "bg-yellow-500/10 text-yellow-600";
      case "inactive": return "bg-gray-500/10 text-gray-600";
      default: return "bg-secondary text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "Active";
      case "pending": return "รออนุมัติ";
      case "inactive": return "ไม่เคลื่อนไหว";
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
              <h1 className="text-lg font-bold text-foreground">จัดการลูกค้า</h1>
              <p className="text-sm text-muted-foreground">{clients.length} บริษัท</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ค้นหาบริษัท..."
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

      {/* Client List */}
      <div className="px-4 py-4 space-y-3">
        {clients.map((client) => (
          <div key={client.id} className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{client.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{client.industry}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(client.status)}`}>
                      {getStatusLabel(client.status)}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-secondary rounded-lg">
                <MoreVertical className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-lg font-bold text-foreground">
                  <Briefcase className="w-4 h-4 text-primary" />
                  {client.activeJobs}
                </div>
                <p className="text-xs text-muted-foreground">งานปัจจุบัน</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-lg font-bold text-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {client.totalJobs}
                </div>
                <p className="text-xs text-muted-foreground">งานทั้งหมด</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-accent">
                  ฿{(client.totalSpent / 1000).toFixed(0)}K
                </div>
                <p className="text-xs text-muted-foreground">ค่าใช้จ่าย</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-border text-sm">
              <span className="text-muted-foreground">
                <Clock className="w-4 h-4 inline mr-1" />
                เข้าร่วม {client.joinDate}
              </span>
              <button className="text-primary font-medium">ดูรายละเอียด</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageClients;
