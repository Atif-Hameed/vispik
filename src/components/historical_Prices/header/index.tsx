// src/components/Header.tsx
"use client";
import CustomBtn from "@/components/shared/common/customButton";
import Section from "@/components/shared/common/section";
import ThemeToggleBtn from "@/components/shared/theme/themeToggleBtn";
import { Calendar, Download, FullScreen } from "@/svgs";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useFullscreen } from "@/context/FullScreenContext";
import Minimize from "@/svgs/Minimize";

interface HeaderProps {
  active: boolean;
  setActive: (active: boolean) => void;
  fullScreen: boolean;
  setFullScreen: (active: boolean) => void;
  setDateToggle: Dispatch<SetStateAction<"one" | "multiple">>;
  dateToggle: "one" | "multiple";
  downloadData: any;
}

const Header: React.FC<HeaderProps> = ({
  active,
  setActive,
  setDateToggle,
  dateToggle,
  downloadData,
}) => {
  const { isFullscreen, setIsFullscreen } = useFullscreen();
  const [isTableVisible, setTableVisible] = useState(false);

  const handleFullScreenClick = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleClick = () => {
    !isTableVisible && setTableVisible(true);
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("historicalTable")?.offsetTop,
        behavior: "smooth",
      });
    }, 0);

    setActive(!active);
  };

  return (
    <Section>
      <div
        className={`w-full flex justify-between xl:flex-row  flex-col pb-6 ${isFullscreen ? "pt-6" : "pt-12"
          }`}
      >
        <div className="space-y-2 lg:w-1/2 lg:pb-0 -mb-[4px] pb-2">
          <h2 className="xxl:text-[2.5rem] lg:text[2rem] md:text-3xl text-2xl tracking-wide font-semibold text-bg dark:text-secondary">
            VIX Futures Historical Prices
          </h2>
          <span className="text-[#707070] dark:text-[#C5C5C5] text-sm xxl:text-base">
            Source: CBOE Delayed Quotes
          </span>
        </div>

        <div className="flex flex-wrap justify-end gap-2 items-center xl:w-1/2 self-end md:pt-0 sm:pt-4 pt-8">
          
          <div className="flex w-96 items-center rounded-xl bg-lightbg dark:bg-lightDark font-medium border-[1px] dark:border-[#3C4045] border-lightBorder text-sm xxl:text-base">
            <button
              className={`py-3 px-4 w-1/2 rounded-tl-xl rounded-bl-xl ${dateToggle === "one"
                ? "dark:bg-primary bg-darkGreen dark:text-black text-white"
                : "bg-white dark:bg-lightDark dark:text-secondary text-[#707070] dark:hover:bg-[#3C4045] hover:bg-[#fff]"
                }`}
              onClick={() => setDateToggle("one")}
            >
              One Date per Graph
            </button>
            <button
              className={`py-3 px-4 w-1/2 rounded-tr-xl rounded-br-xl ${dateToggle === "multiple"
                ? "dark:bg-primary bg-darkGreen dark:text-black text-white"
                : "bg-white dark:bg-lightDark dark:text-secondary text-[#707070] dark:hover:bg-[#3C4045] hover:bg-[#fff]"
                }`}
              onClick={() => setDateToggle("multiple")}
            >
              Multiple Dates per Graph
            </button>
          </div>

          <CustomBtn
            title="Table View"
            label="Table View"
            Svg={(props) => (
              <Calendar
                {...props}
                className={`w-5 h-5 xxl:w-6 xxl:h-6 ${active
                  ? "dark:fill-primary fill-darkGreen"
                  : "dark:fill-secondary fill-[#707070]"
                  }`}
              />
            )}
            style="custom-class"
            active={active}
            onClick={handleClick}
          />

          <CustomBtn
            title={`${isFullscreen ? "Minimize View" : "Full Screen View"}`}
            label="Full Screen"
            Svg={(props) =>
              isFullscreen ? (
                <Minimize
                  {...props}
                  className={`${isFullscreen
                    ? "dark:text-primary text-darkGreen"
                    : "dark:text-secondary text-[#707070]"
                    }`}
                />
              ) : (
                <FullScreen
                  {...props}
                  className={`w-5 h-5 xxl:w-6 xxl:h-6 ${isFullscreen
                    ? "dark:text-primary text-darkGreen"
                    : "dark:text-secondary text-[#707070]"
                    }`}
                />
              )
            }
            active={isFullscreen}
            onClick={handleFullScreenClick}
          />

          <CustomBtn
            title="Data Snapshot Download"
            label="Download"
            onClick={downloadData}
            classNameParent={`${dateToggle === "multiple" && "hidden"}`}
            Svg={(props) => (
              <Download
                {...props}
                className="w-5 h-5 xxl:w-6 xxl:h-6 dark:fill-secondary fill-[#707070]"
              />
            )}
          />

          {/* <ThemeToggleBtn /> */}
        </div>
      </div>
    </Section>
  );
};

export default Header;
