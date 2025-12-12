import { useState } from "react";
import { ChevronLeft, ThumbsUp, ThumbsDown, User, Sparkles, MessageSquare, Calendar, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const applicants = [
  {
    id: 1,
    name: "สมศักดิ์ มุ่งมั่น",
    position: "Senior Software Engineer",
    matchScore: 92,
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    experience: "5 ปี",
    salary: "80,000 - 100,000",
    aiSummary: "วิศวกรซอฟต์แวร์ที่มีประสบการณ์สูง เชี่ยวชาญ Full-stack Development มีผลงานพัฒนาระบบขนาดใหญ่",
    softSkillScore: 88,
    recruiterName: "คุณมานี",
  },
  {
    id: 2,
    name: "สมหญิง ใจดี",
    position: "Senior Software Engineer",
    matchScore: 85,
    skills: ["React", "Python", "Docker"],
    experience: "4 ปี",
    salary: "70,000 - 90,000",
    aiSummary: "นักพัฒนาที่มีความสามารถหลากหลาย เน้นด้าน DevOps และ Cloud Infrastructure",
    softSkillScore: 92,
    recruiterName: "คุณจันทร์",
  },
];

const ApplicantReview = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const currentApplicant = applicants[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);
    setTimeout(() => {
      setSwipeDirection(null);
      if (currentIndex < applicants.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setComment("");
      } else {
        navigate("/client/dashboard");
      }
    }, 300);
  };

  if (!currentApplicant) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
          <ThumbsUp className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">ตรวจสอบเสร็จสิ้น!</h2>
        <p className="text-muted-foreground text-center mb-6">คุณได้ตรวจสอบผู้สมัครทั้งหมดแล้ว</p>
        <Button onClick={() => navigate("/client/dashboard")}>กลับสู่แดชบอร์ด</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-foreground">ตรวจสอบผู้สมัคร</h1>
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} / {applicants.length}
            </p>
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Applicant Card */}
      <div className="px-4 py-4">
        <div 
          className={`bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 ${
            swipeDirection === "left" ? "translate-x-[-100%] opacity-0" :
            swipeDirection === "right" ? "translate-x-[100%] opacity-0" : ""
          }`}
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentApplicant.name}</h2>
                <p className="text-sm opacity-90">{currentApplicant.position}</p>
                <p className="text-xs opacity-75">{currentApplicant.experience} ประสบการณ์</p>
              </div>
            </div>
          </div>

          {/* Match Score */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">AI Match Score</span>
              </div>
              <span className={`text-2xl font-bold ${
                currentApplicant.matchScore >= 80 ? "text-green-500" : "text-yellow-500"
              }`}>
                {currentApplicant.matchScore}%
              </span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  currentApplicant.matchScore >= 80 ? "bg-green-500" : "bg-yellow-500"
                }`}
                style={{ width: `${currentApplicant.matchScore}%` }}
              />
            </div>
          </div>

          {/* AI Summary */}
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground mb-2">AI สรุปโปรไฟล์</h3>
            <p className="text-sm text-muted-foreground">{currentApplicant.aiSummary}</p>
          </div>

          {/* Soft Skill Score */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Soft Skill Score</h3>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(currentApplicant.softSkillScore / 20)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 font-semibold text-foreground">{currentApplicant.softSkillScore}%</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground mb-2">ทักษะ</h3>
            <div className="flex flex-wrap gap-2">
              {currentApplicant.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Salary */}
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground mb-1">เงินเดือนที่คาดหวัง</h3>
            <p className="text-lg font-bold text-accent">฿{currentApplicant.salary}</p>
          </div>

          {/* Comment for Recruiter */}
          <div className="p-4">
            <h3 className="font-semibold text-foreground mb-2">Comment ถึงรีครูทเตอร์</h3>
            <textarea
              placeholder="เขียน comment หรือ feedback..."
              className="w-full h-20 px-4 py-3 bg-secondary rounded-xl resize-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-2">
              จาก: {currentApplicant.recruiterName}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            onClick={() => handleSwipe("left")}
          >
            <ThumbsDown className="w-5 h-5 mr-2" />
            ไม่ผ่าน
          </Button>
          <Button 
            size="lg" 
            className="flex-1 bg-green-500 hover:bg-green-600"
            onClick={() => handleSwipe("right")}
          >
            <ThumbsUp className="w-5 h-5 mr-2" />
            ผ่าน
          </Button>
        </div>
        <Button 
          variant="ghost" 
          className="w-full mt-2"
          onClick={() => navigate(`/interview/schedule`)}
        >
          <Calendar className="w-4 h-4 mr-2" />
          นัดสัมภาษณ์ทันที
        </Button>
      </div>
    </div>
  );
};

export default ApplicantReview;
