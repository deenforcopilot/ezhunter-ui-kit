import { useState } from "react";
import { ChevronLeft, Upload, AlertCircle, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    jobType: "full-time",
    workMode: "onsite",
    experience: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    isUrgent: false,
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const jobTypes = [
    { id: "full-time", label: "เต็มเวลา" },
    { id: "part-time", label: "พาร์ทไทม์" },
    { id: "contract", label: "สัญญาจ้าง" },
    { id: "freelance", label: "ฟรีแลนซ์" },
  ];

  const workModes = [
    { id: "onsite", label: "ทำงานที่ออฟฟิศ" },
    { id: "remote", label: "ทำงานที่บ้าน" },
    { id: "hybrid", label: "ไฮบริด" },
  ];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSubmit = () => {
    console.log({ ...formData, skills });
    navigate("/client/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-foreground">สร้างประกาศงาน</h1>
        </div>
      </header>

      {/* Form */}
      <div className="px-4 py-4 space-y-6 pb-32">
        {/* Basic Info */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">ข้อมูลพื้นฐาน</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">ตำแหน่งงาน *</label>
              <Input
                placeholder="เช่น Senior Frontend Developer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">แผนก/ฝ่าย</label>
              <Input
                placeholder="เช่น Engineering, Marketing"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">สถานที่ทำงาน</label>
              <Input
                placeholder="เช่น กรุงเทพมหานคร"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Salary */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">เงินเดือน</h2>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-1 block">ขั้นต่ำ</label>
              <Input
                type="number"
                placeholder="30,000"
                value={formData.salaryMin}
                onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-1 block">สูงสุด</label>
              <Input
                type="number"
                placeholder="80,000"
                value={formData.salaryMax}
                onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Job Type */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">ประเภทงาน</h2>
          <div className="grid grid-cols-2 gap-2">
            {jobTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFormData({ ...formData, jobType: type.id })}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                  formData.jobType === type.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </section>

        {/* Work Mode */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">รูปแบบการทำงาน</h2>
          <div className="grid grid-cols-3 gap-2">
            {workModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setFormData({ ...formData, workMode: mode.id })}
                className={`py-3 px-3 rounded-xl text-sm font-medium transition-colors ${
                  formData.workMode === mode.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">ทักษะที่ต้องการ</h2>
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

        {/* Description */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">รายละเอียดงาน</h2>
          <textarea
            placeholder="อธิบายเกี่ยวกับตำแหน่งงานนี้..."
            className="w-full h-32 px-4 py-3 bg-background border border-input rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </section>

        {/* Urgent Tag */}
        <section>
          <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-accent" />
              <div>
                <p className="font-medium text-foreground">ด่วน!</p>
                <p className="text-sm text-muted-foreground">แสดงป้ายด่วนให้ผู้สมัคร</p>
              </div>
            </div>
            <button
              onClick={() => setFormData({ ...formData, isUrgent: !formData.isUrgent })}
              className={`w-12 h-6 rounded-full transition-colors ${
                formData.isUrgent ? "bg-accent" : "bg-secondary"
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                formData.isUrgent ? "translate-x-6" : "translate-x-0.5"
              }`} />
            </button>
          </div>
        </section>

        {/* File Upload */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">แนบไฟล์</h2>
          <button className="w-full p-6 border-2 border-dashed border-border rounded-xl flex flex-col items-center gap-2 hover:border-primary transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">แตะเพื่ออัปโหลด JD, ไฟล์เพิ่มเติม</p>
          </button>
        </section>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-nav-height left-0 right-0 p-4 bg-card border-t border-border">
        <Button onClick={handleSubmit} className="w-full" size="lg">
          ลงประกาศงาน
        </Button>
      </div>
    </div>
  );
};

export default CreateJob;
