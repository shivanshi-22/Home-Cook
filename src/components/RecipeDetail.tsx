import { X, Clock, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Recipe } from "./RecipeCard";

interface RecipeDetailProps {
  recipe: Recipe & {
    extendedIngredients?: Array<{
      id: number;
      name: string;
      amount: number;
      unit: string;
      original: string;
    }>;
    analyzedInstructions?: Array<{
      steps: Array<{
        number: number;
        step: string;
      }>;
    }>;
    nutrition?: {
      nutrients: Array<{
        name: string;
        amount: number;
        unit: string;
      }>;
    };
  };
  onClose: () => void;
}

export const RecipeDetail = ({ recipe, onClose }: RecipeDetailProps) => {
  const ingredients = recipe.extendedIngredients || [];
  const instructions = recipe.analyzedInstructions?.[0]?.steps || [];
  const nutrition = recipe.nutrition?.nutrients || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-4xl my-8 bg-white">
        <CardHeader className="relative pb-4">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10"
          >
            <X className="w-5 h-5" />
          </Button>
          
          <div className="aspect-[16/9] -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>

          <CardTitle className="text-2xl font-bold text-foreground pr-12">
            {recipe.title}
          </CardTitle>
          
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{recipe.readyInMinutes} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{recipe.servings} servings</span>
            </div>
            {recipe.healthScore && (
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-green-fresh" />
                <span>Health Score: {recipe.healthScore}/100</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {recipe.diets.map((diet) => (
              <Badge key={diet} className="bg-green-fresh/10 text-green-fresh border-green-fresh/20">
                {diet}
              </Badge>
            ))}
            {recipe.dishTypes.map((type) => (
              <Badge key={type} variant="secondary" className="bg-orange-light/30 text-orange-warm border-orange-warm/20">
                {type}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {recipe.summary && (
            <div>
              <h3 className="text-lg font-semibold mb-3">About this recipe</h3>
              <div 
                className="text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
            </div>
          )}

          {ingredients.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                <div className="grid gap-2">
                  {ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">{ingredient.name}</span>
                      <span className="text-muted-foreground">
                        {ingredient.amount} {ingredient.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {instructions.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4">Instructions</h3>
                <div className="space-y-4">
                  {instructions.map((step) => (
                    <div key={step.number} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                        {step.number}
                      </div>
                      <p className="text-muted-foreground leading-relaxed pt-1">
                        {step.step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {nutrition.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4">Nutrition Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {nutrition.slice(0, 8).map((nutrient) => (
                    <div key={nutrient.name} className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="font-semibold text-lg text-primary">
                        {Math.round(nutrient.amount)}{nutrient.unit}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {nutrient.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};