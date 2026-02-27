import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

import React, { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import {
  Alert,
  Button,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  label: string;
  theme?: "primary";
  onPress?: () => void;
};

type FormData = {
  id: string;
  title: string;
  level: "fácil" | "intermedio" | "difícil";
  tag: ("dulce" | "salado" | "bebidas" | "snack")[];
  origin: "abuelos" | "padres" | "mios";
  imageUri?: string;
  ingredients: { value: string }[];
  instructions: string;
  createdAt: string;
  isRecording: boolean;
};

const createRecipeFormScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(true);
  const [addIngredientInput, setAddIngredientInput] = useState();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      id: "",
      title: "",
      ingredients: [{ value: "" }],
      level: "fácil",
      tag: [],
      origin: "mios",
      imageUri: "",
      instructions: "",
      createdAt: new Date().toISOString(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  //LEVELS
  const levels: Array<FormData["level"]> = ["fácil", "intermedio", "difícil"];
  const selectedLevel = watch("level");

  //TAGS
  const tags: FormData["tag"][number][] = [
    "dulce",
    "salado",
    "bebidas",
    "snack",
  ];
  const selectedTag = watch("tag");
  const toggleTag = (value: FormData["tag"][number]) => {
    const current = getValues("tag");

    if (current.includes(value)) {
      setValue(
        "tag",
        current.filter((t: any) => t !== value),
      );
    } else {
      setValue("tag", [...current, value]);
    }
  };

  //ORIGEN
  const origins: FormData["origin"][] = ["abuelos", "padres", "mios"];
  const selectedOrigin = watch("origin");

  //arquitectura, tener un estado de imagen. async es una promesa
  //pedir permiso y acceder a la camara con un modal y accede a la ui del sistema: si no da permiso cierra, si da permiso
  const pickImageAsync = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      //si el permiso no es dado
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Permission to access the media library is required.",
        );
        return;
      }
      // si da permiso abre la galeria toma la imagen la reencuadra y la setImage pasa el string a image y lo mantiene ahi visible,
      //es un string

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "livePhotos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      //si lo cancela entonces vuelve al estado anterior que deberia ser nullo o sin string
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImage(uri);
        setValue("imageUri", uri);
      }

      console.log(result);
      console.log(image);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      reset();
      setImage(null);
    } catch (error) {
      setError("root", {
        message: "esta receta ya existe",
      });
    }
  };

  return (
    <ScrollView>
      <View>
        <Text className="font-sans text-title color-primary font-bold mb-6">
          Añade tu receta
        </Text>
        {/*       TITULO        */}
        <Controller
          control={control}
          name="title"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="bg-cyan-300 rounded-md "
            />
          )}
        />
        {errors.title && <Text>La receta debe tener título</Text>}
        {/*       LEVEL        */}
        <Text className="text-primary font-bold">NIVEL</Text>
        <View className="flex-row gap-4 justify-center mt-4 mb-6">
          {levels.map((level: any) => {
            const isSelected = selectedLevel === level;
            return (
              <Pressable
                key={level}
                onPress={() => setValue("level", level)}
                className={`py-2 px-6 rounded-sm ${
                  isSelected ? "bg-primary" : "bg-slate-400"
                }`}
              >
                <Text className={isSelected ? "text-white" : "text-primary"}>
                  {level}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {/*       ORIGEN         */}
        <Text className="text-primary font-bold">ORIGEN</Text>
        <View className="flex-row gap-4 justify-center mb-6">
          {origins.map((origin) => {
            const isSelected = selectedOrigin === origin;
            return (
              <Pressable
                key={origin}
                onPress={() => setValue("origin", origin)}
                className={`py-2 px-6 rounded-sm ${
                  isSelected ? "bg-primary" : "bg-slate-400"
                }`}
              >
                <Text className={isSelected ? "text-white" : "text-primary"}>
                  {origin}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {/*       LABEL         */}
        <Text className="text-primary font-bold">ETIQUETA</Text>
        <View className="flex-row gap-4 justify-center mb-6">
          {tags.map((tag) => {
            const isSelected = selectedTag.includes(tag);

            return (
              <Pressable
                key={tag}
                onPress={() => toggleTag(tag)}
                className={`py-2 px-6 rounded-sm ${
                  isSelected ? "bg-primary" : "bg-slate-400"
                }`}
              >
                <Text className={isSelected ? "text-white" : "text-primary"}>
                  {tag}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {/*       INGREDIENTS         */}
        <Text className="text-primary font-bold">INGREDIENTES</Text>

        {fields.map((item, index) => (
          <View key={item.id} className="flex-row items-center gap-2 mb-2">
            <Controller
              key={item.id}
              control={control}
              name={`ingredients.${index}.value`}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="ingredientes"
                  value={value}
                  onChangeText={onChange}
                  className="w-1/2 bg-slate-400 rounded-md"
                />
              )}
            />
            <Pressable>
              <FontAwesome
                size={28}
                name="microphone"
                color={"color-primary"}
                className={` rounded-lg w-11 h-15 text-center ${
                  isRecording ? "bg-red-500" : "bg-slate-400"
                }`}
              />
              {isRecording && <Text>Grabando...</Text>}
            </Pressable>

            <Pressable
              onPress={() => remove(index)}
              className="w-10 rounded-md px-2 py-2 bg-red-400 m-2"
            >
              <FontAwesome
                size={28}
                name="trash"
                color={"color-primary"}
                className="rounded-lg w-11 h-15 text-cente"
              />
            </Pressable>
          </View>
        ))}
        <Pressable
          onPress={() => append({ value: "" })}
          className="w-10 rounded-md px-2 py-2 bg-red-400 m-2"
        >
          <Text className="text-center">+</Text>
        </Pressable>

        <Controller
          control={control}
          name="instructions"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="instructions"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="bg-cyan-300 rounded-md "
            />
          )}
        />
        <Pressable>
          <FontAwesome
            size={28}
            name="microphone"
            color={"color-primary"}
            className={` rounded-lg w-11 h-15 text-center ${
              isRecording ? "bg-red-500" : "bg-slate-400"
            }`}
          />
          {isRecording && <Text>Grabando...</Text>}
        </Pressable>
        {image ? (
          <Image source={{ uri: image }} className="h-20" />
        ) : (
          <TouchableOpacity onPress={pickImageAsync}>
            <View className="bg-orange-200">
              <FontAwesome size={28} name="home" color={"color-primary"} />
              <Text>Selecciona una imagen</Text>
            </View>
          </TouchableOpacity>
        )}

        <Button
          title={isSubmitting ? "Enviando..." : "Enviar"}
          onPress={handleSubmit(onSubmit)}
        />
        {errors.root && <Text>{errors.root.message}</Text>}
      </View>
    </ScrollView>
  );
};

export default createRecipeFormScreen;
