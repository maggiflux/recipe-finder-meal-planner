import { createRecipe } from "@/services/recipes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export const useCreateRecipes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRecipe,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      router.back();
    },
  });
};
