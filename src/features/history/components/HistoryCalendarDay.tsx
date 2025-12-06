import dayjs from "dayjs";
import "dayjs/locale/ru";
import { HistoryCalendarDayProps } from "../types";
import { cn } from "@/lib/utils";

dayjs.locale("ru");

const BLUE = "#4287f5";
const GREEN = "#4caf50";
const RED = "#f44336";
const GRAY = "#aaaaaa";

function getGradient(calories: number, norm: number): string {
  if (calories === 0) return GRAY;

  const ratio = calories / norm;

  // < 85% — чистый синий
  if (ratio <= 0.85) return BLUE;

  // 85–95% — градиент синий → зелёный
  if (ratio <= 0.95) {
    const percent = Math.round(((ratio - 0.85) / 0.10) * 100);
    return `linear-gradient(90deg, ${BLUE} ${100 - percent}%, ${GREEN} 100%)`;
  }

  // 95–105% — зелёный
  if (ratio <= 1.05) return GREEN;

  // 105–115% — градиент зелёный → красный
  if (ratio <= 1.15) {
    const percent = Math.round(((ratio - 1.05) / 0.10) * 100);
    return `linear-gradient(90deg, ${GREEN} ${100 - percent}%, ${RED} 100%)`;
  }

  // > 115% — красный
  return RED;
}

export default function HistoryCalendarDay({
  day,
  isCurrentMonth,
  isToday,
  calories = 0,
  norm = 2000,
}: HistoryCalendarDayProps) {;
  const bg = getGradient(calories, norm);

  return (
    <div
      className={cn(
        "w-24 h-24 m-1 flex flex-col items-center justify-center rounded-full text-sm cursor-pointer select-none transition-all text-white font-semibold",
        isToday && "ring-4 ring-primary",
        !isCurrentMonth && "opacity-40"
      )}
      style={{
        background: bg,
        opacity: calories === 0 ? 0.5 : 1,
      }}
    >
      {day.date()}
    </div>
  );
}
