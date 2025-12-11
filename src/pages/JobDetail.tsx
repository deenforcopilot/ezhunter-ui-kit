import { ArrowLeft, Share2, Bookmark, MapPin, DollarSign, Clock, Building2, Users, Briefcase, MessageCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const JobDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock job data
  const job = {
    id: Number(id),
    title: "Urgent! Sales Representative at Lotus's Money Plus",
    company: "Krungsri Consumer",
    location: "Nong Khai District, Nong Khai Province",
    salary: "13,000 - 17,000",
    type: "Full-time",
    mode: "On-site",
    experience: "0-2 years",
    positions: 5,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Krungsri_Logo.svg/1200px-Krungsri_Logo.svg.png",
    urgent: true,
    postedDate: "Dec 11, 2024",
    description: `We are looking for enthusiastic Sales Representatives to join our team at Lotus's Money Plus branch in Nong Khai.

As a Sales Representative, you will be responsible for:
• Promoting and selling financial products and services
• Building and maintaining customer relationships
• Achieving monthly sales targets
• Providing excellent customer service

This is a great opportunity for those who are passionate about sales and want to grow their career in the financial services industry.`,
    requirements: [
      "Thai nationality",
      "Bachelor's degree in any field",
      "Good communication skills",
      "Sales experience is a plus",
      "Able to work in Nong Khai area",
    ],
    benefits: [
      "Commission + Bonus",
      "Social Security",
      "Health Insurance",
      "Annual Leave",
      "Training Provided",
    ],
    companyInfo: {
      name: "Krungsri Consumer",
      about: "Krungsri Consumer is a subsidiary of Bank of Ayudhya, providing consumer finance services across Thailand.",
      employees: "1,000-5,000",
      industry: "Financial Services",
    },
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-secondary rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-secondary rounded-lg">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4 space-y-6">
        {/* Job Header */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
              {job.logo ? (
                <img src={job.logo} alt={job.company} className="w-full h-full object-contain p-2" />
              ) : (
                <Building2 className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              {job.urgent && (
                <span className="badge-urgent inline-block mb-2">Urgent Hiring</span>
              )}
              <h1 className="text-lg font-bold text-foreground mb-1">{job.title}</h1>
              <p className="text-primary font-medium">{job.company}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">{job.salary} THB</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{job.type}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{job.positions} positions</span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <h2 className="font-bold text-foreground mb-3">Job Description</h2>
          <p className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Requirements */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <h2 className="font-bold text-foreground mb-3">Requirements</h2>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <h2 className="font-bold text-foreground mb-3">Benefits</h2>
          <div className="flex flex-wrap gap-2">
            {job.benefits.map((benefit, index) => (
              <span key={index} className="category-chip">
                {benefit}
              </span>
            ))}
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <h2 className="font-bold text-foreground mb-3">About Company</h2>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
              {job.logo ? (
                <img src={job.logo} alt={job.company} className="w-full h-full object-contain p-1" />
              ) : (
                <Building2 className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{job.companyInfo.name}</h3>
              <p className="text-xs text-muted-foreground">{job.companyInfo.industry}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{job.companyInfo.about}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{job.companyInfo.employees} employees</span>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
        <div className="max-w-md mx-auto flex gap-3">
          <Button variant="outline" size="lg" className="flex-1">
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat
          </Button>
          <Button size="lg" className="flex-1">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
