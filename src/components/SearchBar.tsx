import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-2 p-2 bg-white rounded-2xl shadow-[var(--shadow-card)] border border-border">
        <Input
          type="text"
          placeholder="Search for delicious recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button 
          type="submit" 
          disabled={isLoading || !query.trim()}
          variant="default"
          size="lg"
          className="bg-[var(--gradient-hero)] hover:opacity-90 transition-opacity rounded-xl px-8 shadow-[var(--shadow-hero)]"
        >
          <Search className="w-5 h-5" />
          Search
        </Button>
      </div>
    </form>
  );
};