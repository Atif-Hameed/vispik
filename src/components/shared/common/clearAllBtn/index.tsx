"use client";
import { ClearAll } from "@/svgs/indicatorSvg";
import React, { useState } from "react";

interface Props {
  label?: string;
  loadingLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: string;
  text?: string;
  isActive?: boolean;
}

const ClearAllBtn: React.FC<Props> = ({ text, onClick, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`lg:px-2 px-7 w-full  py-[3px] rounded-[6px] flex justify-center gap-2 items-center 
      relative border-[1px] bg-secondary dark:bg-secondary dark:hover:bg-secondary/80`}
    >
      <h2 className="font-normal text-base dark:text-darkBg">{text}</h2>
      <ClearAll className={"dark:fill-darkBg fill-black"} />
    </button>
  );
};

export default ClearAllBtn;
