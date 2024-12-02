"use client";
import React from "react";
import IndicatorBtn from "@/components/shared/common/indicatorBtn";
import ClearAllBtn from "@/components/shared/common/clearAllBtn";
import { useTheme } from "next-themes";
import { format } from "date-fns";
import { VIX1D, VixIndex } from "@/svgs/indicatorSvg";

interface IndicatorsProps {
  activeIndicators: string[];
  fullScreen: boolean;
  toggleIndicator: (indicator: string) => void;
  setActiveIndicators: React.Dispatch<React.SetStateAction<string[]>>;
  selectedDates: Date[];
  setSelectedDates: React.Dispatch<React.SetStateAction<Date[]>>;  // <-- Correctly typed
  colorMap: {
    [key: string]: string;
  };
  svgMap: {
    [key: string]: any;
  };
  setHoveredBtn: (text: string | null) => void;
}


const Indicators: React.FC<IndicatorsProps> = ({
  activeIndicators,
  toggleIndicator,
  fullScreen,
  setActiveIndicators,
  selectedDates,
  colorMap,
  setSelectedDates,
  svgMap,
  setHoveredBtn,
}) => {
  const { theme } = useTheme();

  // Create an array of objects from selectedDates
  const dateObjects = selectedDates.length > 0
    ? selectedDates
      .filter((date) => date && !isNaN(new Date(date).getTime()))
      .map((date, index) => {
        const formattedDate = format(new Date(date), "MMMM d, yyyy");
        return {
          color: colorMap[formattedDate] || "#ccc",
          Svg: svgMap[formattedDate] || VixIndex, // Use a default SVG fallback
          text: formattedDate,
        };
      })
    : [
      {
        color: "#ccc",
        Svg: VixIndex, // Default SVG fallback
        text: "No dates selected",
      },
    ];




  const handleClearAll = () => {
    setActiveIndicators([])
    setSelectedDates([]);
  }


  return (
    <div
      className={`gap-2 gap-x-5 grid grid-cols-2 justify-between h-full ${fullScreen
        ? "lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3"
        : "md:grid-cols-1 justify-end"
        } `}
    >
      <div className="mb-auto space-y-2">
        {dateObjects.map((button, index) => (
          <IndicatorBtn
            key={index}
            color={button.color}
            Svg={button.Svg}
            text={button.text}
            isActive={activeIndicators.includes(button.text)}
            onClick={() => toggleIndicator(button.text)}
            setHoveredBtn={setHoveredBtn}
          />
        ))}
      </div>
      {!fullScreen ? (
        <div className={`space-y-2 mt-auto mb-[6.5rem]`}>
          <IndicatorBtn
            color={theme === "dark" ? "#D4D4D4" : "#30353A"}
            Svg={VixIndex}
            text={"Add Today"}
            isActive={activeIndicators.includes("Today")}
            onClick={() => toggleIndicator("Today")}
            setHoveredBtn={setHoveredBtn}
          />
          <IndicatorBtn
            color={theme === "dark" ? "#D4D4D4" : "#30353A"}
            Svg={VixIndex}
            text={"Add Previous"}
            isActive={activeIndicators.includes("Prev")}
            onClick={() => toggleIndicator("Prev")}
            setHoveredBtn={setHoveredBtn}
          />
          <ClearAllBtn
            onClick={handleClearAll}
            text={"CLEAR ALL"}
          />
        </div>
      ) : (
        <>
          <IndicatorBtn
            color={""}
            Svg={VixIndex}
            text={"Add Today"}
            isActive={activeIndicators.includes("Today")}
            onClick={() => toggleIndicator("Today")}
            setHoveredBtn={setHoveredBtn}
          />
          <IndicatorBtn
            color={""}
            Svg={VixIndex}
            text={"Add Previous"}
            isActive={activeIndicators.includes("Prev")}
            onClick={() => toggleIndicator("Prev")}
            setHoveredBtn={setHoveredBtn}
          />
          <ClearAllBtn
            onClick={handleClearAll}
            text={"CLEAR ALL"}
          />
        </>
      )}
    </div>
  );
};

export default Indicators;