import { Star, Palette, Building2, Camera, Wrench, Truck, GraduationCap, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, name: "Recommended", icon: Star, color: "bg-blue-100 text-primary" },
  { id: 2, name: "Design", icon: Palette, color: "bg-purple-100 text-purple-600" },
  { id: 3, name: "Architecture", icon: Building2, color: "bg-orange-100 text-orange-600" },
  { id: 4, name: "Photography", icon: Camera, color: "bg-pink-100 text-pink-600" },
  { id: 5, name: "Repair", icon: Wrench, color: "bg-gray-100 text-gray-600" },
  { id: 6, name: "Delivery", icon: Truck, color: "bg-green-100 text-green-600" },
  { id: 7, name: "Education", icon: GraduationCap, color: "bg-yellow-100 text-yellow-600" },
  { id: 8, name: "Healthcare", icon: Heart, color: "bg-red-100 text-red-600" },
];

export function JobCategories() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-4">All Categories</h2>
      <div className="scroll-smooth-x flex gap-3 -mx-4 px-4 pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/jobs?category=${cat.id}`)}
            className="flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-xl bg-card border border-border hover:shadow-card transition-all"
          >
            <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center`}>
              <cat.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-foreground text-center line-clamp-1">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
