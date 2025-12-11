import { Globe, Settings, Database, HelpCircle, LogOut, ChevronRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const settingsItems = [
  { 
    id: "language", 
    icon: Globe, 
    label: "Language", 
    value: "English",
    route: "/settings/language" 
  },
];

const accountItems = [
  { id: "account", icon: Settings, label: "Account Settings", route: "/settings/account" },
  { id: "data", icon: Database, label: "Data Management", route: "/settings/data" },
  { id: "privacy", icon: Shield, label: "Privacy Settings", route: "/settings/privacy" },
];

const supportItems = [
  { id: "help", icon: HelpCircle, label: "Help Center", route: "/help" },
];

export function SettingsMenu() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Language */}
      <div className="bg-card rounded-xl">
        {settingsItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.route)}
            className="w-full settings-item px-4"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.value && (
                <span className="text-sm text-muted-foreground">{item.value}</span>
              )}
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>

      {/* Account Settings */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </h3>
        <div className="bg-card rounded-xl">
          {accountItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="w-full settings-item px-4"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Help Center */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
          <HelpCircle className="w-4 h-4" />
          Support
        </h3>
        <div className="bg-card rounded-xl">
          {supportItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="w-full settings-item px-4"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={() => navigate("/auth")}
        className="w-full flex items-center justify-center gap-2 py-3 text-destructive font-medium"
      >
        <LogOut className="w-5 h-5" />
        <span>Log Out</span>
      </button>
    </div>
  );
}
