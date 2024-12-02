'use client'
import { useEffect, useRef, useState } from "react";
import Down from "@/svgs/Down";
import { useTheme } from "next-themes";

interface Props {
    items: string[];
    className?: string;
    initialName: string;
    classNameInner?: string;
    error?: string;
    onSelect: (item: string) => void;
}

export default function Dropdown({ items, className, initialName, classNameInner, onSelect, error }: Props) {
    const [isActive, setIsActive] = useState(false);
    const [selected, setIsSelected] = useState(initialName);
    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const handleItemClick = (item: string) => {
        setIsSelected(item);
        onSelect(item);
        setIsActive(false);
        setIsFocused(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsActive(false);
                setIsFocused(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setFilteredItems(items.filter(item => item.toLowerCase().startsWith(searchQuery.toLowerCase())));
    }, [searchQuery, items]);

    return (
        <>
            <div ref={dropdownRef} className={`relative w-full flex mt-6 ${className}`}>
                <div className={`w-full border-0 border-b-2 relative 
                    ${error ? (isActive ? 'dark:border-primary border-darkGreen' : 'dark:border-[#FF5166] border-[#FF5166]')
                        : (isActive ? 'dark:border-primary border-darkGreen' : 'dark:border-b-secondary border-b-[#707070]')}`}
                >
                    <div onClick={() => {
                        setIsActive(!isActive);
                        setIsFocused(!isActive);
                    }}
                        className={`cursor-pointer bg-transparent lg:text-xl text-lg flex items-center justify-between font-medium py-2.5 w-full ${classNameInner}`}>
                        {!selected && <span className="text-[#9aa3af]">* Job Role</span>}
                        {selected ? selected : " "}
                        <span>{<Down className={`${isActive ? 'rotate-180 transition-all transform duration-300' : 'rotate-0 transition-all transform duration-300'}`} onClick={() => { }} />} </span>
                    </div>
                    <div className={`absolute top-[3.1rem] w-full left-0 z-50 border dark:border-primary border-darkGreen border-t-0 ${isActive ? 'block' : 'hidden'}`}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Job Role..."
                            className="w-full border-b-2 border-b-darkGreen dark:border-b-primary dark:bg-bg bg-white py-2 px-4 outline-none"
                        />
                        <div className={`pt-2 h-96 overflow-y-scroll dark:bg-bg bg-white ${(theme) === 'dark' ? "customScrollbarVertical" : "customScrollbarVerticalLight"}`}>
                            {filteredItems.map((item) => (
                                <div key={item} className="dark:hover:bg-primary hover:bg-darkGreen dark:hover:text-bg hover:text-white cursor-pointer px-4 py-1"
                                    onClick={() => handleItemClick(item)}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    {isFocused && (
                        <div onClick={() => setIsActive(!isActive)} className="bottom-6 left-0 h-0.5 w-full dark:bg-primary bg-darkGreen absolute blur-[1rem] cursor-pointer" />
                    )}
                </div>
            </div>
            {error && <p className="text-[#FF5166] text-xs pl-2 pt-1 z-20 relative">Please complete this required field</p>}
        </>
    );
}