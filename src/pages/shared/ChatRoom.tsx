import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Send, Paperclip, Image, File, MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";

type Message = {
  id: number;
  content: string;
  sender: "me" | "other";
  time: string;
  type: "text" | "image" | "file";
  fileName?: string;
};

const mockMessages: Message[] = [
  { id: 1, content: "สวัสดีครับ ยินดีที่ได้รู้จักครับ", sender: "other", time: "10:00", type: "text" },
  { id: 2, content: "สวัสดีครับ ขอบคุณที่ติดต่อมาครับ", sender: "me", time: "10:02", type: "text" },
  { id: 3, content: "ผมได้ดูโปรไฟล์ของคุณแล้ว น่าสนใจมากครับ", sender: "other", time: "10:05", type: "text" },
  { id: 4, content: "ขอบคุณครับ ไม่ทราบว่าตำแหน่งนี้ต้องการอะไรบ้างครับ?", sender: "me", time: "10:07", type: "text" },
  { id: 5, content: "Resume_Somsak.pdf", sender: "me", time: "10:08", type: "file", fileName: "Resume_Somsak.pdf" },
];

const ChatRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
      type: "text",
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-bold text-primary">T</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">Tech Corp Thailand</h1>
                <p className="text-xs text-green-500">ออนไลน์</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-secondary rounded-lg">
              <Phone className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg" onClick={() => navigate("/interview/video")}>
              <Video className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg">
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Project Tag */}
        <div className="px-4 pb-2">
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
            Senior Software Engineer
          </span>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] ${
                message.sender === "me"
                  ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm"
                  : "bg-card border border-border text-foreground rounded-2xl rounded-bl-sm"
              }`}
            >
              {message.type === "text" && (
                <p className="px-4 py-2 text-sm">{message.content}</p>
              )}
              
              {message.type === "file" && (
                <div className="px-4 py-3 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    message.sender === "me" ? "bg-white/20" : "bg-primary/10"
                  }`}>
                    <File className={`w-5 h-5 ${message.sender === "me" ? "text-white" : "text-primary"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{message.fileName}</p>
                    <p className={`text-xs ${message.sender === "me" ? "opacity-75" : "text-muted-foreground"}`}>
                      PDF • 245 KB
                    </p>
                  </div>
                </div>
              )}
              
              <p className={`text-xs px-4 pb-2 ${
                message.sender === "me" ? "text-right opacity-75" : "text-muted-foreground"
              }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Attach Menu */}
      {showAttachMenu && (
        <div className="px-4 py-3 bg-card border-t border-border">
          <div className="flex gap-4 justify-center">
            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Image className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">รูปภาพ</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <File className="w-6 h-6 text-accent" />
              </div>
              <span className="text-xs text-muted-foreground">ไฟล์</span>
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className="p-2 hover:bg-secondary rounded-full"
          >
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>
          <Input
            type="text"
            placeholder="พิมพ์ข้อความ..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={!newMessage.trim()}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
