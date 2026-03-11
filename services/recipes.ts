import { RecipePost } from "@/types/RecipePost";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/init";

export const fetchRecipes = async () => {
  try {
    const q = query(collection(db, "recipes"), orderBy("createdAt", "asc"));
    const snapshot = await getDocs(q);
    const fetchedRecipes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate
        ? doc.data().createdAt.toDate()
        : new Date(),
    })) as RecipePost[];
    return fetchedRecipes;
  } catch (error) {
    console.log("error: ", error);
    return [];
  }
};

export const fetchRecipe = async (id: string): Promise<RecipePost | null> => {
  const docRef = doc(db, "recipes", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    ...data,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : new Date(data.createdAt),
  } as RecipePost;
};

type CreateRecipeInput = Omit<RecipePost, "id">;
export const createRecipe = async (data: CreateRecipeInput) => {
  try {
    const docRef = await addDoc(collection(db, "recipes"), {
      ...data,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

export type UpdateRecipeInput = Omit<RecipePost, "id">;
export const updateRecipe = async (id: string, data: UpdateRecipeInput) => {
  const docRef = doc(db, "recipes", id);
  await updateDoc(docRef, data);
};

export const deleteRecipe = async (id: string) => {
  const recipeRef = doc(db, "recipes", id);
  await deleteDoc(recipeRef);
};
