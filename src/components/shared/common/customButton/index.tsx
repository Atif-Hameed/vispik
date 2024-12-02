import React, { useState } from "react";

interface Props {
  label: string;
  loadingLabel?: string;
  title?: string;
  disabled?: boolean;
  active?: boolean;
  loading?: boolean;
  classNameParent?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: string;
  Svg: React.ComponentType<{ color: string }>;
}

const CustomBtn: React.FC<Props> = ({
  label,
  onClick,
  active,
  style,
  type = "button",
  classNameParent,
  loadingLabel = "Loading...",
  disabled = false,
  loading = false,
  title,
  className,
  Svg,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(true);
    if (onClick) {
      onClick(e);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsClicked(false);
  };

  return (
    <div
      className={`relative flex flex-col items-center group ${classNameParent}`}
    >
      {!isClicked && (
        <div
          className={`absolute left-[50%] transition-all duration-300 
                    ${isHovered
              ? "opacity-100 translate-y-[-30px]"
              : "opacity-0 translate-y-[-20px]"
            }`}
        >
          <div className="relative left-[-50%] whitespace-nowrap text-sm dark:text-secondary text-[#707070]">
            {title}
          </div>
        </div>
      )}
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled || loading}
        type={type}
        onClick={handleClick}
        className={`w-[40px] xxl:w-[50px] h-[40px] xxl:h-[50px] rounded-[6px] flex justify-center items-center relative border-[1px] dark:border-[#3C4045] border-lightBorder
                active:border-[1px] dark:text-white dark:bg-lightDark dark:hover:bg-[#3C4045] bg-white hover:bg-[#fff] ${className}`}
      >
        {loading ? (
          <span className="loader">{loadingLabel}</span>
        ) : (
          <Svg color={isHovered || active ? "#00FEB5" : "#D4D4D4"} />
        )}
      </button>
    </div>
  );
};

export default CustomBtn;