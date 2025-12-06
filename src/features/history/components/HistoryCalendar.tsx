import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import HistoryCalendarDay from "./HistoryCalendarDay";
import { fetchMonthData } from "../api";
import { HistoryCalendarData } from "../types";
import Loader from "@/components/common/loader/Loader";
import HistoryDayMealsCard from "./HistoryDayMealsCard";

dayjs.locale("ru");

export default function HistoryCalendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [isNextMonthDisabled, setIsNextMonthDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState<HistoryCalendarData[]>([]);
  const [historyDayDialogOpen, setHistoryDayDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs | null>(null);

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startOfCalendar = startOfMonth.startOf("week");
  const endOfCalendar = endOfMonth.endOf("week");

  const days = [];
  let day = startOfCalendar;

  while (day.isBefore(endOfCalendar, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
    setIsNextMonthDisabled(false);
  };

  const handleNextMonth = () => {
    if (currentMonth.add(1, "month").isSame(dayjs(), "month")) {
      setIsNextMonthDisabled(true);
    }
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const updateHistoryData = async () => {
    setLoading(true);
    try {
      const data = await fetchMonthData(
        currentMonth.year(),
        currentMonth.month() + 1
      );
      setHistoryData(data);
    } catch (err) {
      console.error("Ошибка при загрузке данных:", err);
    } finally {
      setLoading(false);
    }
  };

  const openHistoryDayCard = (day: dayjs.Dayjs) => {
    setSelectedDay(day);
    setHistoryDayDialogOpen(true);
  };

  // 👇 Загружаем данные при монтировании и смене месяца
  useEffect(() => {
    updateHistoryData();
  }, [currentMonth]);

  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  return (
    <>
      <Card className="p-4 w-5/6 mx-auto mt-5 flex flex-col flex-1">
        {/* Заголовок */}
        <div className="flex items-center justify-center mb-4">
          <Button variant="ghost" onClick={handlePrevMonth}>
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <h2 className="text-lg font-semibold mx-2">
            {currentMonth.format("MMMM YYYY").charAt(0).toUpperCase() +
              currentMonth.format("MMMM YYYY").slice(1)}
          </h2>

          <Button
            variant="ghost"
            onClick={handleNextMonth}
            disabled={isNextMonthDisabled}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Индикатор загрузки */}
        {loading ? (
          <div className="flex justify-center items-center flex-1 text-muted-foreground">
            <Loader />
          </div>
        ) : (
          <>
            {/* Дни недели */}
            <div className="grid grid-cols-7 text-center font-medium text-md mb-2">
              {weekDays.map((wd) => (
                <div key={wd} className="text-primary font-semibold">
                  {wd}
                </div>
              ))}
            </div>

            {/* Дни месяца */}
            <div className="grid grid-cols-7 place-items-center flex-1">
              {days.map((d) => {
                const isCurrentMonth = d.month() === currentMonth.month();
                const isToday = d.isSame(dayjs(), "day");

                // 👇 ищем данные по этому дню
                const dayData = historyData.find((entry) => {
                  return entry.day == d.date();
                });

                return (
                  <HistoryCalendarDay
                    key={d.format("YYYY-MM-DD")}
                    day={d}
                    onClick={() => openHistoryDayCard(d)}
                    isCurrentMonth={isCurrentMonth}
                    isToday={isToday}
                    calories={dayData?.totalCalories ?? 0}
                  />
                );
              })}
            </div>
          </>
        )}
      </Card>
      {selectedDay && <HistoryDayMealsCard day={selectedDay} open={historyDayDialogOpen} onOpenChange={setHistoryDayDialogOpen}/>}
    </>
  );
}
