// Logbook Generator
export function pastLogBookGenerator(days) {
  const dates = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    const centralTimeDate = new Date(date.getTime() - 6 * 60 * 60 * 1000);
    centralTimeDate.setDate(centralTimeDate.getDate() - i);
    dates.push({
      date: centralTimeDate.toISOString().slice(0, 10),
      day: centralTimeDate
        .toLocaleDateString("en-us", {
          timeZone: "America/Regina",
          weekday: "long",
        })
        .toUpperCase(),
    });
  }
  return dates;
}
