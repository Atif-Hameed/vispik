"use client";
import React, { useState } from "react";
import { DarkMode, LightMode } from "@/svgs";
import { useTheme } from "next-themes";

type Props = {};

const ThemeToggleBtn = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const [isHoveredLight, setIsHoveredLight] = useState(false);
  const [isHoveredDark, setIsHoveredDark] = useState(false);

  return (
    <div className="flex items-center relative">
      <div className="relative flex flex-col items-center group">
        <div
          className={`absolute left-[50%] transition-all duration-300 
          ${isHoveredDark
              ? "opacity-100 translate-y-[-30px]"
              : "opacity-0 translate-y-[-20px]"
            }`}
        >
          <div className="relative left-[-50%] whitespace-nowrap text-sm dark:text-secondary text-[#707070]">
            Dark Mode
          </div>
        </div>
        <button
          onClick={toggleTheme}
          onMouseEnter={() => setIsHoveredDark(true)}
          onMouseLeave={() => setIsHoveredDark(false)}
          className={`w-[40px] h-[40px] xxl:w-[50px] xxl:h-[50px] rounded-[6px] flex justify-center items-center 
          relative dark:text-white dark:bg-darkBg bg-white hover:bg-[#fff] border-[1px] dark:border-[#3C4045] border-lightBorder`}
        >
          <DarkMode className={`w-5 h-5 fill-[#707070] dark:fill-primary`} />
        </button>
      </div>

      <div className="relative flex flex-col items-center group ml-2">
        <div
          className={`absolute left-[50%] transition-all duration-300 
          ${isHoveredLight
              ? "opacity-100 translate-y-[-30px]"
              : "opacity-0 translate-y-[-20px]"
            }`}
        >
          <div className="relative left-[-50%] whitespace-nowrap text-sm dark:text-secondary text-[#707070]">
            Light Mode
          </div>
        </div>
        <button
          onClick={toggleTheme}
          onMouseEnter={() => setIsHoveredLight(true)}
          onMouseLeave={() => setIsHoveredLight(false)}
          className={` w-[40px] h-[40px] xxl:w-[50px] xxl:h-[50px] rounded-[6px] flex justify-center items-center 
            relative dark:text-white dark:bg-lightDark bg-lightbg dark:hover:bg-[#3C4045] border-[1px] dark:border-[#3C4045] border-lightBorder`}
        >
          <LightMode
            className={`w-5 h-5 ${theme === "light"
              ? "dark:fill-primary fill-darkGreen"
              : "dark:fill-secondary fill-[#707070]"
              }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ThemeToggleBtn;