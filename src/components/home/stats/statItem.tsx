import React from "react";

type StatItemProps = {
  label: string;
  value?: any;
  isFirst?: boolean;
  isLast?: boolean;
};

const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  isFirst,
  isLast,
}) => {
  return (
    <div className="flex flex-1 w-full">
      <div
        className={`px-4 py-2 xl:px-8 bg-white text-center flex justify-center items-center dark:bg-lightDark 
        text-black dark:text-secondary text-sm xxl:text-base dark:border-border border-lightBorder  
          ${isFirst ? "lg:rounded-tl-lg lg:rounded-bl-lg" : "lg:border-l-2"} 
          ${isLast ? "lg:rounded-tr-lg lg:rounded-br-lg" : ""}`}
      >
        {label}
      </div>

      {value && (
        <div
          className={`py-2 w-20 text-center flex-1 flex justify-center items-center lg:border-l-2 dark:border-border border-lightBorder 
            dark:bg-darkBg bg-lightGray text-black dark:text-secondary text-sm xxl:text-base  
            ${isLast ? "rounded-tr-lg rounded-br-lg" : ""}`}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default StatItem;
