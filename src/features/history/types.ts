import dayjs from "dayjs";
import { Meal } from "../counter/types";

export interface HistoryCalendarDayProps {
  isCurrentMonth: boolean;
  isToday: boolean;
  day: dayjs.Dayjs;
  calories?: number;
  norm?: number;
}

export interface HistoryCalendarData {
  day: number;
  totalCalories: number;
}