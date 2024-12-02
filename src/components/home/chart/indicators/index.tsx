"use client";
import React, { useEffect } from "react";
import { indicatorsBtnsData } from "./data";
import IndicatorBtn from "@/components/shared/common/indicatorBtn";
import ClearAllBtn from "@/components/shared/common/clearAllBtn";
import { darkColors, lightColors } from "../colorData";
import { useTheme } from "next-themes";
import { useFullscreen } from "@/context/FullScreenContext";

interface IndicatorsProps {
  activeIndicators: string[];
  fullScreen: boolean;
  clearAll: boolean;
  setClearAll: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIndicator: (indicator: string) => void;
  setActiveIndicators: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLine: any;
  setHoveredBtn: (text: string | null) => void;
}

const Indicators: React.FC<IndicatorsProps> = ({
  activeIndicators,
  toggleIndicator,
  fullScreen,
  clearAll,
  setClearAll,
  setActiveIndicators,
  selectedLine,
  setHoveredBtn,
}) => {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkColors : lightColors;
  const { isFullscreen } = useFullscreen();

  // Effect to set clearAll based on activeIndicators length
  useEffect(() => {
    if (activeIndicators.length === 0) {
      setClearAll(true); // Set clearAll to true when no indicators are active
    } else {
      setClearAll(false); // Set clearAll to false when indicators are active
    }
  }, [activeIndicators, setClearAll]);

  const handleClearAll = () => {
    setActiveIndicators([]); // Clear all active indicators
    setClearAll(true); // Explicitly set clearAll to true
  };

  return (
    <div
      className={`gap-1.5 xxl:gap-1.5 gap-x-5 py-4 grid sm:grid-cols-3 grid-cols-2 z-10 ${isFullscreen
        ? "2xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4"
        : "lg:grid-cols-1"
        } `}
    >
      {indicatorsBtnsData.map((button, index) => (
        <IndicatorBtn
          key={index}
          color={colors[button.text]}
          Svg={button.Svg}
          text={button.text}
          isActive={activeIndicators.includes(button.text)}
          onClick={() => toggleIndicator(button.text)}
          setHoveredBtn={setHoveredBtn}
          className={`${selectedLine &&
            selectedLine.includes(button.text) &&
            "!bg-secondary dark:!bg-[#3A4148]"
            }`}
        />
      ))}
      <ClearAllBtn onClick={handleClearAll} text={"CLEAR ALL"} />
    </div>
  );
};

export default Indicators;
