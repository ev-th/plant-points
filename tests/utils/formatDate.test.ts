import { formatDate } from "@/utils/formatDate";

describe(formatDate, () => {
  test('it returns "1 Jan" when passed date object of that date', () => {
    const date = new Date("2023-01-01");
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("1 Jan");
  });

  test('it returns "31 Dec" when passed date object of that date', () => {
    const date = new Date("2023-12-31");
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("31 Dec");
  });
});
