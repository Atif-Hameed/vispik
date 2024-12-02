"use client";
import React, { useEffect, useState } from "react";
import Star from "@/svgs/Star";
import StarEmpty from "@/svgs/StarEmpty";
import { LuDownload } from "react-icons/lu";
import { IoBagCheckOutline } from "react-icons/io5";
import Link from "next/link";
import CalenderModal from "./CalenderModal";
import FileSaver from "file-saver";
import { useTheme } from "next-themes";
import { useRouter, useSearchParams } from "next/navigation";
import { StripePaymentAction } from "@/actions/payment/stripe-payment";
import { BronzeRealTime } from "@/actions/download-files/bronze-realtime";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import CalenderRangeModal from "./CalenderRangeModal";
import { format } from "date-fns";
import { PiArrowUpRightBold } from "react-icons/pi";
import DownloadModal from "./DownloadModal";

interface StripeResponse {
  success: boolean;
  message?: string;
  redirectUrl?: string;
}

const data = [
  {
    title: "BRONZE",
    price: "$0",
    fileType: ".csv",
    points: [
      "Single Day VIX Data since 2007",
      "Single Day VIX Futures Data since 2007",
      "Real-Time Volatility Data Snapshot",
    ],
    day: "Single Day",
    data: "Get Real-Time Snapshot",
  },
  {
    title: "SILVER",
    price: "$99.99",
    fileType: ".csv",
    duration: "One-Time Data Collection Download",
    points: [
      {
        title: "Daily Historical Data since 2007, including:",
        subpoints: [
          "VIX Index Prices",
          "S&P 500 Index Prices",
          "VIX Future Contracts Prices (6 Monthly Expiries)",
        ],
      },
    ],
    day: "Data Collection",
    data: "Download Data Sample",
  },
  {
    title: "GOLD",
    price: "$119.99",
    fileType: ".csv",
    duration: "One-Time Data Collection Download",
    points: [
      {
        title: "Daily Historical Data since 2007, including:",
        subpoints: [
          "VIX Index, S&P 500 Index, and VIX Future Contracts Prices (6 Monthly Expiries)",
          "VIX Futures Contango / Backwardation",
          "VIX Futures Price difference",
          "VIX Futures Roll Yield",
          "VIX Futures Speed vs VIX Index",
          "VIX Futures Reversion Intensity vs S&P500 Index",
          "VIX Futures Carry Intensity",
        ],
      },
    ],
    day: "Data Collection",
    data: "Download Data Sample",
  },
];


const HistoricalData = () => {
  const { theme } = useTheme();
  const [calenderModal, setCalenderSentModal] = useState(false);
  const [calenderRangeModal, setCalenderRangeSentModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(2);
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const type = searchParams.get("type");

  const openCalenderModal = (downloadType: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("downloadType", downloadType);
    router.push(`?${params.toString()}`);
    setCalenderSentModal(true);
  };

  const closeCalenderModal = () => {
    setCalenderSentModal(false);
  };

  const openCalenderRangeModal = () => {
    setCalenderRangeSentModal(true);
  };

  const closeCalenderRangeModal = () => {
    setCalenderRangeSentModal(false);
  };

  const closeDownloadModal = () => {
    setDownloadModal(false);
  };

  const handleDownload = (index: number) => {
    if (index === 1) {
      FileSaver.saveAs("/Silver.csv", "VIXSpike_SilverPackage_DataSample.csv");
    } else if (index === 2) {
      FileSaver.saveAs("/Gold.csv", "'VIXSpike_GoldPackage_DataSample.csv");
    }
  };

  useEffect(() => {
    document.body.style.overflow = calenderModal || calenderRangeModal || downloadModal ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [calenderModal, calenderRangeModal, downloadModal]);

  const handleGoToCheckout = async (type: string) => {
    try {
      const response: StripeResponse = await StripePaymentAction({ type });

      if (response.success) {
        if (response.redirectUrl) {
          router.push(response.redirectUrl);
        } else {
          setDownloadModal(true);
        }
      } else if (response.message) {
        console.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const success = searchParams.get("success");
    if (success === "true") {
      setDownloadModal(true);
    }
  }, [searchParams]);

  const handleRealTimeDownload = async () => {
    const currentDate = new Date();

    const formattedDate = currentDate.toISOString().split("T")[0];
    console.log("🚀 ~ handleDownload ~ formattedDate:", formattedDate);

    const response = await BronzeRealTime({ date: formattedDate });

    if (response.data) {
      toast.success("Data downloaded successfully");

      const formattedDateMMDDYYYY = format(
        new Date(formattedDate),
        "MM-dd-yyyy"
      );

      const blob = new Blob([response.data], {
        type: "text/csv;charset=utf-8",
      });

      saveAs(blob, `VIXSpike_Realtime_${formattedDateMMDDYYYY}.csv`);
    } else {
      console.log(response.error);
      toast.error(response.error);
    }
  };

  return (
    <div
      className={`flex bg-transparent flex-row flex-wrap w-full gap-6 justify-center pt-8 relative px-6 dark:mb-16 dark:pb-10 pb-20 
    `}
    >
      {data.map((item, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(2)}
          className={`2xl:w-[27.4%] xl:w-[31%] lg:w-2/5 md:w-[44%] sm:w-3/5 w-full max-w-[420px] px-6 pt-4 pb-6 border dark:border-[#00FEB533] border-[#03693980]
            rounded-xl dark:bg-[#292D31] bg-[#fafafa] relative flex flex-col justify-between overflow-hidden
            min-h-[400px] // Adjust the min height based on your design requirements 
            ${hoveredIndex === index &&
            `border dark:border-primary border-darkGreen ${theme === "dark"
              ? "historicalDataCardShadow"
              : "historicalDataCardShadowLight"
            }`
            }`}
        >
          <div className="bg-gradient-to-b dark:from-[#00FEB50D] from-[#FAFAFA] dark:to-[#292D31] to-[#FAFAFA] blur-[1rem] h-96 w-[30rem] absolute -top-8 left-0" />
          <div className="flex flex-col h-full z-20">
            {/* Content Section */}
            <div className="border-b border-b-[#8C9492] pb-5">
              <h1 className="dark:text-primary text-darkGreen lg:text-md xxl:text-lg text-lg">
                {item.title}
              </h1>
              <div className="flex flex-row items-center justify-between w-full pt-1">
                <h3 className="dark:text-secondary text-bg font-semibold lg:text-2xl xxl:text-3xl text-3xl flex flex-wrap items-end">
                  {item.price}
                  <span className="text-base pl-1 font-normal">
                    {item.duration && <p>/{item.duration}</p>}
                  </span>
                </h3>
                {index === 0 && (
                  <p
                    className="dark:bg-[#2E4853] bg-[#FFFFFF] dark:border-0 border dark:border-[#2E4853] border-[#8EC8F0] 
                    px-5 py-1 rounded-md dark:text-[#78CEF4] text-[#8EC8F0] text-sm w-fit tracking-wider"
                  >
                    Free
                  </p>
                )}
              </div>
            </div>

            {/* Points Section */}
            <div className="flex-grow">
              <p
                className="dark:bg-[#2F3D40] bg-[#FFFFFF] dark:border-0 border border-[#D0D0D0] px-2 rounded-md 
                dark:text-primary text-darkGreen text-base w-fit mb-2 mt-4"
              >
                {item.fileType}
              </p>
              {item.points.map((point, index) => (
                <div key={index} className="">
                  {typeof point === "string" ? (
                    <p className="flex flex-row justify-start items-center gap-x-2 pt-2 pb-2 dark:text-[#C5C5C5] text-bg text-sm xxl:text-base">
                      <Star
                        className={"dark:text-primary text-darkGreen"}
                        width={17}
                        height={15}
                      />
                      <span className="">{point}</span>
                    </p>
                  ) : (
                    <>
                      <h4 className="flex flex-row gap-x-2 pt-2 dark:text-[#C5C5C5] text-bg text-sm xxl:text-base">
                        <Star
                          className={"dark:text-primary text-darkGreen"}
                          width={17}
                          height={15}
                        />
                        <span className="-mt-1">{point.title}</span>
                      </h4>
                      <ul className="dark:bg-[#2F3D40] bg-[#FFFFFF] rounded-lg px-4 pt-0.5 pb-3 mt-2 dark:border-0 border border-[#D0D0D0]">
                        {point.subpoints.map((subpoint, index) => (
                          <li
                            key={index}
                            className="flex flex-row justify-center gap-x-2 pt-3 dark:text-[#C5C5C5] text-bg text-xs xxl:text-sm"
                          >
                            <StarEmpty
                              className={"dark:text-primary text-darkGreen"}
                            />
                            <span className="w-full"> {subpoint}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center">
              {index === 0 ? (
                <>
                  <div
                    onClick={() => openCalenderModal("bronze-1")}
                    className={`${index === 0
                      ? "dark:bg-bg rounded-xl border dark:border-secondary border-[#5DA0F7]"
                      : "bg-gradient-to-b dark:from-[#00FEB5] from-[#00BF88] dark:to-[#78CEF4] to-[#8EC8F0] rounded-xl p-[1px]"
                      } w-full group`}
                  >
                    <button
                      className={`flex flex-row gap-x-4 px-4 dark:text-primary text-darkGreen text-sm xxl:text-base font-semibold py-2 
                      justify-center items-center rounded-xl dark:bg-bg bg-[#f5f5f5] w-full
                      ${index === 0
                          ? "dark:border-secondary border-[#5DA0F7] dark:!text-secondary !text-[#5DA0F7] dark:bg-darkBg dark:hover:bg-[#3f464a60] hover:bg-[#fff]"
                          : ""
                        }`}
                    >
                      Download {item.day}
                      <LuDownload
                        size={22}
                        className={`${index === 0
                          ? "dark:text-secondary text-[#5DA0F7]"
                          : ""
                          }`}
                      />
                    </button>
                  </div>
                  <button
                    onClick={handleRealTimeDownload}
                    className={`dark:hover:bg-[#3f464a60] hover:bg-[#fff] w-full border text-sm xxl:text-base font-semibold
                    rounded-xl py-2 flex flex-row mt-4 items-center gap-x-2 justify-center
                    ${index === 0
                        ? "dark:border-secondary border-[#5DA0F7] dark:text-secondary text-[#5DA0F7]"
                        : ""
                      }`}
                  >
                    {item.data}
                    <LuDownload
                      size={22}
                      className={`${index === 0 ? "dark:text-secondary text-[#5DA0F7]" : ""
                        }`}
                    />
                  </button>
                  <div className="mt-4 flex justify-center items-center gap-x-2 text-xs xxl:text-sm group invisible">
                    Need help? Ask{" "}
                    <PiArrowUpRightBold className="group-hover:rotate-0 rotate-45 transition-transform" />
                  </div>
                </>
              ) : (
                (item.title === "SILVER" || item.title === "GOLD") &&
                !success && (
                  <>
                    <div
                      onClick={() => handleGoToCheckout(item.title)}
                      className={` w-full group bg-gradient-to-b dark:from-[#00FEB5] from-[#00BF88] dark:to-[#78CEF4] to-[#8EC8F0] 
                        rounded-xl p-[1px] hover:text-primary hover:bg-gradient-to-b hover:from-[#00FEB51F] hover:to-[#78CEF41F`}
                    >
                      <button
                        className={`flex flex-row gap-x-4 px-4 dark:text-primary text-darkGreen text-sm xxl:text-base font-semibold 
                        py-2 justify-center items-center rounded-xl dark:bg-bg bg-[#f5f5f5] w-full group-hover:text-bg group-hover:bg-gradient-to-b 
                        group-hover:dark:from-[#00FEB5] group-hover:dark:to-[#78CEF4] group-hover:from-[#00BF88] group-hover:to-[#8EC8F0]`}
                      >
                        Purchase {item.day}
                        <IoBagCheckOutline size={22} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDownload(index)}
                      className={`dark:hover:bg-[#97ccef40] hover:bg-[#fff] w-full border text-sm xxl:text-base font-semibold rounded-xl py-2 
                      flex flex-row mt-4 items-center gap-x-2 justify-center dark:border-[#97ccef] border-[#97ccef] dark:text-[#97ccef] text-[#97ccef]`}
                    >
                      {item.data}
                      <LuDownload size={22} />
                    </button>
                    <Link
                      href="/contact-us"
                      className="mt-4 flex justify-center items-center gap-x-2 text-xs xxl:text-sm group"
                    >
                      Need help? Ask{" "}
                      <PiArrowUpRightBold className="group-hover:rotate-0 rotate-45 transition-transform" />
                    </Link>
                  </>
                )
              )}

              {success && index !== 0 && (
                <>
                  {(type === "silver" && item.title === "SILVER") ||
                    (type === "gold" && item.title === "GOLD") ? (
                    <>
                      <div
                        onClick={() => openCalenderRangeModal()}
                        className={`w-full group bg-gradient-to-b dark:from-[#00FEB5] from-[#00BF88] dark:to-[#78CEF4] to-[#8EC8F0] rounded-xl p-[1px] hover:text-primary hover:bg-gradient-to-b hover:from-[#00FEB51F] hover:to-[#78CEF41F`}
                      >
                        <button
                          className={`flex flex-row gap-x-4 px-4 dark:text-primary text-darkGreen text-sm xxl:text-base font-semibold py-2 justify-center items-center rounded-xl dark:bg-bg bg-[#f5f5f5] w-full group-hover:text-bg group-hover:bg-gradient-to-b group-hover:dark:from-[#00FEB5] group-hover:dark:to-[#78CEF4] group-hover:from-[#00BF88] group-hover:to-[#8EC8F0]`}
                        >
                          Download {item.day}
                          <LuDownload size={22} className={``} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleDownload(index)}
                        className={`dark:hover:bg-[#97ccef40] hover:bg-[#fff] w-full border text-sm xxl:text-base font-semibold 
                          rounded-xl py-2 flex flex-row mt-4 items-center gap-x-2 justify-center
                          dark:border-[#97ccef] border-[#97ccef] dark:text-[#97ccef] text-[#97ccef] 
                          `}
                      >
                        {item.data}
                        <LuDownload size={22} className={``} />
                      </button>
                      <Link
                        href="/contact-us"
                        className="mt-4 flex justify-center items-center gap-x-2 text-xs xxl:text-sm group"
                      >
                        Need help? Ask{" "}
                        <PiArrowUpRightBold className="group-hover:rotate-0 rotate-45 transition-transform" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={() => handleGoToCheckout(item.title)}
                        className={`w-full group bg-gradient-to-b dark:from-[#00FEB5] from-[#00BF88] dark:to-[#78CEF4] to-[#8EC8F0] rounded-xl p-[1px] hover:text-primary hover:bg-gradient-to-b hover:from-[#00FEB51F] hover:to-[#78CEF41F`}
                      >
                        <button
                          className={`flex flex-row gap-x-4 px-4 dark:text-primary text-darkGreen text-sm xxl:text-base font-semibold 
                          py-2 justify-center items-center rounded-xl dark:bg-bg bg-[#f5f5f5] w-full group-hover:text-bg group-hover:bg-gradient-to-b 
                          group-hover:dark:from-[#00FEB5] group-hover:dark:to-[#78CEF4] group-hover:from-[#00BF88] group-hover:to-[#8EC8F0]`}
                        >
                          Purchase {item.day}
                          <IoBagCheckOutline size={22} className={``} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleDownload(index)}
                        className={`dark:hover:bg-[#97ccef40] hover:bg-[#fff] w-full border text-sm xxl:text-base font-semibold 
                          rounded-xl py-2 flex flex-row mt-4 items-center gap-x-2 justify-center
                          dark:border-[#97ccef] border-[#97ccef] dark:text-[#97ccef] text-[#97ccef]`}
                      >
                        {item.data}
                        <LuDownload size={22} className={``} />
                      </button>
                      <Link
                        href="/contact-us"
                        className="mt-4 flex justify-center items-center gap-x-2 text-xs xxl:text-sm group"
                      >
                        Need help? Ask{" "}
                        <PiArrowUpRightBold className="group-hover:rotate-0 rotate-45 transition-transform" />
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      <CalenderModal isOpen={calenderModal} onClose={closeCalenderModal} />
      <CalenderRangeModal isOpen={calenderRangeModal} onClose={closeCalenderRangeModal} />
      <DownloadModal type={type} isOpen={downloadModal} onClose={closeDownloadModal} />
    </div>
  );
};

export default HistoricalData;
