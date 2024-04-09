export const formatDate = (date: Date): string => {
  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const month = newDate.toLocaleString('en-US', { month: 'short' });
  const day = newDate.getDate();

  const formattedDate = `${day} ${month} ${year}`;

  return `${formattedDate}`;
};
