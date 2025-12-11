import { useState } from "react";
import { ArrowLeft, Search as SearchIcon, X, Clock, TrendingUp } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const recentSearches = [
  "Web Developer",
  "Graphic Designer",
  "Sales Manager",
  "Customer Service",
];

const popularKeywords = [
  "Remote",
  "Part-time",
  "Urgent",
  "Entry-level",
  "IT",
  "Marketing",
  "Finance",
  "Healthcare",
];

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Search Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border">
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-secondary rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search jobs, companies, locations..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
                  className="pl-10 pr-10"
                  autoFocus
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 py-4 space-y-6">
          {/* Recent Searches */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Recent Searches
              </h2>
              <button className="text-sm text-primary font-medium">Clear All</button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="w-full flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-secondary transition-colors"
                >
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{search}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Popular Keywords */}
          <div>
            <h2 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              Popular Keywords
            </h2>
            <div className="flex flex-wrap gap-2">
              {popularKeywords.map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(keyword)}
                  className="category-chip"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          {/* No Results State (shown when query exists but no results) */}
          {query && query.length > 2 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                <SearchIcon className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Search;
