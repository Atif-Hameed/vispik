import React, { useEffect, useState } from "react";
import StatHeading from "../statHeading";
import StatItem from "../statItem";
import { getContangoStats } from "@/actions/contango";
import { useTheme } from "next-themes";
import { REVALIDATE_TIME } from "@/constants";

type Props = {
  clearAll: Boolean;
};

interface statProps {
  label: string;
  contango: string;
}

interface TransformedData {
  label: string;
  contango: string;
  difference: string;
}

export const LoaderIcon = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-6 h-6 text-gray-500 animate-spin fill-secondary"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

const Contango: React.FC<Props> = ({ clearAll }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [firstLoad, setFirstLoad] = useState(true);

  const getMonthLabels = () => {
    const currentMonthIndex = new Date().getMonth();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const labels = [];
    for (let i = 0; i < 12; i++) {
      labels.push(monthNames[(currentMonthIndex + i) % 12]);
    }
    return labels;
  };

  // const getNext7Months = (current_month: string): string[] => {
  //   const months = [];

  //   // total entries
  //   //@ts-ignore
  //   const totalEntries = vixValueData?.vix_latest_data?.length;

  //   // Check if current_month is provided and valid, otherwise use the current date

  //   let startingDate = new Date();
  //   //@ts-ignore
  //   if (current_month) {
  //     // Attempt to create a date from a month name by adding a default year and using the first day of the month
  //     const currentYear = new Date().getFullYear(); // Using the current year or any other logic
  //     startingDate = new Date(
  //       //@ts-ignore
  //       `${currentYear}-${current_month}-01`
  //     );
  //   }

  //   for (let i = 0; i < 7; i++) {
  //     // Creating a new Date object for each month
  //     const date = new Date(
  //       startingDate.getFullYear(),
  //       startingDate.getMonth() + i
  //     );
  //     const monthName = date.toLocaleString("default", { month: "short" });
  //     months.push(monthName);
  //   }
  //   return months;
  // };


  const getNextMonths = (current_month: string, data: any): string[] => {
    const months = [];

    const countData = Object.keys(data?.cotango).length;
    console.log("count:", countData)
    // Check if current_month is provided and valid, otherwise use the current date


    // Get the values of the cotango object and skip the first field
    const originalValues = Object.values(data?.cotango).slice(0, countData);

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

    for (let i = 0; i < originalValues?.length; i++) {
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




  const transformData = (data: any) => {
    const transformed: TransformedData[] = [];

    // Get the keys of cotango and difference
    const cotangoKeys = Object.keys(data.cotango).slice(0);
    const differenceKeys = Object.keys(data.difference).slice(0);

    // Get the labels (months), skipping the first month
    const labels = getNextMonths(data.current_month, data);

    cotangoKeys.forEach((key, index) => {
      // Check if it's the last element
      if (index === cotangoKeys.length - 1) {
        // For the last element, only push the label
        transformed.push({
          label: labels[index],
          //@ts-ignore
          contango: undefined, // or you can remove this property if you prefer
          //@ts-ignore
          difference: undefined, // or remove this property as well
        });
      } else {
        // For all other elements, include contango and difference
        transformed.push({
          label: labels[index],  // Use the corresponding label
          contango: `${(parseFloat(data.cotango[key]) * 100).toFixed(2)}%`,
          difference: parseFloat(data.difference[key]).toFixed(2),
        });
      }
    });

    return transformed;
  };


  const getContangoStatsData = async () => {
    setLoading(true);
    const { data, error } = await getContangoStats();
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      const transformedData = transformData(data);
      //@ts-ignore
      setStats(transformedData);
      setLoading(false);
      if (firstLoad) {
        setFirstLoad(false);
      }
    }
  };

  useEffect(() => {
    getContangoStatsData();

    const intervalId = setInterval(() => {
      getContangoStatsData();
    }, REVALIDATE_TIME);

    // Cleanup the interval
    return () => clearInterval(intervalId);
  }, []);

  const { theme } = useTheme();

  // If clearAll is true, pass null for contango values
  const displayedStats = clearAll
    //@ts-ignore
    ? stats.map(stat => ({ ...stat, contango: null }))
    : stats;

  return (
    <div className="w-full flex gap-4">
      <StatHeading title="% Contango" />
      {loading && firstLoad ? (
        <div className="flex items-center justify-center w-full">
          <LoaderIcon />
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div
          className={`flex overflow-x-auto w-full border dark:border-border border-lightBorder rounded ${theme === "dark" ? "customScrollbar" : "customScrollbarLight"
            }`}
        >
          {displayedStats.map((stat: statProps, index) => (
            <StatItem
              key={`${index}-cotango`}
              label={`${stat.label}`}
              value={stat.contango}
              isFirst={index === 0}
              isLast={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Contango;
