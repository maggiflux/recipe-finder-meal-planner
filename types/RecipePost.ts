interface RecipePostStore {
  recipes: RecipePost[];
  searchText: string;

  fetchRecipes: () => void;

  setSearchText: (text: string) => void;
}

interface RecipePost {
  id: string;
  title: string;
  level: "fácil" | "intermedio" | "difícil";
  tag: ("dulce" | "salado" | "bebidas" | "snack")[];
  image?: string;
  ingredients: string[];
  instructions: string;
  createdAt: Date;
}

export type { RecipePost, RecipePostStore };
