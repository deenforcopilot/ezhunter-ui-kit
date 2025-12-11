import { useState } from "react";
import { ChevronLeft, Upload, User, FileText, Briefcase, GraduationCap, Plus, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const SubmitCandidate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    experience: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    notes: "",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [aiMatching, setAiMatching] = useState<{ score: number; reasons: string[] } | null>(null);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setResumeFile(e.target.files[0]);
      // Simulate AI parsing
      setTimeout(() => {
        setFormData({
          ...formData,
          name: "สมศักดิ์ มุ่งมั่น",
          phone: "089-123-4567",
          email: "somsak@email.com",
          experience: "5 ปี",
        });
        setSkills(["React", "TypeScript", "Node.js"]);
      }, 1000);
    }
  };

  const checkAIMatch = () => {
    // Simulate AI matching
    setAiMatching({
      score: 85,
      reasons: [
        "ทักษะ React/TypeScript ตรงกับความต้องการ",
        "ประสบการณ์ 5 ปีตรงกับ JD",
        "เงินเดือนที่คาดหวังอยู่ในงบ",
      ],
    });
  };

  const handleSubmit = () => {
    console.log({ ...formData, skills, resumeFile });
    navigate("/recruiter/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">ส่งผู้สมัคร</h1>
            <p className="text-sm text-muted-foreground">Senior Software Engineer - Tech Corp</p>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="px-4 py-4 space-y-6 pb-32">
        {/* Resume Upload */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">อัปโหลดเรซูเม่</h2>
          <label className="w-full p-6 border-2 border-dashed border-border rounded-xl flex flex-col items-center gap-2 hover:border-primary transition-colors cursor-pointer">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileUpload}
            />
            {resumeFile ? (
              <>
                <FileText className="w-8 h-8 text-primary" />
                <p className="text-sm font-medium text-foreground">{resumeFile.name}</p>
                <p className="text-xs text-muted-foreground">AI กำลังวิเคราะห์...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">แตะเพื่ออัปโหลด PDF/Word</p>
                <p className="text-xs text-muted-foreground">AI จะดึงข้อมูลอัตโนมัติ</p>
              </>
            )}
          </label>
        </section>

        {/* Personal Info */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">ข้อมูลส่วนตัว</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">ชื่อ-นามสกุล *</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="ระบุชื่อผู้สมัคร"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">เบอร์โทร</label>
                <Input
                  placeholder="08X-XXX-XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">อีเมล</label>
                <Input
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">ประสบการณ์</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">ประสบการณ์</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="เช่น 5 ปี"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="pl-12"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Notice Period</label>
                <Input
                  placeholder="เช่น 30 วัน"
                  value={formData.noticePeriod}
                  onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">เงินเดือนปัจจุบัน</label>
                <Input
                  placeholder="เช่น 50,000"
                  value={formData.currentSalary}
                  onChange={(e) => setFormData({ ...formData, currentSalary: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">เงินเดือนที่คาดหวัง</label>
                <Input
                  placeholder="เช่น 70,000"
                  value={formData.expectedSalary}
                  onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">ทักษะ</h2>
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="เพิ่มทักษะ"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
            />
            <Button onClick={addSkill} size="icon" variant="outline">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {skill}
                <button onClick={() => removeSkill(skill)}>
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </section>

        {/* AI Matching */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">AI ตรวจสอบ</h2>
            <Button onClick={checkAIMatch} variant="outline" size="sm">
              <Sparkles className="w-4 h-4 mr-2" />
              ตรวจ Match Score
            </Button>
          </div>

          {aiMatching && (
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Match Score</span>
                <span className={`text-2xl font-bold ${
                  aiMatching.score >= 80 ? "text-green-500" : 
                  aiMatching.score >= 60 ? "text-yellow-500" : "text-red-500"
                }`}>
                  {aiMatching.score}%
                </span>
              </div>
              <div className="space-y-2">
                {aiMatching.reasons.map((reason, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    <span className="text-muted-foreground">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Notes */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">หมายเหตุ</h2>
          <textarea
            placeholder="หมายเหตุเพิ่มเติมสำหรับลูกค้า..."
            className="w-full h-24 px-4 py-3 bg-background border border-input rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </section>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-nav-height left-0 right-0 p-4 bg-card border-t border-border">
        <Button onClick={handleSubmit} className="w-full" size="lg">
          ส่งผู้สมัคร
        </Button>
      </div>
    </div>
  );
};

export default SubmitCandidate;
