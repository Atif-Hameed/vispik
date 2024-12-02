"use client";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import { useTheme } from "next-themes";
import { getBankHolidays } from "@/actions/holidaysService";
import MonthDropdown from "./MonthDropdown";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import { SilverAction } from "@/actions/download-files/silver";
import { GoldAction } from "@/actions/download-files/gold";

interface CalenderRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalenderRangeModal: React.FC<CalenderRangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [holidays, setHolidays] = useState([]);
  const { theme } = useTheme();

  // Define the allowed date range
  const minDate = new Date(2007, 3, 26);
  const maxDate = new Date();

  const months = Array.from({ length: 12 }, (_, index) =>
    new Date(0, index).toLocaleString("default", { month: "long" })
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2007 + 1 },
    (_, index) => 2007 + index
  );

  const handleMonthSelect = (month: string) => {
    const newDate = new Date(startDate || new Date());
    const monthIndex = months.indexOf(month);
    newDate.setMonth(monthIndex);
    setStartDate(newDate);
  };

  const handleYearSelect = (year: string) => {
    const newDate = new Date(startDate || new Date());
    newDate.setFullYear(parseInt(year, 10));
    setStartDate(newDate);
  };

  const decreaseMonth = () => {
    const newDate = new Date(startDate || new Date());
    newDate.setMonth(newDate.getMonth() - 1);
    setStartDate(newDate);
  };

  const increaseMonth = () => {
    const newDate = new Date(startDate || new Date());
    newDate.setMonth(newDate.getMonth() + 1);
    setStartDate(newDate);
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      const fetchedHolidays = await getBankHolidays();
      setHolidays(fetchedHolidays);
    };

    fetchHolidays();
  }, []);

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const session_id = searchParams.get("session_id");

  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;
    return new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
  };

  const handleDownload = async (start: Date | null, end: Date | null) => {
    if (!start || !end) return;

    const formattedStartDate = formatDate(start);
    const formattedEndDate = formatDate(end);

    try {
      if (type === "silver") {
        const response = await SilverAction({
          startDate: formattedStartDate!,
          endDate: formattedEndDate!,
          sessionId: session_id!,
        });
        if (response.success) {
          toast.success("Silver data downloaded successfully");

          const blob = new Blob([response.data], {
            type: "text/csv;charset=utf-8",
          });

          saveAs(
            blob,
            `VIXSpike_SilverPackage_${formattedStartDate}_to_${formattedEndDate}.csv`
          );
          router.replace(`?${searchParams.toString()}`);
        } else {
          toast.error(response.error);
        }
      } else if (type === "gold") {
        const response = await GoldAction({
          startDate: formattedStartDate!,
          endDate: formattedEndDate!,
          sessionId: session_id!,
        });

        if (response.success) {
          toast.success("Gold data downloaded successfully");

          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;

          link.download = `VIXSpike_GoldPackage_${formattedStartDate}_to_${formattedEndDate}.xlsx`;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);

          router.replace(`?${searchParams.toString()}`);
        } else {
          toast.error(response.error);
        }
      }
    } catch (error) {
      toast.error("An error occurred during download");
      console.error("Error in handleDownload:", error);
    }
  };

  const isDateInRange =
    endDate &&
    startDate! >= minDate &&
    endDate <= maxDate &&
    startDate! <= endDate;

  return (
    <>
      {isOpen && (
        <div
          className="modal-overlay flex-col flex items-center justify-center fixed top-0 left-0
                    pt-6 w-screen h-screen z-50 px-4 lg:px-8 md:px-6 overflow-auto text-center bg-black bg-opacity-40"
        >
          <div
            className="relative max-w-lg w-full modal items-center
                        flex flex-col dark:bg-bg bg-white rounded-2xl z-50 shadow-2xl shadow-black"
          >
            <div className="w-full flex justify-end">
              <div
                className="md:w-7 w-6 md:h-7 h-6 rounded-full dark:bg-secondary bg-bg cursor-pointer flex items-center
                                justify-center md:-mt-2.5 -mt-2 md:-mr-2.5 -mr-2 hover:rotate-180 transform transition-all duration-400"
                onClick={onClose}
              >
                <RxCross2 className="dark:text-bg text-secondary" size={18} />
              </div>
            </div>

            <div className="w-full pt-6 pb-6 px-4">
              <h2 className="text-2xl font-semibold dark:text-secondary text-bg">
                Select Date Range to Download Data
              </h2>

              <div
                className="mb-5 mt-8 flex flex-col items-center justify-center border dark:border-secondary border-bg rounded-xl
             py-4 px-6 w-4/5 mx-auto text-lg dark:text-secondary text-gray-700"
              >
                <p className="text-center text-sm dark:opacity-70 font-semibold mb-2">
                  Selected Date Range
                </p>
                {startDate && endDate ? (
                  <div className="text-center text-base dark:text-secondary text-gray-700">
                    {`${startDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })} - ${endDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}`}
                  </div>
                ) : (
                  <div className="text-center text-base dark:text-secondary text-gray-700">
                    Please select a date range.
                  </div>
                )}
              </div>

              <div className="w-full px-2">
                <DatePicker
                  selected={startDate}
                  onChange={(dates: [Date | null, Date | null]) => {
                    const [start, end] = dates;
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  startDate={startDate || undefined}
                  endDate={endDate || undefined}
                  minDate={minDate}
                  maxDate={maxDate}
                  selectsRange
                  inline
                  renderCustomHeader={(props) => (
                    <div className="flex justify-between items-center mb-3">
                      <div
                        className="dark:bg-bg bg-[#F5F5F5] w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={props.decreaseMonth}
                      >
                        <IoChevronBackSharp className="dark:text-secondary text-bg" />
                      </div>

                      <MonthDropdown
                        items={months}
                        initialName={months[new Date(props.date).getMonth()]}
                        onSelect={(month) =>
                          props.changeMonth(months.indexOf(month))
                        }
                        className="!w-[6.5rem]"
                      />

                      <MonthDropdown
                        items={years.map((year) => year.toString())}
                        initialName={new Date(props.date)
                          .getFullYear()
                          .toString()}
                        onSelect={(year) =>
                          props.changeYear(parseInt(year, 10))
                        }
                        className="!w-[4.5rem]"
                      />

                      <div
                        className="dark:bg-bg bg-[#F5F5F5] w-6 h-6 rounded-full flex items-center justify-center text-center cursor-pointer"
                        onClick={props.increaseMonth}
                      >
                        <IoChevronForwardSharp className="dark:text-secondary text-bg" />
                      </div>
                    </div>
                  )}
                />
              </div>

              <button
                onClick={() => handleDownload(startDate, endDate)}
                className={`w-4/5 mx-auto border dark:border-primary border-darkGreen text-base font-semibold rounded-xl py-3 flex flex-row
                                items-center gap-x-2 justify-center dark:text-primary text-darkGreen mt-6 dark:hover:bg-[#3f464a60] hover:bg-[#fff] ${
                                  isDateInRange
                                    ? ""
                                    : "opacity-50 cursor-not-allowed"
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

export default CalenderRangeModal;
