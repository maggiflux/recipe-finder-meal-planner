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
