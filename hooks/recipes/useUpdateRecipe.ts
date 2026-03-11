import { recipeKeys } from "@/constants/recipes/queryKeys";
import { updateRecipe, UpdateRecipeInput } from "@/services/recipes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { queryClient } from "../../utils/queryClient";

export const useUpdateRecipe = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRecipeInput }) =>
      updateRecipe(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.all });

      queryClient.invalidateQueries({
        queryKey: recipeKeys.detail(variables.id),
      });
      router.back();
    },
  });
};
