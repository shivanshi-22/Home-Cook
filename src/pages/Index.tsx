import { useState } from "react";
import { ChefHat } from "lucide-react";
import { RecipeCard, type Recipe } from "@/components/RecipeCard";
import { RecipeDetail } from "@/components/RecipeDetail";
import { recipes } from "@/data/recipes";
import heroImage from "@/assets/hero-food.jpg";

const Index = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-90" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <ChefHat className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">Recipe Collection</h1>
          </div>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our curated collection of 150 delicious recipes from around the world.
          </p>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Recipe Collection</h2>
            <p className="text-muted-foreground">
              Discover {recipes.length} carefully curated recipes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={handleRecipeClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default Index;