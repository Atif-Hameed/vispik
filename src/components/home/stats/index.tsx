import Section from "@/components/shared/common/section";
import React from "react";
import Differnce from "./difference";
import Contango from "./contango";

type Props = {
  clearAll: Boolean
};

const Stats: React.FC<Props> = ({ clearAll }) => {
  return (
    <Section>
      <div className="border space-y-5 dark:border-border border-lightBorder rounded-xl p-4 mt-10">
        <Contango clearAll={clearAll} />
        <Differnce clearAll={clearAll} />
      </div>
      <div>
        <p className="text-[#707070] dark:text-[#C5C5C5] text-sm xxl:text-base pt-2 pb-6">The quote data refreshes automatically every minute.</p>
      </div>
    </Section>
  );
};

export default Stats;