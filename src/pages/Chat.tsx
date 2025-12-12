import { useState } from "react";
import { Search, MoreVertical, Check, CheckCheck } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const conversations = [
  {
    id: 1,
    name: "Creative Studio",
    avatar: null,
    lastMessage: "Thank you for your application! We'd like to schedule an interview.",
    time: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Digital Agency",
    avatar: null,
    lastMessage: "Can you share your portfolio?",
    time: "1h ago",
    unread: 0,
    online: false,
    read: true,
  },
  {
    id: 3,
    name: "Tech Startup Inc.",
    avatar: null,
    lastMessage: "We're excited to have you onboard!",
    time: "Yesterday",
    unread: 0,
    online: true,
    read: true,
  },
  {
    id: 4,
    name: "Media Corp",
    avatar: null,
    lastMessage: "Please review the job requirements.",
    time: "2 days ago",
    unread: 0,
    online: false,
    read: false,
  },
];

const Chat = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-bold text-foreground">แชท</h1>
              <button className="p-2 hover:bg-secondary rounded-lg">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ค้นหาแชท..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </header>

        {/* Conversation List */}
        <div className="divide-y divide-border">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => navigate(`/chat/${conv.id}`)}
              className="w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors"
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{conv.name[0]}</span>
                </div>
                {conv.online && (
                  <span className="status-dot status-dot-online absolute bottom-0 right-0 ring-2 ring-background" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-semibold ${conv.unread ? "text-foreground" : "text-foreground"}`}>
                    {conv.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">{conv.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  {conv.read !== undefined && !conv.unread && (
                    conv.read ? (
                      <CheckCheck className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <Check className="w-4 h-4 text-muted-foreground shrink-0" />
                    )
                  )}
                  <p className={`text-sm truncate ${conv.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {conv.lastMessage}
                  </p>
                </div>
              </div>

              {/* Unread Badge */}
              {conv.unread > 0 && (
                <span className="w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredConversations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">ไม่พบการสนทนา</h3>
            <p className="text-muted-foreground text-center">เริ่มสนทนาโดยการสมัครงาน</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Chat;
