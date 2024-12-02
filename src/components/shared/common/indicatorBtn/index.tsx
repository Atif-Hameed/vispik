"use client";
import React, { useState } from "react";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  Svg: React.ComponentType<{ color: string }>;
  color: string;
  text: string;
  isActive: boolean;
  className?: string;
  setHoveredBtn: (text: string | null) => void;
}

const IndicatorBtn: React.FC<Props> = ({
  color,
  Svg,
  text,
  onClick,
  isActive,
  setHoveredBtn,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true);
        if (isActive) {
          setHoveredBtn(text);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredBtn("");
      }}
      className={`lg:px-2 px-7 w-full py-1 rounded-[6px] flex justify-center items-center relative border-[1px] hover:bg-secondary 
        dark:hover:bg-[#3A4148] dark:bg-darkBg bg-white ${className}`}
      style={{ borderColor: isActive ? color : "transparent" }}
    >
      <div
        className={`absolute left-2 
        ${(text === "Low" && "bottom-[9.5px]") ||
          (text === "VIX6M Index" && "bottom-[9.5px]")
          }`}
      >
        <Svg color={isActive ? color : "#969696"} />
      </div>
      <h2 className="font-normal text-sm xxl:text-base dark:text-secondary whitespace-nowrap">
        {text}
      </h2>
    </button>
  );
};

export default IndicatorBtn;
