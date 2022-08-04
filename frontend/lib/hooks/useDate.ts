const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const useDate = (stringDate: any) => {
  const date = new Date(stringDate);
  const dateNum = date?.getUTCDate();
  const month = monthNames[date?.getMonth()];
  const year = date?.getFullYear();

  return `${dateNum} ${month} ${year}`;
};
