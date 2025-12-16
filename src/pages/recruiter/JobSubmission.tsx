import { useState } from "react";
import { ChevronLeft, Upload, FileText, User, Briefcase, GraduationCap, Plus, X, Send, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface CandidateData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  skills: string[];
  expectedSalary: string;
  resumeFile: string | null;
  coverLetter: string;
}

const JobSubmission = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [step, setStep] = useState(1);
  const [newSkill, setNewSkill] = useState("");
  const [aiMatchScore, setAiMatchScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [candidate, setCandidate] = useState<CandidateData>({
    name: "",
    email: "",
    phone: "",
    experience: "",
    education: "",
    skills: [],
    expectedSalary: "",
    resumeFile: null,
    coverLetter: "",
  });

  // Mock job data
  const job = {
    id: jobId,
    title: "Senior Frontend Developer",
    company: "Tech Corp Thailand",
    requiredSkills: ["React", "TypeScript", "JavaScript", "CSS", "Git"],
    commission: 25000,
  };

  const handleUploadResume = () => {
    // Simulate file upload and AI parsing
    setCandidate(prev => ({
      ...prev,
      resumeFile: "resume_candidate.pdf",
      name: "สมหญิง รักเรียน",
      email: "somying@email.com",
      phone: "089-123-4567",
      experience: "5 ปีในตำแหน่ง Frontend Developer\n- บริษัท ABC Tech (2020-ปัจจุบัน)\n- บริษัท XYZ Digital (2018-2020)",
      education: "ปริญญาตรี วิทยาการคอมพิวเตอร์ จุฬาลงกรณ์มหาวิทยาลัย",
      skills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "Node.js"],
    }));
    toast.success("ดึงข้อมูลจาก Resume สำเร็จ");
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !candidate.skills.includes(newSkill.trim())) {
      setCandidate(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setCandidate(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleAICheck = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiMatchScore(78);
    }, 2000);
  };

  const handleSubmit = () => {
    toast.success("ส่งข้อมูลผู้สมัครสำเร็จ!");
    navigate("/recruiter/my-jobs");
  };

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 mb-3">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold">ส่งผู้สมัคร</h1>
                <p className="text-sm opacity-90">{job.title}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2">
              <Progress value={progress} className="h-2 flex-1 bg-white/20" />
              <span className="text-sm font-medium">{step}/{totalSteps}</span>
            </div>
          </div>
        </header>

        <div className="px-4 py-4">
          {/* Step 1: Upload Resume */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-foreground">อัพโหลด Resume</h2>
              
              {!candidate.resumeFile ? (
                <div 
                  onClick={handleUploadResume}
                  className="bg-card rounded-xl border-2 border-dashed border-border p-8 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">อัพโหลด Resume ผู้สมัคร</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI จะดึงข้อมูลจาก Resume อัตโนมัติ
                  </p>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    เลือกไฟล์
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">รองรับ PDF, DOC, DOCX</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-500/10 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{candidate.resumeFile}</p>
                      <p className="text-sm text-green-500">ดึงข้อมูลสำเร็จ</p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>

                  <div className="bg-card rounded-xl border border-border p-4">
                    <h3 className="font-medium text-foreground mb-3">ข้อมูลที่ AI ดึงได้:</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">ชื่อ:</span> {candidate.name}</p>
                      <p><span className="text-muted-foreground">อีเมล:</span> {candidate.email}</p>
                      <p><span className="text-muted-foreground">ทักษะ:</span> {candidate.skills.join(", ")}</p>
                    </div>
                  </div>

                  <Button onClick={() => setStep(2)} className="w-full" size="lg">
                    ถัดไป
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Edit Candidate Info */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-foreground">ข้อมูลผู้สมัคร</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">ชื่อ-นามสกุล</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      value={candidate.name}
                      onChange={(e) => setCandidate(prev => ({ ...prev, name: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">ประสบการณ์ทำงาน</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Textarea
                      value={candidate.experience}
                      onChange={(e) => setCandidate(prev => ({ ...prev, experience: e.target.value }))}
                      className="pl-10 min-h-[100px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">การศึกษา</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      value={candidate.education}
                      onChange={(e) => setCandidate(prev => ({ ...prev, education: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">ทักษะ</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {candidate.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-1"
                      >
                        {skill}
                        <button onClick={() => handleRemoveSkill(skill)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="เพิ่มทักษะ"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    />
                    <Button variant="secondary" onClick={handleAddSkill}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">เงินเดือนที่คาดหวัง</label>
                  <Input
                    placeholder="เช่น 50,000 - 60,000"
                    value={candidate.expectedSalary}
                    onChange={(e) => setCandidate(prev => ({ ...prev, expectedSalary: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  ย้อนกลับ
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1">
                  ถัดไป
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: AI Check & Submit */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-foreground">ตรวจสอบและส่ง</h2>

              {/* AI Match Score */}
              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI ตรวจความตรง JD</h3>
                    <p className="text-sm text-muted-foreground">ตรวจสอบว่าผู้สมัครตรงกับความต้องการ</p>
                  </div>
                </div>

                {aiMatchScore === null ? (
                  <Button 
                    onClick={handleAICheck} 
                    className="w-full" 
                    variant="secondary"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin mr-2" />
                        กำลังวิเคราะห์...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        ตรวจสอบด้วย AI
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">คะแนนความตรง JD</span>
                      <span className={`text-2xl font-bold ${
                        aiMatchScore >= 70 ? "text-green-500" : 
                        aiMatchScore >= 50 ? "text-yellow-500" : "text-red-500"
                      }`}>
                        {aiMatchScore}%
                      </span>
                    </div>
                    <Progress value={aiMatchScore} className="h-3" />
                    
                    <div className="bg-secondary/50 rounded-lg p-3 text-sm">
                      <p className="font-medium text-foreground mb-1">สรุปจาก AI:</p>
                      <ul className="text-muted-foreground space-y-1">
                        <li>✅ มีทักษะ React, TypeScript ตรงตามต้องการ</li>
                        <li>✅ ประสบการณ์ 5 ปี เหมาะสมกับตำแหน่ง Senior</li>
                        <li>⚠️ ไม่พบประสบการณ์ CSS Framework เช่น Tailwind</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Required Documents */}
              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="font-semibold text-foreground mb-3">เอกสารที่ต้องแนบ</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-foreground">Resume</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-foreground">Portfolio (ถ้ามี)</span>
                    <Button variant="outline" size="sm">อัพโหลด</Button>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-foreground">ใบรับรองผลงาน</span>
                    <Button variant="outline" size="sm">อัพโหลด</Button>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">ข้อความถึงบริษัท (ถ้ามี)</label>
                <Textarea
                  placeholder="แนะนำผู้สมัครคนนี้เพิ่มเติม..."
                  value={candidate.coverLetter}
                  onChange={(e) => setCandidate(prev => ({ ...prev, coverLetter: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  ย้อนกลับ
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  ส่งผู้สมัคร
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default JobSubmission;
