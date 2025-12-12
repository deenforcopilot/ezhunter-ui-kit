import { useState } from "react";
import { ChevronLeft, Upload, FileText, User, Mail, Phone, Briefcase, GraduationCap, Sparkles, Edit2, Camera } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ApplicantProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const profile = {
    name: "สมศักดิ์ มุ่งมั่น",
    email: "somsak@email.com",
    phone: "089-123-4567",
    position: "Senior Software Engineer",
    experience: "5 ปี",
    education: "วิศวกรรมคอมพิวเตอร์ จุฬาลงกรณ์มหาวิทยาลัย",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
    languages: ["ไทย (Native)", "อังกฤษ (Fluent)"],
  };

  const handleResumeUpload = () => {
    setResumeUploaded(true);
    setTimeout(() => {
      setAiSummary("วิศวกรซอฟต์แวร์อาวุโสที่มีประสบการณ์ 5 ปี เชี่ยวชาญด้าน Full-stack Development โดยเฉพาะ React และ Node.js มีประสบการณ์ในการนำทีมพัฒนาและ deliver โปรเจกต์ขนาดใหญ่");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <header className="bg-primary text-primary-foreground">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-bold">โปรไฟล์ของฉัน</h1>
              <button onClick={() => setIsEditing(!isEditing)} className="p-2 hover:bg-white/10 rounded-lg">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Photo */}
            <div className="flex flex-col items-center py-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-12 h-12" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-accent-foreground" />
                </button>
              </div>
              <h2 className="text-xl font-bold mt-3">{profile.name}</h2>
              <p className="text-sm opacity-90">{profile.position}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 py-4 space-y-4">
          {/* Resume Upload */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">อัปโหลดเรซูเม่</h3>
              {resumeUploaded && (
                <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">อัปโหลดแล้ว</span>
              )}
            </div>
            
            {!resumeUploaded ? (
              <label className="w-full p-6 border-2 border-dashed border-border rounded-xl flex flex-col items-center gap-2 hover:border-primary transition-colors cursor-pointer">
                <input type="file" className="hidden" onChange={handleResumeUpload} />
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">แตะเพื่ออัปโหลด PDF/Word</p>
                <p className="text-xs text-muted-foreground">AI จะดึงข้อมูลและสรุปอัตโนมัติ</p>
              </label>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                <FileText className="w-8 h-8 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Resume_Somsak.pdf</p>
                  <p className="text-xs text-muted-foreground">อัปโหลดเมื่อ 12 ธ.ค. 67</p>
                </div>
              </div>
            )}
          </div>

          {/* AI Summary */}
          {aiSummary && (
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI สรุปประสบการณ์</h3>
              </div>
              <p className="text-sm text-muted-foreground">{aiSummary}</p>
            </div>
          )}

          {/* Contact Info */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-3">ข้อมูลติดต่อ</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">อีเมล</p>
                  <p className="font-medium text-foreground">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">เบอร์โทร</p>
                  <p className="font-medium text-foreground">{profile.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-3">ประสบการณ์</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{profile.position}</p>
                <p className="text-sm text-muted-foreground">{profile.experience}</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-3">การศึกษา</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{profile.education}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-3">ทักษะ</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-3">ภาษา</h3>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang) => (
                <span key={lang} className="px-3 py-1 bg-secondary text-foreground rounded-full text-sm">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ApplicantProfile;
