import { useState } from "react";
import { ChevronLeft, Play, CheckCircle, Star, Clock, Trophy, BookOpen, Target, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const skillCategories = [
  {
    id: "tech",
    name: "Technology",
    icon: "💻",
    skills: [
      { id: 1, name: "JavaScript Basics", lessons: 12, completed: 8, duration: "2 ชม." },
      { id: 2, name: "React Fundamentals", lessons: 15, completed: 5, duration: "3 ชม." },
      { id: 3, name: "SQL Database", lessons: 10, completed: 0, duration: "2 ชม." },
    ],
  },
  {
    id: "soft",
    name: "Soft Skills",
    icon: "🗣️",
    skills: [
      { id: 4, name: "Communication", lessons: 8, completed: 8, duration: "1.5 ชม." },
      { id: 5, name: "Leadership", lessons: 10, completed: 3, duration: "2 ชม." },
      { id: 6, name: "Time Management", lessons: 6, completed: 0, duration: "1 ชม." },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: "📊",
    skills: [
      { id: 7, name: "Digital Marketing", lessons: 14, completed: 2, duration: "3 ชม." },
      { id: 8, name: "SEO Basics", lessons: 8, completed: 0, duration: "1.5 ชม." },
      { id: 9, name: "Content Writing", lessons: 10, completed: 0, duration: "2 ชม." },
    ],
  },
  {
    id: "language",
    name: "Languages",
    icon: "🌍",
    skills: [
      { id: 10, name: "Business English", lessons: 20, completed: 10, duration: "4 ชม." },
      { id: 11, name: "TOEIC Preparation", lessons: 25, completed: 0, duration: "5 ชม." },
    ],
  },
];

const SkillPractice = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  const completedSkills = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.filter(s => s.completed === s.lessons).length,
    0
  );

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold">ฝึกซ้อม Skill</h1>
                <p className="text-sm opacity-90">พัฒนาทักษะเพื่อโอกาสงานที่ดีกว่า</p>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">ความคืบหน้าทั้งหมด</span>
                <span className="font-bold">{completedSkills}/{totalSkills} คอร์ส</span>
              </div>
              <Progress value={(completedSkills / totalSkills) * 100} className="h-2 bg-white/20" />
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-xl p-3 border border-border text-center">
              <Trophy className="w-6 h-6 text-accent mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{completedSkills}</p>
              <p className="text-xs text-muted-foreground">เรียนจบ</p>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border text-center">
              <Target className="w-6 h-6 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{totalSkills - completedSkills}</p>
              <p className="text-xs text-muted-foreground">กำลังเรียน</p>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border text-center">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">ใบรับรอง</p>
            </div>
          </div>
        </div>

        {/* AI Recommendation Banner */}
        <div className="px-4 mb-4">
          <button 
            onClick={() => navigate("/applicant/ai-skill-analysis")}
            className="w-full bg-gradient-to-r from-accent to-accent/80 rounded-xl p-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-accent-foreground">AI วิเคราะห์ Skill ที่ควรเรียน</p>
                <p className="text-sm text-accent-foreground/80">วิเคราะห์จาก Resume และเป้าหมายงานของคุณ</p>
              </div>
              <ChevronRight className="w-5 h-5 text-accent-foreground" />
            </div>
          </button>
        </div>

        {/* Categories */}
        <div className="px-4 space-y-4">
          <h2 className="text-lg font-bold text-foreground">หมวดหมู่ทักษะ</h2>
          
          {skillCategories.map((category) => (
            <div key={category.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{category.name}</p>
                    <p className="text-sm text-muted-foreground">{category.skills.length} คอร์ส</p>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${
                  selectedCategory === category.id ? "rotate-90" : ""
                }`} />
              </button>

              {selectedCategory === category.id && (
                <div className="border-t border-border">
                  {category.skills.map((skill) => {
                    const progress = (skill.completed / skill.lessons) * 100;
                    const isCompleted = skill.completed === skill.lessons;
                    
                    return (
                      <div
                        key={skill.id}
                        className="p-4 border-b border-border last:border-b-0 hover:bg-secondary/50"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground">{skill.name}</p>
                              {isCompleted && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {skill.lessons} บทเรียน
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {skill.duration}
                              </span>
                            </div>
                          </div>
                          <Button size="sm" variant={isCompleted ? "secondary" : "default"}>
                            {isCompleted ? (
                              <>ทบทวน</>
                            ) : skill.completed > 0 ? (
                              <>เรียนต่อ</>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-1" />
                                เริ่มเรียน
                              </>
                            )}
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Progress value={progress} className="h-1.5 flex-1" />
                          <span className="text-xs text-muted-foreground">
                            {skill.completed}/{skill.lessons}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default SkillPractice;
