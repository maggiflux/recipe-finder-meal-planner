import { RecipePost } from "@/types/RecipePost";
import { useState } from "react";

type Tag = "dulce" | "salado" | "bebidas" | "snack";

export const useFilteredRecipes = (recipes: RecipePost[]) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag | null>(null);
  const [titleSearch, setTitleSearch] = useState("");
  const [ingredientSearch, setIngredientSearch] = useState("");

  const filteredRecepies = (recipes ?? [])
    .filter((r) => {
      return r.title.toLowerCase().includes(titleSearch.toLowerCase());
    })
    .filter((r) => {
      return r.ingredients?.some(
        (ingredient) =>
          typeof ingredient.value === "string" &&
          ingredient.value
            .toLowerCase()
            .includes(ingredientSearch.toLowerCase()),
      );
    })
    .filter((r) => {
      return !selectedTags || r.tag.includes(selectedTags);
    });

  const onPressTagList = () => {
    if (isOpen === false) setIsOpen(true);
    if (isOpen === true) setIsOpen(false);
  };

  const onPressTagChip = (tag: Tag) => {
    setSelectedTags((prev) => (prev === tag ? null : tag));
    setIsOpen(false);
  };
  const onDeleteTagChip = () => {
    setSelectedTags(null);
  };

  return {
    isOpen,
    setIsOpen,
    selectedTags,
    setSelectedTags,
    titleSearch,
    setTitleSearch,
    ingredientSearch,
    setIngredientSearch,
    filteredRecepies,
    onPressTagList,
    onPressTagChip,
    onDeleteTagChip,
  };
};
