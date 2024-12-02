"use client";
import React, { useState, useEffect } from "react";
import Form from "@/components/ContactUs/Form";
import { useTheme } from "next-themes";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const Page = () => {
  const { theme } = useTheme();
  const [darkAnimationData, setDarkAnimationData] = useState(null);
  const [lightAnimationData, setLightAnimationData] = useState(null);

  useEffect(() => {
    const fetchDarkAnimationData = async () => {
      try {
        const response = await fetch("/dark theme contact graphic.json");
        const data = await response.json();
        setDarkAnimationData(data);
      } catch (error) {
        console.error("Error loading dark animation data:", error);
      }
    };

    const fetchLightAnimationData = async () => {
      try {
        const response = await fetch("/Lightmode Contact Graphic.json");
        const data = await response.json();
        setLightAnimationData(data);
      } catch (error) {
        console.error("Error loading light animation data:", error);
      }
    };

    fetchDarkAnimationData();
    fetchLightAnimationData();
  }, []);

  return (
    <>
      <div className="xl:px-24 md:px-16 px-5 w-full sm:pt-24 pb-24 flex lg:flex-row-reverse flex-col-reverse relative overflow-hidden">
        <div className="w-80 h-80 rounded-full bg-primary/10 blur-[8rem] absolute -bottom-40 -right-40 dark:block hidden 2xl:block xl:hidden" />
        <div className="lg:w-1/2 z-10 flex justify-center">
          <div className="w-full flex flex-col items-center">
            {theme === "dark" && darkAnimationData ? (
              <Player autoplay loop src={darkAnimationData} className="responsive-player">
                <Controls visible={false} />
              </Player>
            ) : lightAnimationData ? (
              <Player autoplay loop src={lightAnimationData} className="responsive-player">
                <Controls visible={false} />
              </Player>
            ) : null}
            <h1 className="xxl:text-9xl lg:text-8xl md:text-7xl sm:text-6xl text-5xl font-semibold dark:text-secondary text-bg">
              Connect
            </h1>
            <div className="flex flex-row items-center gap-x-6">
              <div className="sm:w-60 w-32 dark:bg-secondary bg-[#B7B7B7] h-0.5" />
              <p className="xxl:text-5xl lg:text-4xl md:text-3xl text-2xl italic dark:text-primary text-[#00BF88]">
                with us
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 z-10 sm:pt-0 pt-10">
          <Form />
        </div>
      </div>
    </>
  );
};

export default Page;