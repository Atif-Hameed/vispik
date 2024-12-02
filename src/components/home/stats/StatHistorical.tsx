import Section from "@/components/shared/common/section";
import React from "react";
import Differnce from "./difference";
import Contango from "./contango";
import HistoricalCotango from "./contango/HistoricalCotango";

type Props = {
  clearAll: Boolean
  datesSelected: any
};

const StatHistorical: React.FC<Props> = ({ clearAll, datesSelected }) => {
  return (
    <Section>
      <div className="border space-y-5 dark:border-border border-lightBorder rounded-xl p-4 mt-10">
        {/* <HistoricalCotango clearAll={clearAll} datesSelected={datesSelected} /> */}
        <Differnce clearAll={clearAll} />
      </div>
      <div>
        <p className="text-[#707070] dark:text-[#C5C5C5] text-sm xxl:text-base pt-2 pb-6">The quote data refreshes automatically every minute.</p>
      </div>
    </Section>
  );
};

export default StatHistorical;