export const formatDateWithTime = (date: Date): string => {
  const newDate = new Date(date);

  const month = newDate.toLocaleString("en-US", { month: "short" });
  const day = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  const formattedDate = `${day} ${month}`;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return `${formattedDate} ${formattedTime}`;
};

export const formatDate = (date: Date): string => {
  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const month = newDate.toLocaleString("en-US", { month: "short" });
  const day = newDate.getDate();

  const formattedDate = `${day} ${month} ${year}`;

  return `${formattedDate}`;
};
