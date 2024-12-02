"use client";
import React, { useState } from "react";
import CustomBtn from "@/components/shared/common/customButton";
import Section from "@/components/shared/common/section";
// import ThemeToggleBtn from "@/components/shared/theme/themeToggleBtn";
import { Calendar, Download, FullScreen } from "@/svgs";
import Minimize from "@/svgs/Minimize";
import LineGraph from "@/svgs/LineGraph";
import { useFullscreen } from "@/context/FullScreenContext";

interface HeaderProps {
  active: boolean;
  setActive: (active: boolean) => void;
  fullScreen: boolean;
  setFullScreen: (active: boolean) => void;
  downloadData: any;
}

const Header: React.FC<HeaderProps> = ({ active, setActive, downloadData }) => {
  const [isTableVisible, setTableVisible] = useState(false);
  const { isFullscreen, setIsFullscreen } = useFullscreen();

  const handleFullScreenClick = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleClick = () => {
    !isTableVisible && setTableVisible(true);
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("table")?.offsetTop,
        behavior: "smooth",
      });
    }, 0);

    setActive(!active);
  };

  return (
    <Section>
      <div
        className={`w-full flex justify-between  sm:flex-row flex-col pb-6 ${isFullscreen ? "pt-6" : "pt-12"
          }`}
      >
        <div className="space-y-2 lg:w-1/2 -mb-[4px]">
          <h2 className="xxl:text-[2.5rem] lg:text[2rem] md:text-3xl text-2xl tracking-wide font-semibold text-bg dark:text-secondary">
            VIX Futures Term Structure
          </h2>
          <span className="text-[#707070] dark:text-[#C5C5C5] text-sm xxl:text-base">
            Source: CBOE Delayed Quotes
          </span>
        </div>

        <div className="flex justify-end gap-2 items-center lg:w-1/2 sm:pt-0 pt-10 self-end">
          <CustomBtn
            title={active ? "Show Line Graph" : "Table View"}
            label={active ? "Show Line Graph" : "Table View"}
            Svg={(props) =>
              active ? (
                <LineGraph
                  {...props}
                  className={`w-5 h-5 xxl:w-6 xxl:h-6 ${active
                    ? "dark:text-primary text-darkGreen"
                    : "dark:text-secondary text-[#707070]"
                    }`}
                />
              ) : (
                <Calendar
                  {...props}
                  className={`w-5 h-5 xxl:w-6 xxl:h-6 ${active
                    ? "dark:fill-primary fill-darkGreen"
                    : "dark:fill-secondary fill-[#707070]"
                    }`}
                />
              )
            }
            active={active}
            className={`${isFullscreen && "hidden"}`}
            onClick={handleClick}
          />
          <CustomBtn
            title={`${isFullscreen ? "Minimize View" : "Full Screen View"}`}
            label="Full Screen"
            Svg={(props) =>
              isFullscreen ? (
                <Minimize
                  {...props}
                  className={`w-5 h-5 xxl:w-6 xxl:h-6${isFullscreen
                    ? "dark:text-primary text-darkGreen"
                    : "dark:text-secondary text-[#707070]"
                    }`}
                />
              ) : (
                <FullScreen
                  {...props}
                  className={`w-5 h-5 xxl:w-6 xxl:h-6 dark:text-secondary text-[#707070]`}
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
