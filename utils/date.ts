export const getCurrentDate = () => {
  const date = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const capitalizeDate = date.charAt(0).toUpperCase() + date.slice(1);
  return {
    capitalizeDate,
  };
};

export const formatDate = (date: Date): string => {
  const formatted = date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};
