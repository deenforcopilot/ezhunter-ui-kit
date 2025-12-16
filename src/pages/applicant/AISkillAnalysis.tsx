import { useState } from "react";
import { ChevronLeft, Upload, FileText, Sparkles, Target, TrendingUp, BookOpen, ChevronRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const mockAnalysisResult = {
  currentSkills: [
    { name: "JavaScript", level: 75 },
    { name: "React", level: 60 },
    { name: "HTML/CSS", level: 85 },
    { name: "Communication", level: 70 },
  ],
  recommendedSkills: [
    { 
      name: "TypeScript", 
      reason: "จำเป็นสำหรับตำแหน่ง Senior Developer ที่คุณสนใจ",
      priority: "high",
      estimatedTime: "20 ชั่วโมง"
    },
    { 
      name: "Node.js", 
      reason: "ช่วยเพิ่มโอกาสได้งาน Full-stack Developer ถึง 40%",
      priority: "high",
      estimatedTime: "30 ชั่วโมง"
    },
    { 
      name: "SQL Database", 
      reason: "ทักษะพื้นฐานที่ 80% ของงานต้องการ",
      priority: "medium",
      estimatedTime: "15 ชั่วโมง"
    },
    { 
      name: "Git & GitHub", 
      reason: "จำเป็นสำหรับการทำงานเป็นทีม",
      priority: "medium",
      estimatedTime: "10 ชั่วโมง"
    },
    { 
      name: "English for IT", 
      reason: "เพิ่มโอกาสได้งานบริษัทต่างชาติ",
      priority: "low",
      estimatedTime: "40 ชั่วโมง"
    },
  ],
  jobMatches: [
    { title: "Junior Frontend Developer", matchScore: 72 },
    { title: "React Developer", matchScore: 65 },
    { title: "Full-stack Developer", matchScore: 45 },
  ],
};

const AISkillAnalysis = () => {
  const navigate = useNavigate();
  const [hasResume, setHasResume] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<typeof mockAnalysisResult | null>(null);

  const handleUploadResume = () => {
    setHasResume(true);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult(mockAnalysisResult);
    }, 2500);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500 bg-red-500/10";
      case "medium": return "text-yellow-500 bg-yellow-500/10";
      case "low": return "text-green-500 bg-green-500/10";
      default: return "text-muted-foreground bg-secondary";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "สำคัญมาก";
      case "medium": return "แนะนำ";
      case "low": return "เสริม";
      default: return "";
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold">AI วิเคราะห์ Skill</h1>
                <p className="text-sm opacity-90">แนะนำทักษะที่ควรพัฒนาเพื่อโอกาสงานที่ดีขึ้น</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 py-4">
          {/* Upload Resume Section */}
          {!analysisResult && (
            <div className="space-y-4">
              {!hasResume ? (
                <div className="bg-card rounded-xl border-2 border-dashed border-border p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">อัพโหลด Resume ของคุณ</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI จะวิเคราะห์ทักษะจาก Resume และแนะนำสิ่งที่ควรเรียนเพิ่ม
                  </p>
                  <Button onClick={handleUploadResume}>
                    <Upload className="w-4 h-4 mr-2" />
                    เลือกไฟล์
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">รองรับ PDF, DOC, DOCX</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">resume_somchai_2024.pdf</p>
                      <p className="text-sm text-muted-foreground">อัพโหลดเรียบร้อย</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>

                  <div className="bg-secondary/50 rounded-xl p-4">
                    <h3 className="font-medium text-foreground mb-2">เลือกตำแหน่งงานเป้าหมาย</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Frontend Developer", "Backend Developer", "Full-stack Developer", "Mobile Developer", "DevOps Engineer"].map((job) => (
                        <button
                          key={job}
                          className="px-3 py-1.5 rounded-full text-sm bg-card border border-border hover:border-primary transition-colors"
                        >
                          {job}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleAnalyze} className="w-full" size="lg" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                        กำลังวิเคราะห์...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        เริ่มวิเคราะห์ด้วย AI
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Analysis Result */}
          {analysisResult && (
            <div className="space-y-6">
              {/* Current Skills */}
              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  ทักษะปัจจุบันของคุณ
                </h3>
                <div className="space-y-3">
                  {analysisResult.currentSkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Matches */}
              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  ความเหมาะสมกับตำแหน่งงาน
                </h3>
                <div className="space-y-3">
                  {analysisResult.jobMatches.map((job) => (
                    <div key={job.title} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{job.title}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={job.matchScore} className="h-2 w-20" />
                        <span className={`text-sm font-medium ${
                          job.matchScore >= 70 ? "text-green-500" : 
                          job.matchScore >= 50 ? "text-yellow-500" : "text-red-500"
                        }`}>
                          {job.matchScore}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Skills */}
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  ทักษะที่ AI แนะนำให้เรียน
                </h3>
                <div className="space-y-3">
                  {analysisResult.recommendedSkills.map((skill, index) => (
                    <div 
                      key={skill.name} 
                      className="bg-card rounded-xl border border-border p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-bold text-primary">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{skill.name}</p>
                            <p className="text-xs text-muted-foreground">⏱️ {skill.estimatedTime}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(skill.priority)}`}>
                          {getPriorityText(skill.priority)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{skill.reason}</p>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full"
                        onClick={() => navigate("/applicant/skill-practice")}
                      >
                        เริ่มเรียนทักษะนี้
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setAnalysisResult(null)}>
                  วิเคราะห์ใหม่
                </Button>
                <Button className="flex-1" onClick={() => navigate("/applicant/skill-practice")}>
                  ไปหน้าฝึกซ้อม
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AISkillAnalysis;
