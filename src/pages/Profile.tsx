import { Settings, Edit2 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MemberCard } from "@/components/profile/MemberCard";
import { PointsDisplay } from "@/components/profile/PointsDisplay";
import { QuickActions } from "@/components/profile/QuickActions";
import { SettingsMenu } from "@/components/profile/SettingsMenu";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: "EzHunter",
    avatar: null,
    level: "Member",
    serviceFee: 15,
    totalSales: 10000,
    nextLevelAmount: 5000,
    nextLevelFee: 12,
    points: 32.25,
    pointsValue: 32.25,
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header with gradient */}
        <div className="bg-gradient-to-b from-primary/10 to-background">
          <header className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-primary">{user.name[0]}</span>
                  )}
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
              {/* Name */}
              <div>
                <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
                <button className="text-sm text-primary font-medium">View Profile</button>
              </div>
            </div>
            {/* Settings */}
            <button 
              onClick={() => navigate("/settings")}
              className="p-2 hover:bg-secondary rounded-xl transition-colors"
            >
              <Settings className="w-6 h-6 text-foreground" />
            </button>
          </header>

          {/* Member Card */}
          <div className="px-4 pb-4">
            <MemberCard
              level={user.level}
              serviceFee={user.serviceFee}
              totalSales={user.totalSales}
              nextLevelAmount={user.nextLevelAmount}
              nextLevelFee={user.nextLevelFee}
            />
          </div>
        </div>

        {/* Points Display */}
        <div className="px-4 -mt-2 mb-4">
          <PointsDisplay points={user.points} value={user.pointsValue} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 mb-6">
          <div className="bg-card rounded-xl p-4 border border-border">
            <QuickActions />
          </div>
        </div>

        {/* Settings Menu */}
        <div className="px-4 pb-8">
          <SettingsMenu />
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
