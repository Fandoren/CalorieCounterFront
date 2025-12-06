import dayjs from "dayjs";

export interface HistoryCalendarDayProps {
  isCurrentMonth: boolean;
  isToday: boolean;
  day: dayjs.Dayjs;
  calories?: number;
  norm?: number;
  onClick?: () => void;
}

export interface HistoryCalendarData {
  day: number;
  totalCalories: number;
}