import { Home, Briefcase, Search, MessageCircle, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/jobs", icon: Briefcase, label: "Jobboard" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/chat", icon: MessageCircle, label: "Chat", badge: 4 },
  { to: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
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
