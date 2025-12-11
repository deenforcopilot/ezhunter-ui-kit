import { ArrowLeft, Bell, Briefcase, MessageCircle, Gift, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const notifications = [
  {
    id: 1,
    type: "job",
    title: "Application Viewed",
    message: "Creative Studio viewed your application for Photographer position",
    time: "2 minutes ago",
    read: false,
    icon: Briefcase,
  },
  {
    id: 2,
    type: "message",
    title: "New Message",
    message: "You have a new message from Digital Agency",
    time: "1 hour ago",
    read: false,
    icon: MessageCircle,
  },
  {
    id: 3,
    type: "promo",
    title: "Special Offer!",
    message: "Get 0% commission on your next job post. Limited time only!",
    time: "3 hours ago",
    read: true,
    icon: Gift,
  },
  {
    id: 4,
    type: "system",
    title: "Account Update",
    message: "Your profile has been verified successfully",
    time: "1 day ago",
    read: true,
    icon: Settings,
  },
  {
    id: 5,
    type: "job",
    title: "Job Alert",
    message: "5 new jobs matching your preferences have been posted",
    time: "2 days ago",
    read: true,
    icon: Briefcase,
  },
];

const Notifications = () => {
  const navigate = useNavigate();

  const getIconColor = (type: string) => {
    switch (type) {
      case "job": return "bg-primary/10 text-primary";
      case "message": return "bg-green-100 text-green-600";
      case "promo": return "bg-accent/10 text-accent";
      default: return "bg-secondary text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="px-4 py-3 flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-secondary rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Notifications</h1>
        </div>
      </header>

      {/* Notification List */}
      <div className="divide-y divide-border">
        {notifications.map((notif) => (
          <button
            key={notif.id}
            className={`w-full flex items-start gap-3 p-4 text-left transition-colors ${
              notif.read ? "bg-background" : "bg-primary/5"
            } hover:bg-secondary/50`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getIconColor(notif.type)}`}>
              <notif.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`font-semibold text-sm ${notif.read ? "text-foreground" : "text-foreground"}`}>
                  {notif.title}
                </h3>
                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-1">{notif.message}</p>
              <span className="text-xs text-muted-foreground">{notif.time}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
            <Bell className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
          <p className="text-muted-foreground text-center">You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
