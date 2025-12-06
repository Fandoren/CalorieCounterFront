import dayjs from "dayjs";
import "dayjs/locale/ru";
import { HistoryCalendarDayProps } from "../types";
import { cn } from "@/lib/utils";

dayjs.locale("ru");

export default function HistoryCalendarDay({
  day,
  isCurrentMonth,
  isToday,
  calories = 0,
  norm = 2000,
}: HistoryCalendarDayProps) {
  const ratio = Math.min(calories / norm, 2);
  let bg;
  if (calories === 0) bg = "bg-muted-foreground/40";
  else if (ratio > 1.1) bg = "bg-red-500";
  else if (ratio > 0.9) bg = "bg-green-500";
  else bg = "bg-blue-500";
  const opacity = Math.min(1, Math.abs(ratio - 1) < 0.2 ? 0.9 : 0.7);

  return (
    <div
      className={cn(
        "w-24 h-24 m-1 flex flex-col items-center justify-center rounded-full text-sm cursor-pointer select-none transition-all",
        isToday && "ring-4 ring-primary",
        isCurrentMonth
          ? bg
            ? bg + " text-white font-semibold"
            : "bg-muted-foreground/40"
          : "opacity-40"
      )}
      style={{
        opacity,
      }}
    >
      {day.date()}
    </div>
  );
}
