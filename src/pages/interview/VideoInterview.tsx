import { useState } from "react";
import { ChevronLeft, Mic, MicOff, Video, VideoOff, Phone, MessageSquare, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const VideoInterview = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);

  const handleEndCall = () => {
    navigate("/applicant/applications");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-40 p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <p className="text-white font-medium">สัมภาษณ์งาน</p>
            <p className="text-white/70 text-sm">Tech Corp Thailand • 12:45</p>
          </div>
          <button className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Remote Video (Main) */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">ส</span>
          </div>
          <p className="absolute bottom-4 left-4 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
            คุณสมชาย (HR Manager)
          </p>
        </div>

        {/* Local Video (Small) */}
        <div className="absolute top-20 right-4 w-28 h-40 bg-gray-700 rounded-xl overflow-hidden border-2 border-white/20">
          {isVideoOn ? (
            <div className="w-full h-full bg-gradient-to-b from-gray-600 to-gray-800 flex items-center justify-center">
              <span className="text-xl font-bold text-white">คุณ</span>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <VideoOff className="w-8 h-8 text-gray-500" />
            </div>
          )}
        </div>

        {/* Participant Count */}
        <div className="absolute top-20 left-4 bg-black/50 px-3 py-2 rounded-full flex items-center gap-2">
          <Users className="w-4 h-4 text-white" />
          <span className="text-white text-sm">2 คน</span>
        </div>
      </div>

      {/* Chat Panel (if open) */}
      {showChat && (
        <div className="absolute bottom-24 left-4 right-4 bg-card rounded-xl border border-border h-64 overflow-hidden">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">แชท</h3>
            <button onClick={() => setShowChat(false)} className="text-muted-foreground">
              ✕
            </button>
          </div>
          <div className="p-3 h-44 overflow-y-auto space-y-3">
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">ส</span>
              </div>
              <div className="bg-secondary rounded-lg px-3 py-2 max-w-[80%]">
                <p className="text-sm text-foreground">สวัสดีครับ พร้อมเริ่มสัมภาษณ์ได้เลยครับ</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-border bg-card">
            <input 
              type="text" 
              placeholder="พิมพ์ข้อความ..." 
              className="w-full px-3 py-2 bg-secondary rounded-lg text-sm text-foreground"
            />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? "bg-red-500" : "bg-white/20 hover:bg-white/30"
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              !isVideoOn ? "bg-red-500" : "bg-white/20 hover:bg-white/30"
            }`}
          >
            {isVideoOn ? (
              <Video className="w-6 h-6 text-white" />
            ) : (
              <VideoOff className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={() => setShowChat(!showChat)}
            className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
          >
            <MessageSquare className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handleEndCall}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
          >
            <Phone className="w-6 h-6 text-white rotate-[135deg]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoInterview;
