// Rounds time to nearest 15 minutes and converts to HH:MM string format
export const getTimeString = (hours: number) => {
  const dateTime = new Date(Math.round(new Date().setHours(hours) / 9e5) * 9e5);
  const time = dateTime.toTimeString().split(':', 2);
  return time.join(':');
};
