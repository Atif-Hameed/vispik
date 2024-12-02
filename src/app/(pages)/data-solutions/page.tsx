"use client";
import React, { Suspense } from "react";
import HisotricalData from "@/components/DataSolutions/HisotricalData";
import Section from "@/components/shared/common/section";
import { useTheme } from "next-themes";

type Props = {};

const Page = (props: Props) => {

  const { theme } = useTheme();

  return (
    <Suspense>
      <Section>
        <div className="pt-10 relative">
          <div className="flex flex-col items-center justify-center relative">
            <h1 className="md:text-[2.25rem] text-4xl text-center font-semibold bg-gradient-to-l from-[#00FEB5] to-[#78CEF4] bg-clip-text text-transparent">
              VOLATILITY DATA MADE EASY
            </h1>
            <p className="dark:text-[#C5C5C5] text-[#707070] tracking-wide lg:text-sm xl:text-bases text-base text-center pt-3 xl:w-[38%] lg:w-1/2 sm:w-3/5 w-4/5 self-center">
              Empower your trading with VIXSpike—a unique and comprehensive
              collection of volatility data at a fraction of the cost.
            </p>
          </div>
        </div>
      </Section>
      <div className={`mt-10 relative bg-white dark:bg-transparent`}>
        <HisotricalData />
      </div>
    </Suspense>
  );
};

export default Page;