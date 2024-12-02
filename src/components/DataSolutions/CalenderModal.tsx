'use client'
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";
import { LuDownload, LuCalendar } from "react-icons/lu";
import { getBankHolidays } from "@/actions/holidaysService";
import MonthDropdown from "./MonthDropdown";
import { useSearchParams } from "next/navigation";
import { BronzeSingleDay } from "@/actions/download-files/bronze-single-day";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import { format } from "date-fns";

interface CalenderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalenderModal: React.FC<CalenderModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [holidays, setHolidays] = useState([]);

  const minDate = new Date(2007, 2, 26);
  const currentDate = new Date();
  let maxDate = new Date(); // Default is today

  // Check if the current time is past 4:05 PM
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  // 4:05 PM is 16:05 in 24-hour format
  const isPastFourPM = currentHour > 16 || (currentHour === 16 && currentMinutes >= 5);

  if (isPastFourPM) {
    // If it's past 4:05 PM, allow selecting the next day
    maxDate.setDate(maxDate.getDate() + 1);
  }



  const months = Array.from({ length: 12 }, (_, index) =>
    new Date(0, index).toLocaleString("default", { month: "long" })
  );

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const years = Array.from(
    { length: currentYear - 2007 + 1 },
    (_, index) => 2007 + index
  );

  const handleMonthSelect = (month: string) => {
    const newDate = new Date(selectedDate || new Date());
    const monthIndex = months.indexOf(month);
    newDate.setMonth(monthIndex);

    if (newDate < minDate) {
      setSelectedDate(minDate);
    } else {
      setSelectedDate(newDate);
    }
  };

  const handleYearSelect = (year: string) => {
    const newDate = new Date(selectedDate || new Date());
    newDate.setFullYear(parseInt(year, 10));

    // Check if selected year and month are before March 2007
    if (newDate < minDate) {
      setSelectedDate(minDate);
    } else {
      setSelectedDate(newDate);
    }
  };

  // Function to handle decrease month
  const decreaseMonth = () => {
    const newDate = new Date(selectedDate || new Date());
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  // Function to handle increase month
  const increaseMonth = () => {
    const newDate = new Date(selectedDate || new Date());
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      const fetchedHolidays = await getBankHolidays();
      setHolidays(fetchedHolidays);
    };

    fetchHolidays();
  }, []);

  const searchParams = useSearchParams();
  const downloadType = searchParams.get("downloadType");

  const handleDownload = async (date: Date | null) => {
    if (!date) return;

    const formattedDate = date.toISOString().split("T")[0];
    console.log("🚀 ~ handleDownload ~ formattedDate:", formattedDate);

    if (downloadType === "bronze-1") {
      const response = await BronzeSingleDay({ date: formattedDate });

      if (response.data) {
        toast.success("Data downloaded successfully");

        const formattedDateMMDDYYYY = format(
          new Date(formattedDate),
          "MM-dd-yyyy"
        );

        const blob = new Blob([response.data], {
          type: "text/csv;charset=utf-8",
        });
        saveAs(blob, `VIXSpike_Single day_${formattedDateMMDDYYYY}.csv`);
      } else {
        console.log(response.error);
        toast.error("Error happened while downloading data");
      }
    }
  };

  const handleCloseModel = () => {
    setSelectedDate(new Date())
    onClose();
  }

  const isDateInRange = selectedDate && selectedDate >= minDate && selectedDate <= maxDate;

  return (
    <>
      {isOpen && (
        <div
          className="modal-overlay pb-6 flex-col flex items-center justify-center fixed top-0 left-0
            pt-6 w-screen h-screen z-50 lg:px-0 md:px-6 px-10 overflow-auto text-center"
        >
          <div
            className="relative max-w-sm w-full modal items-center flex flex-col dark:bg-bg bg-white 
            rounded-xl z-50 shadow-2xl shadow-[#00000026] dark:shadow-[#00000066]"
          >
            <div className="w-full flex justify-end">
              <div
                onClick={handleCloseModel}
                className="md:w-6 w-5 md:h-6 h-5 rounded-full dark:bg-secondary bg-bg cursor-pointer flex items-center
                justify-center md:-mt-2.5 -mt-1.5 md:-mr-2.5 -mr-1.5 hover:rotate-180 transform transition-all duration-400"
              >
                <RxCross2 className="dark:text-bg text-secondary" size={16} />
              </div>
            </div>
            <div className="w-full pt-8 pb-6">
              <h2 className="text-xl font-semibold dark:text-secondary text-bg">
                Select Date to Download Data
              </h2>
              <div
                className="mb-4 mt-8 flex items-center justify-between border dark:border-secondary border-bg rounded-xl
                  py-2 px-3 w-4/5 mx-auto text-base dark:text-secondary text-[#707070]"
              >
                <p className="font-semibold">
                  <span className="text-base font-normal text-[#707070]">
                    Selected Date: {` `}
                  </span>
                  {selectedDate
                    ? selectedDate
                      .toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                      .replace(/^\w+,\s*/, "")
                    : ""}
                </p>
                <LuCalendar size={18} className="dark:text-primary text-darkGreen" />
              </div>
              <div className="">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => setSelectedDate(date)}
                  inline
                  minDate={minDate}
                  maxDate={maxDate}
                  calendarStartDay={1}
                  filterDate={(date) => {
                    const nextDay = new Date();
                    nextDay.setDate(nextDay.getDate() + 1);
                    return date >= minDate && date <= nextDay;
                  }}
                  dayClassName={(date) => {
                    if (date < minDate || date > maxDate) {
                      return "custom-colors";
                    }
                    return "";
                  }}
                  renderCustomHeader={() => (
                    <div className="flex justify-between items-center mb-3">
                      <div
                        className="dark:bg-bg bg-[#F5F5F5] w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={decreaseMonth}
                      >
                        <IoChevronBackSharp className="dark:text-secondary text-bg" />
                      </div>
                      {/* Month Dropdown */}
                      <MonthDropdown
                        items={months.filter((month, index) => {
                          if (selectedDate?.getFullYear() === 2007 && index < 2) return false;
                          if (selectedDate?.getFullYear() === currentYear && index > currentMonth) return false;
                          return true;
                        })}
                        initialName={months[(selectedDate || new Date()).getMonth()]}
                        onSelect={handleMonthSelect}
                        className="!w-[6.5rem]"
                        classNameInner=""
                      />
                      {/* Year Dropdown */}
                      <MonthDropdown
                        items={years.map((year) => year.toString())}
                        initialName={(selectedDate || new Date()).getFullYear().toString()}
                        onSelect={handleYearSelect}
                        className="!w-[4.5rem]"
                        classNameInner=""
                      />
                      <div
                        onClick={increaseMonth}
                        className="dark:bg-bg bg-[#F5F5F5] w-6 h-6 rounded-full flex items-center justify-center text-center cursor-pointer"
                      >
                        <IoChevronForwardSharp className="dark:text-secondary text-bg" />
                      </div>
                    </div>
                  )}
                />


              </div>
              <button
                onClick={() => handleDownload(selectedDate)}
                className={`w-4/5 mx-auto border dark:border-primary border-darkGreen text-base font-semibold rounded-xl py-2 flex flex-row
                          items-center gap-x-2 justify-center dark:text-primary text-darkGreen mt-4 dark:hover:bg-[#3f464a60] hover:bg-[#fff] ${isDateInRange ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                disabled={!isDateInRange}
              >
                Download
                <LuDownload
                  size={24}
                  className="dark:text-primary text-darkGreen"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalenderModal;