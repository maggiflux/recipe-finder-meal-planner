interface RecipePostStore {
  recipes: RecipePost[];
  searchText: string;

  fetchRecipes: () => void;

  setSearchText: (text: string) => void;
}

interface RecipePost {
  id: string;
  title: string;
  image?: string;
  ingredients: string[];
  instructions: string;
  level: "fácil" | "intermedio" | "difícil";
  tag: ("dulce" | "salado" | "bebidas" | "snack")[];
  origin: "abuelos" | "padres" | "mios";
  createdAt: Date;
}

export type { RecipePost, RecipePostStore };
