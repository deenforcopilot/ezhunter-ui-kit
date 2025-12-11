import { Home, Briefcase, Search, MessageCircle, User, LayoutDashboard, Building2, Users } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { useRole } from "@/contexts/RoleContext";

interface NavItem {
  to: string;
  icon: any;
  label: string;
  badge?: number;
}

const getNavItems = (role: string): NavItem[] => {
  const baseItems: NavItem[] = [
    { to: "/", icon: Home, label: "หน้าหลัก" },
  ];

  switch (role) {
    case "client":
      return [
        ...baseItems,
        { to: "/client/dashboard", icon: LayoutDashboard, label: "แดชบอร์ด" },
        { to: "/client/jobs", icon: Briefcase, label: "งานของฉัน" },
        { to: "/chat", icon: MessageCircle, label: "แชท", badge: 4 },
        { to: "/profile", icon: User, label: "โปรไฟล์" },
      ];
    case "recruiter":
      return [
        ...baseItems,
        { to: "/recruiter/marketplace", icon: Briefcase, label: "มาร์เก็ตเพลส" },
        { to: "/recruiter/dashboard", icon: LayoutDashboard, label: "แดชบอร์ด" },
        { to: "/chat", icon: MessageCircle, label: "แชท", badge: 4 },
        { to: "/profile", icon: User, label: "โปรไฟล์" },
      ];
    case "admin":
      return [
        ...baseItems,
        { to: "/admin/dashboard", icon: LayoutDashboard, label: "แดชบอร์ด" },
        { to: "/admin/recruiters", icon: Users, label: "รีครูทเตอร์" },
        { to: "/admin/clients", icon: Building2, label: "ลูกค้า" },
        { to: "/profile", icon: User, label: "โปรไฟล์" },
      ];
    default:
      return [
        ...baseItems,
        { to: "/jobs", icon: Briefcase, label: "หางาน" },
        { to: "/search", icon: Search, label: "ค้นหา" },
        { to: "/chat", icon: MessageCircle, label: "แชท", badge: 4 },
        { to: "/profile", icon: User, label: "โปรไฟล์" },
      ];
  }
};

export function BottomNav() {
  const { role } = useRole();
  const navItems = getNavItems(role);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-nav">
      <div className="max-w-md mx-auto flex items-center justify-around h-nav px-2 pb-safe">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="nav-item flex-1"
            activeClassName="nav-item-active"
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <div className={cn(
                  "relative transition-all",
                  isActive && "nav-icon-bg bg-primary text-primary-foreground rounded-full p-2"
                )}>
                  <item.icon className="w-5 h-5" />
                  {item.badge && !isActive && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
