import { useState } from "react";
import { ChevronLeft, Search, Filter, Star, Clock, Building2, Banknote, MapPin, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const categories = [
  { id: "all", name: "ทั้งหมด", count: 45 },
  { id: "tech", name: "Technology", count: 18 },
  { id: "marketing", name: "Marketing", count: 12 },
  { id: "sales", name: "Sales", count: 8 },
  { id: "design", name: "Design", count: 5 },
  { id: "hr", name: "HR", count: 2 },
];

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Corp Thailand",
    location: "Bangkok",
    commission: 25000,
    deadline: "25 ธ.ค. 67",
    category: "tech",
    isUrgent: true,
    isStarred: false,
    candidatesNeeded: 3,
    requirements: ["React", "TypeScript", "5+ years exp"],
  },
  {
    id: 2,
    title: "Digital Marketing Manager",
    company: "Global Brand Co.",
    location: "Bangkok",
    commission: 20000,
    deadline: "30 ธ.ค. 67",
    category: "marketing",
    isUrgent: false,
    isStarred: true,
    candidatesNeeded: 2,
    requirements: ["SEO", "Google Ads", "3+ years exp"],
  },
  {
    id: 3,
    title: "Sales Executive",
    company: "Commerce Plus",
    location: "Chonburi",
    commission: 15000,
    deadline: "20 ธ.ค. 67",
    category: "sales",
    isUrgent: true,
    isStarred: false,
    candidatesNeeded: 5,
    requirements: ["B2B Sales", "Negotiation"],
  },
  {
    id: 4,
    title: "UX/UI Designer",
    company: "Creative Studio",
    location: "Bangkok",
    commission: 18000,
    deadline: "28 ธ.ค. 67",
    category: "design",
    isUrgent: false,
    isStarred: false,
    candidatesNeeded: 2,
    requirements: ["Figma", "User Research", "3+ years exp"],
  },
  {
    id: 5,
    title: "Backend Developer (Node.js)",
    company: "Data Solutions",
    location: "Remote",
    commission: 30000,
    deadline: "31 ธ.ค. 67",
    category: "tech",
    isUrgent: true,
    isStarred: true,
    candidatesNeeded: 2,
    requirements: ["Node.js", "MongoDB", "AWS"],
  },
];

const JobSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [jobs, setJobs] = useState(mockJobs);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleStar = (jobId: number) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, isStarred: !job.isStarred }
        : job
    ));
    
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      toast.success(
        job.isStarred 
          ? "นำออกจากงานของฉันแล้ว" 
          : "เพิ่มในงานของฉันแล้ว"
      );
    }
  };

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
              <div className="flex-1">
                <h1 className="text-xl font-bold">ค้นหางาน</h1>
                <p className="text-sm opacity-90">งานจาก Admin ทั้งหมด {mockJobs.length} งาน</p>
              </div>
              <button 
                onClick={() => navigate("/recruiter/my-jobs")}
                className="px-3 py-1.5 bg-white/10 rounded-lg text-sm font-medium flex items-center gap-1"
              >
                <Star className="w-4 h-4 fill-current" />
                งานของฉัน
              </button>
            </div>

            {/* Search */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                <Input
                  placeholder="ค้นหาตำแหน่งหรือบริษัท..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
              </div>
              <Button variant="secondary" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="px-4 pb-3 overflow-x-auto">
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-white text-primary"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Jobs List */}
        <div className="px-4 py-4 space-y-3">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">ไม่พบงานที่ค้นหา</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{job.title}</h3>
                          {job.isUrgent && (
                            <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-medium">
                              ด่วน
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleStar(job.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        job.isStarred 
                          ? "bg-accent/10 text-accent" 
                          : "bg-secondary text-muted-foreground hover:text-accent"
                      }`}
                    >
                      <Star className={`w-5 h-5 ${job.isStarred ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {job.deadline}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      ต้องการ {job.candidatesNeeded} คน
                    </span>
                  </div>

                  {/* Requirements */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {job.requirements.map((req) => (
                      <span 
                        key={req}
                        className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs"
                      >
                        {req}
                      </span>
                    ))}
                  </div>

                  {/* Commission */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm font-semibold text-accent">
                      <Banknote className="w-4 h-4" />
                      ค่าคอม ฿{job.commission.toLocaleString()}/คน
                    </span>
                    <Button 
                      size="sm"
                      onClick={() => navigate(`/recruiter/job-search/${job.id}`)}
                    >
                      ดูรายละเอียด
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default JobSearch;
