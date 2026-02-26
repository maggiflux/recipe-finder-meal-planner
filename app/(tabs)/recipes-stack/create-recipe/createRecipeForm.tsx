import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
  ingredients: string[];
  instructions: string;
};

const createRecipeFormScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      id: "",
      title: "",
      ingredients: [],
      level: "fácil",
      tag: ["dulce"],
      origin: "mios",
      imageUri: "",
      instructions: "",
    },
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
  // if (tags) return <Text>{`${tags}`}</Text>;

  //BOTON ENVIAR FORM
  const onSubmit = (data: FormData) => console.log(data);
  return (
    <View>
      <Text className="font-sans text-title color-primary font-bold mb-6">
        Añade tu receta
      </Text>
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

      <Controller
        control={control}
        name="ingredients"
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur } }) => (
          <TextInput
            placeholder="ingredients"
            onBlur={onBlur}
            onChangeText={onChange}
            //value={value}
            className="bg-pink-300 rounded-md "
          />
        )}
      />
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
      <Text>Creado fecha</Text>
      <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default createRecipeFormScreen;
