import { fetchRecipes } from "@/services/recipes";
import { useQuery } from "@tanstack/react-query";

export const useFetchRecipes = () => {
  const recipesQuery = useQuery({
    queryKey: ["recipes"],
    queryFn: () => fetchRecipes(),
  });

  return {
    recipesQuery,
  };
};
