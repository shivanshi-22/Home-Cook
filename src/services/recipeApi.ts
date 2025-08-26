import axios from 'axios';
import type { Recipe } from '@/components/RecipeCard';

const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// Get API key from localStorage - users can set it in the app
const getApiKey = () => {
  return localStorage.getItem('spoonacular_api_key') || '';
};

interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  dishTypes: string[];
  diets: string[];
  healthScore?: number;
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
}

export const searchRecipes = async (query: string, number = 12): Promise<Recipe[]> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    // Return mock data if no API key is set
    return getMockRecipes();
  }

  try {
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/complexSearch`, {
      params: {
        apiKey,
        query,
        number,
        addRecipeInformation: true,
        fillIngredients: true,
      },
    });

    return response.data.results.map((recipe: SpoonacularRecipe): Recipe => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      summary: recipe.summary,
      dishTypes: recipe.dishTypes || [],
      diets: recipe.diets || [],
      healthScore: recipe.healthScore,
    }));
  } catch (error) {
    console.error('Error searching recipes:', error);
    // Return mock data as fallback
    return getMockRecipes();
  }
};

export const getRecipeDetails = async (id: number) => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return getMockRecipeDetails();
  }

  try {
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/${id}/information`, {
      params: {
        apiKey,
        includeNutrition: true,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return getMockRecipeDetails();
  }
};

// Mock data for demo purposes when no API key is provided
const getMockRecipes = (): Recipe[] => [
  {
    id: 1,
    title: "Delicious Pasta Carbonara",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400",
    readyInMinutes: 30,
    servings: 4,
    summary: "A classic Italian pasta dish with eggs, cheese, and pancetta.",
    dishTypes: ["main course", "pasta"],
    diets: [],
    healthScore: 75,
  },
  {
    id: 2,
    title: "Fresh Garden Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    readyInMinutes: 15,
    servings: 2,
    summary: "A refreshing salad with mixed greens, tomatoes, and vinaigrette.",
    dishTypes: ["salad", "side dish"],
    diets: ["vegetarian", "vegan", "gluten free"],
    healthScore: 95,
  },
  {
    id: 3,
    title: "Homemade Pizza Margherita",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
    readyInMinutes: 45,
    servings: 6,
    summary: "Traditional Italian pizza with fresh tomatoes, mozzarella, and basil.",
    dishTypes: ["main course", "pizza"],
    diets: ["vegetarian"],
    healthScore: 68,
  },
  {
    id: 4,
    title: "Chocolate Chip Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
    readyInMinutes: 25,
    servings: 12,
    summary: "Classic homemade cookies with chocolate chips.",
    dishTypes: ["dessert", "cookies"],
    diets: ["vegetarian"],
    healthScore: 35,
  },
];

const getMockRecipeDetails = () => ({
  extendedIngredients: [
    { id: 1, name: "Spaghetti", amount: 400, unit: "g", original: "400g spaghetti" },
    { id: 2, name: "Eggs", amount: 3, unit: "large", original: "3 large eggs" },
    { id: 3, name: "Parmesan cheese", amount: 100, unit: "g", original: "100g grated parmesan" },
    { id: 4, name: "Pancetta", amount: 150, unit: "g", original: "150g diced pancetta" },
  ],
  analyzedInstructions: [{
    steps: [
      { number: 1, step: "Cook spaghetti according to package instructions until al dente." },
      { number: 2, step: "In a bowl, whisk eggs with grated parmesan cheese." },
      { number: 3, step: "Cook pancetta in a large pan until crispy." },
      { number: 4, step: "Add hot pasta to the pan with pancetta." },
      { number: 5, step: "Remove from heat and quickly mix in egg mixture." },
      { number: 6, step: "Serve immediately with extra parmesan." },
    ]
  }],
  nutrition: {
    nutrients: [
      { name: "Calories", amount: 425, unit: "kcal" },
      { name: "Protein", amount: 18, unit: "g" },
      { name: "Carbohydrates", amount: 52, unit: "g" },
      { name: "Fat", amount: 16, unit: "g" },
      { name: "Fiber", amount: 3, unit: "g" },
      { name: "Sugar", amount: 2, unit: "g" },
      { name: "Sodium", amount: 580, unit: "mg" },
      { name: "Cholesterol", amount: 155, unit: "mg" },
    ]
  }
});

export const setApiKey = (apiKey: string) => {
  localStorage.setItem('spoonacular_api_key', apiKey);
};

export const hasApiKey = () => {
  return !!getApiKey();
};