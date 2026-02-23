import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
// import * as ImagePicker from 'expo-image-picker';

const createRecipeFormScreen = () => {
  const [image, setImage] = useState<String | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  const pickImage = async () => {};

  return (
    <View>
      <Text className="font-sans text-title color-primary font-bold mb-6">
        Añade tu receta
      </Text>
      <Controller
        control={control}
        name="recipeTitle"
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Titulo de la receta"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            className="bg-cyan-300 rounded-md "
          />
        )}
      />
      <View className="flex-row gap-4 justify-center mt-4 mb-6">
        <Pressable className="bg-slate-400 py-2 px-6 rounded-sm">
          <Text>Fácil</Text>
        </Pressable>
        <Pressable className="bg-slate-400 py-2 px-6 rounded-sm">
          <Text>Medio</Text>
        </Pressable>
        <Pressable className="bg-slate-400 py-2 px-6 rounded-sm">
          <Text>Dificil</Text>
        </Pressable>
      </View>
      <View className="flex-row gap-4 justify-center mb-6">
        <Pressable className="bg-slate-400 py-2 px-6 rounded-sm">
          <Text>origen uno</Text>
        </Pressable>
        <Pressable className="bg-slate-400 py-2 px-6 rounded-sm">
          <Text>origen dos</Text>
        </Pressable>
        <Pressable className="bg-slate-400 py-2 px-6 rounded-sm">
          <Text>origen tres</Text>
        </Pressable>
      </View>
      <Controller
        control={control}
        name="recipeTitle"
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="ingredientes"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            className="bg-pink-300 rounded-md "
          />
        )}
      />
      <Controller
        control={control}
        name="recipeTitle"
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Preparacion"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            className="bg-cyan-300 rounded-md "
          />
        )}
      />
      <Button title="Cargar la imagen" onPress={() => handleSubmit(onSubmit)} />
      <Text>Creado fecha</Text>
      <Button title="Enviar" onPress={() => handleSubmit(onSubmit)} />
    </View>
  );
};

export default createRecipeFormScreen;
