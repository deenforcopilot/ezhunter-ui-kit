import { useState } from "react";
import { ChevronLeft, Brain, Heart, Code, Clock, CheckCircle, Lock, Play, ChevronRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const tests = [
  {
    id: 1,
    title: "Soft Skills Assessment",
    description: "ประเมินทักษะการสื่อสาร การทำงานเป็นทีม และการแก้ปัญหา",
    icon: Heart,
    duration: "15 นาที",
    questions: 20,
    status: "completed",
    score: 85,
    completedDate: "10 ธ.ค. 67",
  },
  {
    id: 2,
    title: "Personality Test",
    description: "ทดสอบบุคลิกภาพและความเหมาะสมกับวัฒนธรรมองค์กร",
    icon: Brain,
    duration: "20 นาที",
    questions: 30,
    status: "available",
    score: null,
    completedDate: null,
  },
  {
    id: 3,
    title: "Technical Assessment",
    description: "ทดสอบทักษะทางเทคนิคตามตำแหน่งที่สมัคร",
    icon: Code,
    duration: "45 นาที",
    questions: 25,
    status: "locked",
    score: null,
    completedDate: null,
  },
];

const OnlineTests = () => {
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState<number | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">
            <CheckCircle className="w-3 h-3" />
            ทำแล้ว
          </span>
        );
      case "available":
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
            <Play className="w-3 h-3" />
            พร้อมทดสอบ
          </span>
        );
      case "locked":
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
            <Lock className="w-3 h-3" />
            ล็อค
          </span>
        );
      default:
        return null;
    }
  };

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
                <h1 className="text-lg font-bold">การทดสอบออนไลน์</h1>
                <p className="text-sm opacity-90">ทำแบบทดสอบเพื่อเพิ่มโอกาสได้งาน</p>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">ความคืบหน้า</span>
                <span className="font-bold">1/3 ทำแล้ว</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: "33%" }} />
              </div>
            </div>
          </div>
        </header>

        {/* Test List */}
        <div className="px-4 py-4 space-y-4">
          {tests.map((test) => {
            const Icon = test.icon;
            return (
              <div
                key={test.id}
                className={`bg-card rounded-xl border border-border overflow-hidden ${
                  test.status === "locked" ? "opacity-60" : ""
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      test.status === "completed" ? "bg-green-500/10" : "bg-primary/10"
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        test.status === "completed" ? "text-green-500" : "text-primary"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-foreground">{test.title}</h3>
                        {getStatusBadge(test.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {test.duration}
                        </span>
                        <span>{test.questions} ข้อ</span>
                      </div>
                    </div>
                  </div>

                  {test.status === "completed" && (
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">คะแนนที่ได้</p>
                        <p className="text-2xl font-bold text-green-500">{test.score}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">ทำเมื่อ</p>
                        <p className="text-sm font-medium text-foreground">{test.completedDate}</p>
                      </div>
                    </div>
                  )}

                  {test.status === "available" && (
                    <Button 
                      className="w-full mt-4" 
                      onClick={() => navigate(`/applicant/test/${test.id}`)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      เริ่มทดสอบ
                    </Button>
                  )}

                  {test.status === "locked" && (
                    <div className="mt-4 p-3 bg-secondary rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">
                        ต้องทำ Personality Test ก่อนถึงจะปลดล็อคได้
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="px-4 pb-6">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20">
            <h3 className="font-semibold text-foreground mb-2">💡 เกร็ดความรู้</h3>
            <p className="text-sm text-muted-foreground">
              ผลคะแนนของคุณจะถูกส่งให้บริษัทโดยอัตโนมัติเมื่อสมัครงาน ช่วยเพิ่มโอกาสในการได้รับการพิจารณา
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default OnlineTests;
