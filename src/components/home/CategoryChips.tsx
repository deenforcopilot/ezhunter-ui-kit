import { TrendingUp } from "lucide-react";

const categories = [
  { id: 1, label: "logo", icon: "📊" },
  { id: 2, label: "photography", icon: "📷" },
  { id: 3, label: "cleaning", icon: "🧹" },
  { id: 4, label: "astrology", icon: "🔮" },
  { id: 5, label: "massage", icon: "💆" },
];

export function CategoryChips() {
  return (
    <div className="scroll-smooth-x flex gap-2 py-2 -mx-4 px-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className="category-chip flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
