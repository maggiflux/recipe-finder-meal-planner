import React from "react";
import {
  Button,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { recipesList } from "../../../assets/data/recipes.mock";

const recipesListScreen = () => {
  return (
    <View>
      <View>
        <Text>Tus recetas</Text>
        <Text>Descubre y cocina lo que más te gusta.</Text>
      </View>
      <View>
        <Text>Encontremos que comer</Text>
      </View>
      <View>
        <TextInput
          placeholder="Busca por receta…"
          className="bg-neutral-500 rounded-2xl px-4 py-3 text-base text-primary"
        />
        <TextInput
          placeholder="Busca por tipo…"
          className="bg-neutral-500 rounded-2xl px-4 py-3 text-base text-primary"
        />
        <TextInput
          placeholder="Busca por ingrediente…"
          className="bg-neutral-500 rounded-2xl px-4 py-3 text-base text-primary"
        />
        <FlatList
          data={recipesList}
          renderItem={({ item }) => (
            <Pressable className="flex-row gap-3 cursor-pointer bg-slate-400">
              <Text>{item.title}</Text>
              <Text>{item.level}</Text>
              <Text>{item.tag}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View>
        <Text>Tienes una receta nueva? hay que mejorar alguna?</Text>
        <Button title="+ Ir a crear" onPress={() => {}} />
      </View>
    </View>
  );
};

export default recipesListScreen;
