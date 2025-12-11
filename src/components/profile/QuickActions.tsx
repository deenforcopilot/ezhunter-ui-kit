import { Briefcase, Megaphone, Wallet, Store, Gift, Ticket, Coins, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  { id: 1, name: "My Jobs", icon: Briefcase, route: "/my-jobs", badge: null },
  { id: 2, name: "Job Ads", icon: Megaphone, route: "/job-ads", badge: "NEW" },
  { id: 3, name: "Earnings", icon: Wallet, route: "/earnings", badge: null },
  { id: 4, name: "Seller Center", icon: Store, route: "/seller-center", badge: null },
  { id: 5, name: "Rewards", icon: Gift, route: "/rewards", badge: null },
  { id: 6, name: "Coupons", icon: Ticket, route: "/coupons", badge: null },
  { id: 7, name: "Coins", icon: Coins, route: "/coins", badge: null },
  { id: 8, name: "Saved Jobs", icon: Heart, route: "/saved-jobs", badge: null },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 gap-2">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => navigate(action.route)}
          className="quick-action"
        >
          <div className="quick-action-icon relative">
            <action.icon className="w-6 h-6" />
            {action.badge && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
                {action.badge}
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-foreground text-center">{action.name}</span>
        </button>
      ))}
    </div>
  );
}
