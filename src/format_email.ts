import type dayjs from "dayjs";

const formatEmail = (pattern: string, date: dayjs.Dayjs): string => {
  const datePattern = /\[(.*?)\]/g;
  return pattern.replace(datePattern, (_, format) => date.format(format));
}

export default formatEmail
