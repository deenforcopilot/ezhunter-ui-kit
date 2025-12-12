import { useState } from "react";
import { ChevronLeft, FileText, Download, Eye, Upload, Folder, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const documents = [
  {
    id: 1,
    name: "ใบสมัครงาน",
    fileName: "Application_Form.pdf",
    category: "application",
    uploadDate: "10 ธ.ค. 67",
    status: "approved",
    size: "245 KB",
  },
  {
    id: 2,
    name: "Resume/CV",
    fileName: "Resume_Somsak.pdf",
    category: "application",
    uploadDate: "10 ธ.ค. 67",
    status: "approved",
    size: "512 KB",
  },
  {
    id: 3,
    name: "สัญญาจ้างงาน",
    fileName: "Employment_Contract.pdf",
    category: "contract",
    uploadDate: "12 ธ.ค. 67",
    status: "pending",
    size: "1.2 MB",
  },
  {
    id: 4,
    name: "เอกสาร Onboarding",
    fileName: "Onboarding_Documents.pdf",
    category: "onboarding",
    uploadDate: "-",
    status: "required",
    size: "-",
  },
];

const categories = [
  { key: "all", label: "ทั้งหมด", icon: Folder },
  { key: "application", label: "ใบสมัคร", icon: FileText },
  { key: "contract", label: "สัญญา", icon: FileText },
  { key: "onboarding", label: "Onboarding", icon: FileText },
];

const DocumentCenter = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredDocs = documents.filter(doc => {
    if (activeCategory === "all") return true;
    return doc.category === activeCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">
            <CheckCircle className="w-3 h-3" />
            อนุมัติแล้ว
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500">
            <Clock className="w-3 h-3" />
            รอตรวจสอบ
          </span>
        );
      case "required":
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-500">
            <AlertCircle className="w-3 h-3" />
            ต้องอัปโหลด
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
                <h1 className="text-lg font-bold">ศูนย์เอกสาร</h1>
                <p className="text-sm opacity-90">จัดการเอกสารทั้งหมดของคุณ</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">{documents.length}</p>
                <p className="text-xs opacity-75">เอกสารทั้งหมด</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">{documents.filter(d => d.status === "approved").length}</p>
                <p className="text-xs opacity-75">อนุมัติแล้ว</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">{documents.filter(d => d.status === "required").length}</p>
                <p className="text-xs opacity-75">ต้องอัปโหลด</p>
              </div>
            </div>
          </div>
        </header>

        {/* Categories */}
        <div className="px-4 py-3 border-b border-border overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Document List */}
        <div className="px-4 py-4 space-y-3">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    doc.status === "required" ? "bg-red-500/10" : "bg-primary/10"
                  }`}>
                    <FileText className={`w-6 h-6 ${
                      doc.status === "required" ? "text-red-500" : "text-primary"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{doc.name}</h3>
                      {getStatusBadge(doc.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{doc.fileName}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      {doc.uploadDate !== "-" && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {doc.uploadDate}
                        </span>
                      )}
                      {doc.size !== "-" && <span>{doc.size}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 py-3 border-t border-border flex gap-2">
                {doc.status === "required" ? (
                  <Button className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    อัปโหลด
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      ดู
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      ดาวน์โหลด
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Upload Button */}
        <div className="fixed bottom-20 right-4">
          <Button size="lg" className="rounded-full shadow-lg">
            <Upload className="w-5 h-5 mr-2" />
            อัปโหลดเอกสาร
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default DocumentCenter;
