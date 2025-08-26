import { Clock, Users, Heart, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  dishTypes: string[];
  diets: string[];
  healthScore?: number;
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

export const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const recipeText = `${recipe.title}\n\nReady in: ${recipe.readyInMinutes} minutes\nServings: ${recipe.servings}\n\n${recipe.summary}`;
    const blob = new Blob([recipeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card 
      className="group cursor-pointer bg-[var(--gradient-card)] border border-border hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      onClick={() => onClick(recipe)}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors flex-1">
              {recipe.title}
            </h3>
            <div className="flex items-center gap-2 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`p-1 h-8 w-8 ${isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="p-1 h-8 w-8 text-muted-foreground hover:text-primary"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.readyInMinutes}min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} servings</span>
            </div>
            {recipe.healthScore && (
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-green-fresh" />
                <span>{recipe.healthScore}</span>
              </div>
            )}
          </div>

          {recipe.dishTypes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {recipe.dishTypes.slice(0, 3).map((type) => (
                <Badge 
                  key={type} 
                  variant="secondary"
                  className="text-xs bg-orange-light/30 text-orange-warm border-orange-warm/20"
                >
                  {type}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};