import { useState } from "react";
import { Bell, Users, Building2, Briefcase, TrendingUp, DollarSign, ChevronRight, UserPlus, FileText } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "ผู้ใช้ทั้งหมด", value: "2,456", change: "+12%", icon: Users, color: "bg-primary" },
  { label: "งานที่เปิดรับ", value: "156", change: "+8%", icon: Briefcase, color: "bg-accent" },
  { label: "ลูกค้าบริษัท", value: "89", change: "+5%", icon: Building2, color: "bg-green-500" },
  { label: "รายได้เดือนนี้", value: "฿1.2M", change: "+18%", icon: DollarSign, color: "bg-yellow-500" },
];

const pendingApprovals = [
  { id: 1, name: "สมหญิง ใจดี", type: "recruiter", date: "วันนี้", status: "รอตรวจสอบ" },
  { id: 2, name: "Tech Corp Thailand", type: "client", date: "วันนี้", status: "รอเอกสาร" },
  { id: 3, name: "มานะ ทำงาน", type: "recruiter", date: "เมื่อวาน", status: "รอตรวจสอบ" },
];

const recentActivities = [
  { id: 1, text: "ลูกค้าใหม่ลงทะเบียน: Global Brand Co.", time: "5 นาทีที่แล้ว" },
  { id: 2, text: "รีครูทเตอร์ส่งผู้สมัคร: Senior Developer", time: "15 นาทีที่แล้ว" },
  { id: 3, text: "ผู้สมัครผ่านรอบสัมภาษณ์: Marketing Manager", time: "1 ชั่วโมงที่แล้ว" },
  { id: 4, text: "ชำระเงินค่าคอมมิชชัน: ฿15,000", time: "2 ชั่วโมงที่แล้ว" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold">แดชบอร์ดผู้ดูแล</h1>
                <p className="text-sm opacity-90">ภาพรวมระบบทั้งหมด</p>
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
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl p-4 border border-border">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 pb-4">
          <h2 className="text-lg font-bold text-foreground mb-3">การดำเนินการด่วน</h2>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => navigate("/admin/recruiters")}
              className="bg-card rounded-xl p-4 border border-border flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">จัดการรีครูทเตอร์</p>
                <p className="text-xs text-muted-foreground">12 รออนุมัติ</p>
              </div>
            </button>
            <button 
              onClick={() => navigate("/admin/clients")}
              className="bg-card rounded-xl p-4 border border-border flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">จัดการลูกค้า</p>
                <p className="text-xs text-muted-foreground">5 ลูกค้าใหม่</p>
              </div>
            </button>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">รออนุมัติ</h2>
            <button className="text-sm text-primary font-medium">ดูทั้งหมด</button>
          </div>

          <div className="space-y-2">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.type === "recruiter" ? "bg-primary/10" : "bg-accent/10"
                  }`}>
                    {item.type === "recruiter" ? (
                      <Users className="w-5 h-5 text-primary" />
                    ) : (
                      <Building2 className="w-5 h-5 text-accent" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.date} • {item.status}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="px-4 pb-4">
          <h2 className="text-lg font-bold text-foreground mb-3">กิจกรรมล่าสุด</h2>
          <div className="bg-card rounded-xl border border-border divide-y divide-border">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <p className="text-sm text-foreground">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="px-4 pb-4">
          <h2 className="text-lg font-bold text-foreground mb-3">รายได้รายเดือน</h2>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-foreground">฿3.5M</p>
                <p className="text-sm text-muted-foreground">รวม 6 เดือนที่ผ่านมา</p>
              </div>
              <div className="flex items-center gap-1 text-green-500">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">+24%</span>
              </div>
            </div>
            {/* Simple bar chart placeholder */}
            <div className="flex items-end gap-2 h-24">
              {[40, 65, 45, 80, 70, 95].map((height, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t relative" style={{ height: `${height}%` }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t" style={{ height: `${height * 0.7}%` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>ก.ค.</span>
              <span>ส.ค.</span>
              <span>ก.ย.</span>
              <span>ต.ค.</span>
              <span>พ.ย.</span>
              <span>ธ.ค.</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
