import { MapPin, DollarSign, Clock, Building2, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JobCardProps {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  logo?: string;
  urgent?: boolean;
  date?: string;
  onSave?: () => void;
}

export function JobCard({ id, title, company, location, salary, type, logo, urgent, date, onSave }: JobCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      className="job-card animate-fade-in cursor-pointer hover:shadow-card-hover transition-shadow"
      onClick={() => navigate(`/jobs/${id}`)}
    >
      <div className="flex gap-4">
        <div className="flex-1">
          {urgent && (
            <span className="badge-urgent inline-block mb-2">Urgent Hiring</span>
          )}
          
          <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{company}</p>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4 text-accent" />
              <span>{salary} THB/month</span>
            </div>
            {type && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{type}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end justify-between">
          {date && (
            <span className="text-xs text-muted-foreground">{date}</span>
          )}
          {logo ? (
            <img src={logo} alt={company} className="w-14 h-14 rounded-lg object-contain bg-secondary p-1" />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSave?.();
            }}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Bookmark className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
