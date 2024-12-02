"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import logo from "/public/assets/logo.svg";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoClose } from "react-icons/io5";
import HomeIcon from "@/svgs/HomeIcon";
import { useFullscreen } from "@/context/FullScreenContext";
import { useActiveButton } from "@/context/ActiveButtonContext";
import { MenuBurger, DownArrow, SpeedTracker, NewsFeed, Dashboard, HoverDashboard, } from "@/svgs";

const menuItems = [
  { label: "VIX HISTORICAL PRICES", url: "/historical-prices" },
  // { label: "DATA SOLUTIONS", url: "/data-solutions" },
  { label: "CONTACT US", url: "/contact-us" },
];

const dropdown = [
  { label: "Speed Tracker", url: "#speed-track", title: "speed-track", icon: <SpeedTracker color="" />, },
  { label: "News Feed", url: "#news-feed", title: "news-feed", icon: <NewsFeed color="" /> },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isFullscreen } = useFullscreen();
  const searchParams = useSearchParams();
  const baseActive = searchParams.get("baseActive") || "speed-track";
  const { isActiveButton, setIsActiveButton } = useActiveButton();

  useEffect(() => {
    setIsActiveButton(baseActive);
  }, [baseActive]);

  const handleButtonClick = (buttonName: string) => {
    setIsActiveButton(buttonName);
    // router.push(`/?baseActive=${buttonName}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    return pathname === path
      ? "!text-secondary lg:!text-primary"
      : "text-secondary";
  };

  const handleDropdownClick = (item: any) => {
    setActiveDropdown(item);
    setIsDropdownOpen(false);
    handleButtonClick(item.title);
    router.push(`/?baseActive=${item.url}`);
  };

  return (
    <div className={`w-full bg-bg xl:py-0 sm:py-5 py-3 ${isFullscreen ? "hidden" : "block"}`}>
      {/* <Dashboard className={"opacity-0 absolute -z-50"} /> */}
      <nav className="xl:px-32 lg:px-16 md:px-20 px-5 flex justify-center mx-auto items-center relative top-0 w-full z-20">
        <div className="flex justify-between items-center flex-shrink-0 w-full">
          <Link href="/" className="xl:hidden block">
            <Image src={logo} alt="logo" className="hover:scale-105 duration-300 transition-all w-20" />
          </Link>
          <div className="xl:flex items-center hidden 2xl:gap-16 xl:gap-10 gap-8 text-base lg:text-lg font-medium">
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                className="hover:scale-105 duration-300 transition-all w-28 mt-2"
              />
            </Link>
            <div
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              className="relative group py-7"
            >
              <Link href={"/"} onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 text-sm xxl:text-base ${pathname === "/" ? "text-primary" : "text-secondary"}`}>
                VIX TERM MONTHS
                <DownArrow color={pathname === "/" ? "#00FEB5" : "#D4D4D4"} className={"w-6 h-6 transition-all duration-500 group-hover:rotate-180"} />
              </Link>
              {isDropdownOpen && (
                <div ref={dropdownRef}
                  className="bg-bg p-4 py-5 border-t-[0.4rem] border-t-primary rounded-b-xl w-44 flex flex-col gap-4 px-5 absolute top-[5rem] -left-[1.30rem]">
                  {dropdown.map((item, i) => (
                    <button key={i} onClick={() => handleDropdownClick(item)}
                      className={`flex gap-2 text-base hover:text-primary ${item === activeDropdown ? "text-primary" : "text-secondary"}`}>
                      {/* {React.cloneElement(item.icon, { color: item === activeDropdown ? "#00FEB5" : "#D4D4D4" })} */}
                      <p>{item.label}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {menuItems.map((item) => (
              <Link key={item.label} href={item.url}
                className={`hover:scale-105 hover:text-primary duration-300 transition-all text-sm xxl:text-base font-medium ${isActive(item.url)}`}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-row gap-x-4">
            <div className="sm:flex hidden bg-gradient-to-b from-[#00FEB5] to-[#78CEF4] rounded-xl p-[1px] group">
              <Link href={"/data-solutions"}
                className={`flex flex-row gap-x-4 px-4 text-primary text-sm xxl:text-base font-semibold py-2 justify-center items-center rounded-xl bg-bg w-full
                  ${pathname === "/data-solutions"
                    ? "bg-gradient-to-b from-[#00FEB5] to-[#78CEF4] !text-darkBg pointer-events-none"
                    : "group-hover:text-primary group-hover:bg-gradient-to-b group-hover:from-[#00FEB51F] group-hover:to-[#78CEF41F]"
                  }`}>
                DATA SOLUTIONS
                {pathname === "/data-solutions" ? (
                  <HoverDashboard className={""} />
                ) : (
                  <Dashboard className={""} />
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className="bg-bg absolute left-0 sm:top-20 top-16 w-full lg:px-[3.8rem] md:px-[4.8rem] px-10 z-20 py-10 transition-all duration-300 block xl:hidden">
          <div className="flex flex-col justify-center gap-2">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 ${pathname === "/" ? "text-primary" : "text-secondary"
                  }`}
              >
                VIX Term Months
                <DownArrow
                  color={pathname === "/" ? "#00FEB5" : ""}
                  className={""}
                />
              </button>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="bg-darkBg p-4 rounded-2xl flex flex-col gap-4 px-5 absolute mt-2 w-full top-8 -left-2"
                >
                  {dropdown.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleDropdownClick(item)}
                      className={`flex items-center gap-2 text-sm ${item === activeDropdown
                        ? "text-primary"
                        : "text-secondary"
                        }`}
                    >
                      {React.cloneElement(item.icon, {
                        color: item === activeDropdown ? "#00FEB5" : "#D4D4D4",
                      })}
                      <p>{item.label}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                onClick={() => setIsModalOpen(false)}
                className={`hover:scale-105 my-1 text-white duration-300 transition-all text-base font-medium ${isActive(
                  item.url
                )}`}
              >
                {item.label}
              </Link>
            ))}

            {pathname !== "/data-solutions" && (
              <div className="sm:hidden flex bg-gradient-to-b from-[#00FEB5] to-[#78CEF4] rounded-xl p-[1px] group w-fit mt-2">
                <Link
                  href={"/data-solutions"}
                  className={`flex flex-row gap-x-4 px-4 text-primary text-base font-semibold py-2.5 justify-center items-center rounded-xl bg-bg w-full`}
                >
                  DATA SOLUTIONS
                  <Dashboard className={""} />
                </Link>
              </div>
            )}

            {pathname === "/data-solutions" && (
              <Link
                href={"/"}
                className={`sm:hidden flex flex-row mt-2 gap-x-4 px-4 text-secondary border border-secondary hover:bg-secondary/10 w-fit text-base font-semibold 
                py-2.5 justify-center items-center rounded-xl bg-bg`}
              >
                <HomeIcon />
                Home
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;