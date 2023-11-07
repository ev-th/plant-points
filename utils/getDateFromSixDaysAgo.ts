export const getDateFromSixDaysAgo = (currentDate: Date) => {
  const oneWeekAgo = currentDate;
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
  oneWeekAgo.setHours(0, 0, 0, 0);
  return oneWeekAgo;
};
