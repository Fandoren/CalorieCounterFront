import { HistoryCalendarData } from "./types";

export async function fetchMonthData(year: number, month: number): Promise<HistoryCalendarData[]> {
  const res = await fetch(`/api/history/month?year=${year}&month=${month}`);
  if (!res.ok) throw new Error("Ошибка при загрузке истории по месяцу");
  try {
    return await res.json();
  } catch {
    return [];
  }
}