import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "@radix-ui/react-icons";

const CustomDatePicker = ({ selectedDate, onChange }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(
    selectedDate ? new Date(selectedDate) : null
  );
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Generate days for the current month
  const generateCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const calendarDays = [];

    // Fill initial empty days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    return calendarDays;
  };

  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(currentYear, currentMonth, day);
      setDate(newDate);
      onChange(newDate);
      setOpen(false); // Close calendar after date selection
    }
  };

  const handleMonthChange = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 border p-2 rounded">
          <CalendarIcon />
          {date ? date.toLocaleDateString() : "Select Date"}
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <div className="calendar">
          <div className="calendar-header">
            <button onClick={() => handleMonthChange("prev")}>&lt;</button>
            <span>
              {months[currentMonth]} {currentYear}
            </span>
            <button onClick={() => handleMonthChange("next")}>&gt;</button>
          </div>
          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <div key={index} className="calendar-day-header">
                  {day}
                </div>
              )
            )}
            {generateCalendar().map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${day ? "clickable" : ""}`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomDatePicker;
