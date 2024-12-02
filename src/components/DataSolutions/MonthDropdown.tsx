'use client'
import { useEffect, useRef, useState } from "react";
import Down from "@/svgs/Down"
import { useTheme } from "next-themes";

interface Props {
    items: string[];
    className?: string;
    initialName: string;
    classNameInner?: string;
    onSelect: (item: string) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export default function MonthDropdown({
    items, className, initialName, classNameInner, onSelect, onClick
}: Props) {
    const [isActive, setIsActive] = useState(false);
    const [selected, setIsSelected] = useState(initialName);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const handleItemClick = (item: string) => {
        setIsSelected(item);
        onSelect(item);
        setIsActive(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsActive(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className={`relative w-full  flex  ${className}`} onClick={onClick}>
            <div className={`w-full px-2 dark:bg-bg bg-white rounded`}>
                <div onClick={() => setIsActive(!isActive)}
                    className={`cursor-pointer bg-transparent text-sm flex items-center justify-between font-medium py-1 w-full ${classNameInner}`}>
                    {selected}
                    <span>{<Down className={`dark:text-primary text-darkGreen ${isActive ? 'rotate-180 transition-all transform duration-300' : 'rotate-0 transition-all transform duration-300'}`} onClick={() => { }} />} </span>
                </div>
                <div className={`absolute h-[17rem] left-0 overflow-y-scroll dark:bg-bg bg-white top-[2rem] w-full text-start
                    z-50 ${(theme) === 'dark' ? "customScrollbarVertical dropdownShadow" : "customScrollbarVerticalLight dropdownShadowLight"}
                    ${isActive ? 'block' : 'hidden'}`}>
                    {items && items.map((item) => (
                        <div key={item} className="dark:hover:text-primary hover:text-darkGreen cursor-pointer pl-2 py-2 text-sm"
                            onClick={() => handleItemClick(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}