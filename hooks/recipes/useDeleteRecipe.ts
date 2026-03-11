import { deleteRecipe } from "@/services/recipes";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { queryClient } from "../../utils/queryClient";

export const useDeleteRecipe = () => {
  return useMutation({
    mutationFn: (id: string) => deleteRecipe(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      router.back();
    },
  });
};
