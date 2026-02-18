import { useCurrentTime } from "@/hooks/useCurrentTime";

export const getCurrentHour = () => {
  const { currentTime } = useCurrentTime();

  const hour = currentTime.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
  });

  return {
    hour,
  };
};
