import { fetchRecipe } from "@/services/recipes";
import { useQuery } from "@tanstack/react-query";

export const useFetchRecipe = (id: string) => {
  const recipeQuery = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipe(id),
    enabled: !!id,
  });

  return {
    recipeQuery,
  };
};
