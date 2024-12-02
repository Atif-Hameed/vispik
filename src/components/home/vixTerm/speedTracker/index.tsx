import { speedTracker } from "@/actions/speedTracker";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { REVALIDATE_TIME } from "@/constants";
import { getContangoStats } from "@/actions/contango";

interface ApiData {
  last_value: { label: string; value: string }[];
  daily_return: { label: string; value: string }[];
  vix_covariance: { label: string; value: string }[];
  snp_covariance: { label: string; value: string }[];
  speed_vs_vix_index: { label: string; value: string }[];
  speed_vs_vix_median: { label: string; value: string }[];
  speed_vs_vix_percentile: { label: string; value: string }[];
  reversion_intensity: { label: string; value: string }[];
  reversion_intensity_median: { label: string; value: string }[];
  reversion_intensity_percentile: { label: string; value: string }[];
  carry_intensity: { label: string; value: string }[];
  carry_median: { label: string; value: string }[];
  carry_percentile: { label: string; value: string }[];
  current_month: string;
  date?: string;
}

const SpeedTracker: React.FC = () => {
  const { theme } = useTheme();
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNext6Months = (current_month: string): string[] => {
    const months = [];

    // Check if current_month is provided and valid, otherwise use the current date

    let startingDate = new Date();
    //@ts-ignore
    if (current_month) {
      // Attempt to create a date from a month name by adding a default year and using the first day of the month
      const currentYear = new Date().getFullYear(); // Using the current year or any other logic
      startingDate = new Date(
        //@ts-ignore
        `${currentYear}-${current_month}-01`
      );
    }

    for (let i = 0; i < 6; i++) {
      // Creating a new Date object for each month
      const date = new Date(
        startingDate.getFullYear(),
        startingDate.getMonth() + i
      );
      const monthName = date.toLocaleString("default", { month: "short" });
      months.push(monthName);
    }
    return months;
  };

  const getDifferenceStatsData = async () => {
    setLoading(true);
    const { data, error } = await getContangoStats();
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      const labels = getNext6Months(data.current_month);

      //@ts-ignore
      setLabels(labels);
      setLoading(false);
    }
  };

  const getSpeedTrackerData = async () => {
    const { data, error } = await speedTracker();
    if (error) {
      setError(error);
    } else {
      console.log(data)
      setApiData(data);
    }
  };


  useEffect(() => {
    getDifferenceStatsData();
    getSpeedTrackerData();
    const intervalId = setInterval(() => {
      getDifferenceStatsData();
      getSpeedTrackerData();
    }, REVALIDATE_TIME);

    // Cleanup the interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className={`overflow-x-auto dark:bg-[#2d3237] border border-t-0 dark:border-[#30353A] border-white bg-white p-10 
        ${theme === "dark" && "dataSolutionShadow"} ${theme === "dark" ? "customScrollbar" : "customScrollbarLight"}`}>
      <table className="dark:bg-[#30353A] bg-lightGray min-w-full text-sm text-left dark:text-secondary text-black border-l-0 border-r-0 border dark:border-border border-lightBorder rounded">
        <thead className="text-lg font-medium dark:border-border border-lightBorder border-r">
          <tr className="border-b dark:border-border border-lightBorder">
            <th scope="col" className="">
              <span className="rounded px-6 py-4 -ml-1 dark:border-l-2 border-l dark:border-l-border border-lightBorder" />
            </th>
            <th
              scope="col"
              colSpan={7}
              className="px-6 py-2.5 text-center dark:text-primary text-lg font-medium text-bg border-l dark:border-border border-lightBorder tracking-wide"
            >
              Future Months
            </th>
          </tr>
          <tr className="b">
            <th scope="col" className="">
              <span className="rounded px-6 py-4 -ml-1 dark:border-l-2 border-l dark:border-l-border border-lightBorder" />
            </th>
            {labels.map((month) => (
              <th
                key={month}
                scope="col"
                className="px-6 py-2.5 text-base xxl:text-lg font-normal border-l text-center dark:border-border border-lightBorder"
              >
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {apiData && (
            <>
              <DataRow
                title="Volatility Price"
                values={apiData.last_value}
              />
              <br />
              <DataRow
                title="Speed (vs VIX Index)"
                values={apiData.speed_vs_vix_index}
              />
              <DataRow
                title="Speed (vs VIX Index) 5Y Median"
                values={apiData.speed_vs_vix_median}
              />
              <DataRow
                title="Speed (vs VIX Index) 5Y Percentile Rank"
                values={apiData.speed_vs_vix_percentile.map(item => ({
                  label: item.label,
                  //@ts-ignore
                  value: `${item.value * 100}%`
                }))}
                note="0% = Slowest / 100% = Fastest"
              />
              <br />
              <DataRow
                title="Reversion Intensity (vs SPX Index)"
                values={apiData.reversion_intensity}
              />
              <DataRow
                title="Reversion Intensity (vs SPX Index) 5Y Median"
                values={apiData.reversion_intensity_median}
              />
              <DataRow
                title="Reversion Intensity (vs SPX Index) 5Y Percentile Rank"
                values={apiData.reversion_intensity_percentile.map(item => ({
                  label: item.label,
                  //@ts-ignore
                  value: `${item.value * 100}%`
                }))}
                note="0% = Fastest / 100% = Slowest"
              />
              <br />
              <DataRow
                title="Carry Intensity"
                //@ts-ignore
                // values={apiData.carry_intensity}
                values={apiData.carry_intensity.map(item => ({
                  label: item.label,
                  //@ts-ignore
                  value: `${item.value * 100}%`
                }))}
              />
              <DataRow
                title="Carry Intensity 5Y Median"
                //@ts-ignore
                // values={apiData.carry_median}
                values={apiData.carry_median.map(item => ({
                  label: item.label,
                  //@ts-ignore
                  value: `${item.value * 100}%`
                }))}
              />
              <DataRow
                title="Carry Intensity 5Y Percentile Rank"
                // Append '%' to each value in carry_percentile
                values={apiData.carry_percentile.map(item => ({
                  label: item.label,
                  //@ts-ignore
                  value: `${item.value * 100}%`
                }))}
                note="0% = Slowest / 100% = Fastest"
              />

            </>
          )}
        </tbody>
      </table>
    </section>
  );
};

interface DataRowProps {
  title: string;
  values: { label: string; value: string }[];
  note?: string;
}

const DataRow: React.FC<DataRowProps> = ({ title, values, note }) => {

  // console.log("values:",values)

  // Titles that require percentage display
  const percentageTitles = [
    "Carry Intensity 5Y Median",
    "Carry Intensity 5Y Percentile Rank",
    "Carry Intensity",
    "Reversion Intensity (vs SPX Index) 5Y Percentile Rank",
    "Speed (vs VIX Index) 5Y Percentile Rank"
  ];

  return (
    <>
      <tr className="dark:bg-[#282d31] bg-lightGray divide-x-1 border-l-0 border dark:border-border border-lightBorder dark:divide-border divide-lightBorder text-black dark:text-secondary">
        <th
          scope="row"
          className="text-base xxl:text-lg font-medium border-t dark:border-t-border border-t-lightBorder border-b dark:border-b-border border-b-lightBorder whitespace-nowrap"
        >
          <span className="rounded -ml-1 px-6 py-3 border-l-2 dark:border-l-primary border-l-darkGreen flex flex-col">
            {title}
            {note && (
              <span className="text-sm text-[#8C9492] italic pt-2">{note}</span>
            )}
          </span>
        </th>

        {values?.map((item, index) => (
          <td
            key={index}
            className="px-6 py-3 text-sm xxl:text-base text-center border-b dark:border-b-border border-b-lightBorder"
          >
            {parseFloat(item.value).toFixed(2)}
            {percentageTitles.includes(title) ? "%" : ""}
          </td>
        ))}
      </tr>
    </>
  );
};

export default SpeedTracker;