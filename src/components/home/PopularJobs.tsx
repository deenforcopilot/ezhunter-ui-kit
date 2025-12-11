import { MapPin, DollarSign, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const popularJobs = [
  {
    id: 1,
    title: "Photographer Needed",
    company: "Creative Studio",
    location: "Bangkok",
    salary: "15,000 - 25,000",
    type: "Full-time",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop",
    urgent: false,
  },
  {
    id: 2,
    title: "Web Banner Designer",
    company: "Digital Agency",
    location: "Remote",
    salary: "20,000 - 35,000",
    type: "Part-time",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop",
    urgent: true,
  },
  {
    id: 3,
    title: "Content Writer",
    company: "Media Corp",
    location: "Chiang Mai",
    salary: "18,000 - 28,000",
    type: "Contract",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=200&h=200&fit=crop",
    urgent: false,
  },
];

export function PopularJobs() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Popular Jobs</h2>
        <button 
          onClick={() => navigate("/jobs")}
          className="text-sm text-primary font-medium"
        >
          View All
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {popularJobs.map((job) => (
          <button
            key={job.id}
            onClick={() => navigate(`/jobs/${job.id}`)}
            className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-card transition-all text-left"
          >
            <div className="relative aspect-[4/3]">
              <img
                src={job.image}
                alt={job.title}
                className="w-full h-full object-cover"
              />
              {job.urgent && (
                <span className="badge-urgent absolute top-2 left-2">Urgent</span>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1">{job.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{job.company}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{job.location}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
