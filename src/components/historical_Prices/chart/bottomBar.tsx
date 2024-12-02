"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";
import { format } from "date-fns";
import { BackArrow, Calendar1, ForwarArrow } from "@/svgs";
import MonthDropdown from "@/components/DataSolutions/MonthDropdown";
import Link from "next/link";

interface BottomBarProps {
  selectedDate: Date;
  handleSelectedDate: (date: Date) => void;
  handleGetPrices: () => void;
  setSelectedDates: React.Dispatch<React.SetStateAction<Date[]>>;
}

const BottomBar: React.FC<BottomBarProps> = ({
  selectedDate,
  handleSelectedDate,
  handleGetPrices,
  // setSelectedDates, // You don't need this prop in BottomBar anymore
}) => {
  const [modal, setModal] = useState(false);

  const minDate = new Date(2007, 2, 26);
  const maxDate = new Date();

  const handlePreviousDay = () => {
    if (selectedDate) {
      const newDate = new Date(selectedDate.getTime() - 86400000);
      handleSelectedDate(newDate); // Just update the selected date in the parent component
    }
  };

  const handleNextDay = () => {
    if (selectedDate) {
      const newDate = new Date(selectedDate.getTime() + 86400000);
      handleSelectedDate(newDate); // Just update the selected date in the parent component
    }
  };

  // Function to disable weekends (Saturday and Sunday)
  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 is Sunday, 6 is Saturday
  };

  const months = Array.from({ length: 12 }, (_, index) =>
    new Date(0, index).toLocaleString("default", { month: "long" })
  );
  const years = Array.from(
    { length: 100 },
    (_, index) => new Date().getFullYear() - 50 + index
  );

  const handleMonthSelect = (month: string) => {
    const newDate = new Date(selectedDate || new Date());
    const monthIndex = months.indexOf(month);
    newDate.setMonth(monthIndex);
    handleSelectedDate(newDate); // Just update the selected date in the parent component
  };

  const handleYearSelect = (year: string) => {
    const newDate = new Date(selectedDate || new Date());
    newDate.setFullYear(parseInt(year, 10));
    handleSelectedDate(newDate); // Just update the selected date in the parent component
  };



  return (
    <div className="border-t w-full md:flex-row flex-col gap-5 darK:border-border border-[#3C4045] py-2 flex items-center justify-between mt-5">
      <div className="lg:w-1/2 w-full">
        <div className="w-full h-full flex flex-wrap gap-5 items-center py-4">
          <a
            href={"#calender-dropdown"}
            onClick={() => setModal(!modal)}
            className={`flex relative max-w-72 py-2 px-4 rounded-lg justify-between items-center gap-4 border bg-white dark:bg-transparent lg:w-3/4 w-full ${modal
              ? " border-primary  dark:border-darkGreen"
              : " border-lightBorder  dark:border-border"
              }`}
          >
            <div className="flex items-center">
              <span className="dark:text-secondary text-[#707070] text-sm mr-2">
                Selected Date:
              </span>
              <span className="dark:text-white text-black text-base xxl:text-md font-medium">
                {selectedDate
                  ? format(selectedDate, "MMMM d, yyyy")
                  : "No Date Selected"}
              </span>
            </div>
            <Calendar1 className={"w-5 h-5 dark:text-primary text-darkGreen"} />
            {modal && (
              <div className="absolute w-full left-0 top-12" id="calender-dropdown">
                <div className="relative z-50">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => {
                      if (date) {
                        handleSelectedDate(date); // Only call the parent function to update state
                      }
                    }}
                    inline
                    calendarStartDay={1}
                    calendarClassName="z-10"
                    // filterDate={isWeekday}
                    filterDate={(date) => {
                      const nextDay = new Date();
                      nextDay.setDate(nextDay.getDate() + 1);
                      return date >= minDate && date <= nextDay;
                    }}
                    minDate={minDate}
                    maxDate={maxDate}
                    dayClassName={(date) => {
                      if (date < minDate || date > maxDate) {
                        return "custom-colors";
                      }
                      return "";
                    }}
                    renderCustomHeader={({
                      date,
                      changeYear,
                      changeMonth,
                      decreaseMonth,
                      increaseMonth,
                    }) => {
                      const dateObj = new Date(date);

                      return (
                        <div className="flex justify-between items-center mb-3">
                          <div
                            className="dark:bg-bg bg-[#F5F5F5] w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                            onClick={decreaseMonth}
                          >
                            <IoChevronBackSharp className="dark:text-secondary text-bg" />
                          </div>
                          {/* Month Dropdown */}
                          <MonthDropdown
                            items={months}
                            initialName={months[(selectedDate || new Date()).getMonth()]}
                            onSelect={handleMonthSelect}
                            className="!w-[6.5rem]"
                            classNameInner=""
                            onClick={(e) => e.stopPropagation()}
                          />
                          {/* Year Dropdown */}
                          <MonthDropdown
                            items={years.map((year) => year.toString())}
                            initialName={(selectedDate || new Date()).getFullYear().toString()}
                            onSelect={handleYearSelect}
                            className="!w-[4.5rem]"
                            classNameInner=""
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div
                            className="dark:bg-bg bg-[#F5F5F5] w-6 h-6 rounded-full flex items-center justify-center text-center cursor-pointer"
                            onClick={increaseMonth}
                          >
                            <IoChevronForwardSharp className="dark:text-secondary text-bg" />
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            )}
          </a>

          <div
            onClick={handleGetPrices}
            className="ml-2 bg-gradient-to-b dark:from-[#00FEB5] from-[#00BF88] dark:to-[#78CEF4] to-[#8EC8F0] rounded-lg p-[1px] group"
          >
            <button
              className={`flex flex-row gap-x-4 px-4 dark:text-primary text-darkGreen text-base font-medium py-1.5 justify-center items-center rounded-lg dark:bg-bg bg-[#f5f5f5] w-full
              group-hover:text-bg group-hover:bg-gradient-to-b group-hover:dark:from-[#00FEB5] group-hover:dark:to-[#78CEF4] group-hover:from-[#00BF88] group-hover:to-[#8EC8F0]`}
            >
              Get Prices
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 w-full lg:w-2/5 justify-end">
        <button
          className="dark:bg-darkBg bg-[#D0D0D0] dark:hover:bg-black/50 hover:bg-[#fff] dark:text-secondary text-bg px-4 py-2 rounded-lg flex items-center space-x-2"
          onClick={handlePreviousDay}
        >
          <BackArrow className={"dark:fill-darkBg fill-black"} />
          <span>Previous Day</span>
        </button>
        <button
          className="dark:bg-[#3A4045] border border-border dark:hover:bg-darkBg hover:bg-secondary bg-white dark:text-secondary text-black px-4 py-2 rounded-lg flex items-center space-x-2"
          onClick={handleNextDay}
        >
          <span>Next Day</span>
          <ForwarArrow className={"dark:fill-darkBg fill-black"} />
        </button>
      </div>
    </div>
  );
};

export default BottomBar;

