import {
  palette,
  textVariants,
  typography,
  variants,
} from "@/theme/themeTokens";
import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

type Variant = "primary" | "secondary" | "neutral" | "outline";

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

const AppButton = ({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  className,
}: Props) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        {
          justifyContent: "center",
          alignItems: "center",
          opacity: isDisabled ? 0.5 : pressed ? 0.97 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
      className={`
        ${variants[variant]} 
        ${
          variant === "outline"
            ? "border-2 border-primary"
            : "border-2 border-transparent"
        }
          px-4 py-3 rounded-md items-center justify-center ${className || ""}`}
    >
      {loading ? (
        <ActivityIndicator color={palette.neutral} />
      ) : (
        <Text
          className={`${typography.buttonPrimary} ${textVariants[variant]}`}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

export default AppButton;
