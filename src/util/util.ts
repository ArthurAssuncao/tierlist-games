const formatHours = (hours: number) => {
  if (hours < 1) {
    return `${Math.round(hours * 60)}min`;
  }

  const fullHours = Math.floor(hours);
  const minutes = Math.round((hours - fullHours) * 60);

  if (minutes === 0) {
    return `${fullHours}h`;
  }

  return `${fullHours}h ${minutes}min`;
};

const formatDate = (date: Date | undefined) => {
  if (!date) return "Não informada";
  const dateObj = new Date(date);
  console.log(
    date.toLocaleDateString("pt-BR", { timeZone: "UTC" }),
    dateObj.getUTCDay(),
    dateObj.getUTCMonth(),
  );
  // se a data for dia 1 e mes janeiro retorna apenas o ano, do contrário retorna a data completa
  if (dateObj.getUTCDate() === 1 && dateObj.getUTCMonth() === 0) {
    return dateObj.getUTCFullYear().toString();
  }
  return dateObj.toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

export { formatDate, formatHours };
