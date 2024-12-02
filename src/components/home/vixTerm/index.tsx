"use client";
import React, { Suspense, useEffect } from "react";
import { useTheme } from "next-themes";
import Section from "@/components/shared/common/section";
import SpeedTracker from "./speedTracker";
import NewsFeed from "./newsFeed";
import { NewsF, SpeedTack, SpeedTacklight, SpeedTackLightUnActive, SpeedTackUnActive, } from "@/svgs";
import { useSearchParams } from "next/navigation";
import { useActiveButton } from "@/context/ActiveButtonContext";

const VixTerm = () => {
  const { theme } = useTheme();
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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Section>
        <div className="pt-8 relative pb-16">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 relative dark:border-b-0 border-b-2 border-b-darkGreen">
            <button
              onClick={() => handleButtonClick("speed-track")}
              id="speed-track"
              className={`group rounded-tr-xl rounded-tl-xl dark:bg-[#293034] overflow-hidden relative py-4 px-5 flex justify-center items-center gap-4 text-lg lg:text-xl xxl:text-2xl dark:font-medium font-bold 
                ${isActiveButton === "speed-track"
                  ? `dark:text-primary text-[#fff] dark:border-primary dark:bg-[#282f33] bg-darkGreen ${(theme as string) === "dark" ? "btnBg" : "lightBtnBg"
                  }`
                  : "dark:text-secondary text-darkGreen border-border dark:bg-lightDark bg-white hover:bg-gradient-to-l dark:from-[#3A4148] dark:to-[#3A4148] from-[#00BF88] to-[#8EC8F0] hover:text-[#fff]"
                }`}
            >
              {isActiveButton === "speed-track" && (
                <div className="top-0 left-0 h-1 w-full dark:bg-primary bg-darkGreen absolute blur-[1.4rem]" />
              )}
              <div className="dark:block hidden">
                {isActiveButton === "speed-track" ? (
                  <SpeedTack />
                ) : (
                  <SpeedTackUnActive />
                )}
              </div>
              <div className="dark:hidden block">
                {isActiveButton === "speed-track" ? (
                  <SpeedTacklight
                    className={"text-darkGreen group-hover:text-darkGreen"}
                  />
                ) : (
                  <SpeedTackLightUnActive
                    className={
                      "text-[#00BF88] group-hover:text-[#fff] fill-[#fff] group-hover:fill-darkGreen"
                    }
                  />
                )}
              </div>
              Speed Tracker
            </button>

            <button
              onClick={() => handleButtonClick("news-feed")}
              id='news-feed'
              className={`rounded-tr-xl rounded-tl-xl dark:bg-[#293034] relative overflow-hidden py-4 px-5 flex justify-center items-center gap-4 text-lg lg:text-xl xxl:text-2xl  dark:font-medium font-bold 
                                ${isActiveButton === "news-feed"
                  ? `dark:text-primary text-[#fff] border-primary  dark:bg-[#282f33] btnBg bg-darkGreen ${(theme as string) === "dark"
                    ? "btnBg"
                    : "lightBtnBg"
                  }`
                  : "dark:text-secondary text-darkGreen border-border dark:bg-lightDark bg-white hover:bg-gradient-to-l dark:from-[#3A4148] dark:to-[#3A4148] from-[#00BF88] to-[#8EC8F0] hover:text-[#fff]"
                }`}
            >
              {isActiveButton === "news-feed" && (
                <div className="top-0 left-0 h-1 w-full dark:bg-primary bg-darkGreen absolute blur-[1.4rem]" />
              )}
              <NewsF
                className={
                  isActiveButton === "news-feed"
                    ? "dark:fill-primary fill-secondary"
                    : "dark:fill-darkGreen fill-secondary"
                }
              />
              News Feed
            </button>
          </div>
          <div className="">
            {isActiveButton === "speed-track" && <SpeedTracker />}
            {isActiveButton === "news-feed" && <NewsFeed />}
          </div>
        </div>
      </Section>
    </Suspense>
  );
};

export default VixTerm;