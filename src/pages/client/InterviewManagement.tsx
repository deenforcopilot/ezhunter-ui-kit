import { useState } from "react";
import { ChevronLeft, Calendar, Clock, Video, MapPin, User, Building2, Edit2, X, Phone, MessageSquare } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const interviews = [
  {
    id: 1,
    candidateName: "สมศักดิ์ มุ่งมั่น",
    position: "Senior Software Engineer",
    date: "15 ธ.ค. 67",
    time: "10:00",
    type: "video",
    status: "upcoming",
    interviewer: "คุณสมชาย (HR Manager)",
  },
  {
    id: 2,
    candidateName: "มานี รักดี",
    position: "Marketing Manager",
    date: "16 ธ.ค. 67",
    time: "14:00",
    type: "onsite",
    status: "upcoming",
    interviewer: "คุณวิภา (CMO)",
  },
  {
    id: 3,
    candidateName: "วิชัย ขยันเรียน",
    position: "CFO",
    date: "10 ธ.ค. 67",
    time: "11:00",
    type: "video",
    status: "completed",
    interviewer: "คุณประสิทธิ์ (CEO)",
  },
];

const InterviewManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredInterviews = interviews.filter(i => i.status === activeTab);

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-lg font-bold">จัดการนัดสัมภาษณ์</h1>
                <p className="text-sm opacity-90">ดูและจัดการการนัดสัมภาษณ์ทั้งหมด</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">{interviews.filter(i => i.status === "upcoming").length}</p>
                <p className="text-xs opacity-75">กำลังจะมาถึง</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">{interviews.filter(i => i.type === "video").length}</p>
                <p className="text-xs opacity-75">Video Call</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">{interviews.filter(i => i.status === "completed").length}</p>
                <p className="text-xs opacity-75">เสร็จสิ้น</p>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="px-4 border-b border-border">
          <div className="flex gap-2">
            {[
              { key: "upcoming", label: "กำลังจะมาถึง" },
              { key: "completed", label: "เสร็จสิ้น" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interview List */}
        <div className="px-4 py-4 space-y-4">
          {filteredInterviews.map((interview) => (
            <div key={interview.id} className="bg-card rounded-xl border border-border overflow-hidden">
              {/* Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{interview.candidateName}</h3>
                      <p className="text-sm text-muted-foreground">{interview.position}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    interview.type === "video" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-accent/10 text-accent"
                  }`}>
                    {interview.type === "video" ? (
                      <>
                        <Video className="w-3 h-3 inline mr-1" />
                        Video Call
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3 h-3 inline mr-1" />
                        Onsite
                      </>
                    )}
                  </span>
                </div>

                {/* Interview Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{interview.date}</span>
                    <Clock className="w-4 h-4 text-muted-foreground ml-2" />
                    <span className="text-foreground">{interview.time} น.</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">ผู้สัมภาษณ์: {interview.interviewer}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {interview.status === "upcoming" && (
                <div className="px-4 py-3 border-t border-border flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit2 className="w-4 h-4 mr-2" />
                    เลื่อนนัด
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    แชท
                  </Button>
                  {interview.type === "video" && (
                    <Button size="sm" className="flex-1" onClick={() => navigate("/interview/video")}>
                      <Video className="w-4 h-4 mr-2" />
                      เข้าห้อง
                    </Button>
                  )}
                </div>
              )}

              {interview.status === "completed" && (
                <div className="px-4 py-3 border-t border-border bg-secondary/50">
                  <p className="text-sm text-muted-foreground text-center">สัมภาษณ์เสร็จสิ้นแล้ว</p>
                </div>
              )}
            </div>
          ))}

          {filteredInterviews.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">ไม่มีนัดสัมภาษณ์</h3>
              <p className="text-sm text-muted-foreground">
                {activeTab === "upcoming" ? "ยังไม่มีนัดสัมภาษณ์ที่กำลังจะมาถึง" : "ยังไม่มีการสัมภาษณ์ที่เสร็จสิ้น"}
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default InterviewManagement;
