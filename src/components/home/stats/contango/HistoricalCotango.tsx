import React, { useEffect, useState } from "react";
import StatHeading from "../statHeading";
import StatItem from "../statItem";
import { getContangoStats } from "@/actions/contango";
import { useTheme } from "next-themes";
import { REVALIDATE_TIME } from "@/constants";
import { HistoricalData } from "@/actions/historical";

type Props = {
    clearAll: Boolean;
    datesSelected: any
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

const HistoricalCotango: React.FC<Props> = ({ clearAll, datesSelected }) => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [firstLoad, setFirstLoad] = useState(true);


    const getNextMonths = (currentMonth: string, data: any): string[] => {
        const months: string[] = [];

        console.log("curent month:",currentMonth)

        const countData = Object.keys(data?.cotango).length;
        // Check if current_month is provided and valid, otherwise use the current date

        const originalValues = Object.values(data?.cotango);

        // Default to the current month if currentMonth is not provided
        const currentYear = new Date().getFullYear();
        let startingDate = currentMonth
            ? new Date(`${currentYear}-${currentMonth}-01`) // Use provided currentMonth
            : new Date(); // Default to current date if no currentMonth is provided

        // Loop through the cotango data to generate the next months
        for (let i = 0; i < originalValues?.length; i++) {
            // Create a new Date object for each subsequent month
            const date = new Date(startingDate.getFullYear(), startingDate.getMonth() + i);
            const monthName = date.toLocaleString("default", { month: "short" }); // Get short month name
            months.push(monthName);
        }

        return months;
    };





    const transformData = (data: any, currentMonth: any,firstDateKey:any) => {
        const transformed: TransformedData[] = [];

        console.log(data)
        
        // Get all keys of cotango and difference (check for existence before using them)
        const cotangoKeys = data?.contango ? Object.keys(data.contango) : [];
        const differenceKeys = data?.difference ? Object.keys(data.difference) : [];
    
        // Get the labels (months)
        const labels = getNextMonths(currentMonth, data);
        const lebels = ['1','2','3','4']
    
        // Ensure there are enough labels to match the cotangoKeys
        const keysLength = Math.min(cotangoKeys.length);
    
        // Loop through the keys of cotango and difference
        for (let i = 0; i < keysLength; i++) {
            transformed.push({
                label: lebels[i],  // Use the corresponding label
                contango: `${(parseFloat(data.contango[cotangoKeys[i]]) * 100).toFixed(2)}%`,  // Multiply by 100 to convert to percentage
                difference: parseFloat(data.difference[differenceKeys[i]]).toFixed(2),  // Difference value
            });
        }
    
        return transformed;
    };
    


    const getContangoStatsData = async () => {
        setLoading(true);
        const lastSelectedDate = datesSelected[datesSelected.length - 1];
    
        // Fetch the data using your API function
        const { data, error } = await HistoricalData(lastSelectedDate);
    
        if (error) {
            setError(error);
            setLoading(false);
        } else {
            // Get the first date key from the response (e.g., "2007-03-26")
            const firstDateKey = Object.keys(data)[0];
    
            // Access the data for the first date (the contango and difference for that date)
            const dateData = data[firstDateKey];
    
            // Extract the current month from the first date
            const currentMonth = firstDateKey.split("-")[1]; // Get the month part (MM) from the date "yyyy-mm-dd"
    
            // Transform the data using the updated transformData function
            const transformedData = transformData(dateData, currentMonth,firstDateKey);  // Pass current month and dateData to the function
    
            // Set the transformed data to the stats state
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

export default HistoricalCotango;
