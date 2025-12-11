import { Bell } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SearchBar } from "@/components/home/SearchBar";
import { CategoryChips } from "@/components/home/CategoryChips";
import { PointsBanner } from "@/components/home/PointsBanner";
import { PromoBanner } from "@/components/home/PromoBanner";
import { JobCategories } from "@/components/home/JobCategories";
import { PopularJobs } from "@/components/home/PopularJobs";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";

const Index = () => {
  const navigate = useNavigate();
  const { role, user } = useRole();

  const getGreeting = () => {
    switch (role) {
      case "client": return "ค้นหาผู้สมัครที่เหมาะสม";
      case "recruiter": return "รับงานสรรหาเพิ่มรายได้";
      case "admin": return "จัดการระบบทั้งหมด";
      default: return "ค้นหางานที่ใช่สำหรับคุณ";
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-lg font-bold text-foreground">สวัสดี, {user.name.split(' ')[0]}</h1>
                <p className="text-sm text-muted-foreground">{getGreeting()}</p>
              </div>
              <button 
                onClick={() => navigate("/notifications")}
                className="relative p-2 hover:bg-secondary rounded-xl transition-colors"
              >
                <Bell className="w-6 h-6 text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
            </div>
            <SearchBar />
          </div>
        </header>

        {/* Content */}
        <div className="px-4 py-4 space-y-6">
          <CategoryChips />
          <PointsBanner points={user.points} value={user.points} />
          <PromoBanner />
          <JobCategories />
          <PopularJobs />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
