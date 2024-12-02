"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { format, isWeekend, subDays } from "date-fns";
import { Asap_Condensed } from "next/font/google";
// import * as ReactDOMServer from "react-dom/server";
import { indicatorsBtnsData } from "../../home/chart/indicators/data";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartEvent,
  ActiveElement,
  Plugin,
  Chart,
} from "chart.js";
import { useTheme } from "next-themes";
import Section from "@/components/shared/common/section";
import IndicatorBtn from "@/components/shared/common/indicatorBtn";
import { VixIndex } from "@/svgs/indicatorSvg";
import ChartDataLabels from "chartjs-plugin-datalabels";
import CalenderModal from "./bottomBar";
import BottomBar from "./bottomBar";
import Indicators from "./indicators";
import { colorArray } from "./indicators/colors";
import { allSVGS } from "./indicators/allSvgs";
import HistoricalPriceTable from "./table/historicalPriceTable";
import { useFullscreen } from "@/context/FullScreenContext";
import { HistoricalData } from "@/actions/historical";
import Link from "next/link";
import { svgsDark, svgsLight } from "@/components/home/chart/svgsData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface HeaderProps {
  activeTable: boolean;
  fullScreen: boolean;
  dateToggle: "one" | "multiple";
  setDatesSelected: any;

  setDownloadData: any;
}

interface IndicatorData {
  [key: string]: number[];
}

type Colors = string[];

const asap_Condensed = Asap_Condensed({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// Adjust initial date to ensure it's not a weekend
const getInitialDate = () => {
  let date = new Date();
  while (isWeekend(date)) {
    date = subDays(date, 1);
  }
  return date;
};

const Charts: React.FC<HeaderProps> = ({
  activeTable,
  fullScreen,
  setDatesSelected,
  dateToggle,

  setDownloadData,
}) => {
  const { isFullscreen, setIsFullscreen } = useFullscreen();
  const { theme } = useTheme();
  const chartRef = useRef<Chart<"line">>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date(2007, 2, 26)]); // March 26, 2007
  const [activeIndicators, setActiveIndicators] = useState<string[]>([
    format(new Date(2007, 2, 26), "MMMM d, yyyy"),
  ]);
  const [hoveredBtn, setHoveredBtn] = useState<any>("");

  const [historicalData, setHistoricalData] = useState<any>([]);
  const [indicatorDataToPass, setIndicatorDataToPass] = useState<any>([]);
  const [hoveredPoint, setHoveredPoint] = useState<{
    datasetIndex: number;
    index: number;
  } | null>(null);


  const handleHover = (event: ChartEvent, chartElement: ActiveElement[]) => {
    if (event.type === "mousemove") {
      if (chartElement.length > 0) {
        const element = chartElement[0];
        const datasetIndex = element.datasetIndex;
        const pointIndex = element.index;
        setHoveredPoint({ datasetIndex, index: pointIndex });
        const hoveredLineLabel =
          chartRef.current?.data.datasets[datasetIndex].label;
      } else {
        setHoveredPoint(null);
      }
    }
  };

  const handleLeave = () => {
    setHoveredPoint(null);
  };

  const dates = ["2024-04-15", "2024-04-16", "2024-04-17"].map(
    (date) => new Date(date)
  );

  const toggleIndicator = (indicator: string) => {
    setActiveIndicators((prev) =>
      prev.includes(indicator)
        ? prev.filter((item) => item !== indicator)
        : [...prev, indicator]
    );
  };

  useEffect(() => {
    if (dateToggle === "one") {
      setSelectedDates((prev) => [prev[prev.length - 1]]);
      setActiveIndicators((prev) => [prev[prev.length - 1]]);
    }
  }, [dateToggle]);

  const handleSelectedDate = (date: Date) => {
    if (dateToggle === "one") {
      setSelectedDates([date]);
      setActiveIndicators([format(date, "MMMM d, yyyy")]);
      setDatesSelected([date])
    } else if (dateToggle === "multiple") {
      setSelectedDates((prev) => [...prev, date]);
      setDatesSelected((prev: any) => [...prev, date])

      setActiveIndicators((prev) => {
        const formattedDate = format(date, "MMMM d, yyyy");
        return prev.includes(formattedDate)
          ? prev.filter((item) => item !== formattedDate)
          : [...prev, formattedDate];
      });
    }
  };

  useEffect(() => {
    if (selectedDates.length === 0) return;

    const getHistoricalData = async () => {
      const lastSelectedDate = selectedDates[selectedDates.length - 1];
      try {
        // console.log(lastSelectedDate)
        const { data, error } = await HistoricalData(lastSelectedDate);
        console.log("data:", data)
        if (error) {
          console.error("Error fetching historical data:", error);
        } else {
          setHistoricalData((prevData: any) => ({
            ...prevData,
            ...data,
          }));
        }
      } catch (error) {
        console.error("Error in getHistoricalData function:", error);
      }
    };

    getHistoricalData();
  }, [selectedDates]);

  useEffect(() => {
    if (!historicalData) {
      return;
    }

    const formatDate = (date: Date): string => {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    };

    // const newIndicatorData: IndicatorData = selectedDates.reduce(
    //   (acc: IndicatorData, date: Date) => {
    //     const dateKey = date.toISOString().split("T")[0];
    //     const formattedDate = formatDate(date);

    //     const dateData = (historicalData as any)[dateKey];

    //     if (dateData && dateData.vix_latest_data) {
    //       const latestDataArray: number[] = dateData.vix_latest_data
    //         .slice(0, 8)
    //         .map((item: any) => item.last_price || 0);

    //       acc[formattedDate] = latestDataArray;
    //     } else {
    //       acc[formattedDate] = [];
    //     }

    //     return acc;
    //   },
    //   {} as IndicatorData
    // );

    const newIndicatorData: IndicatorData = selectedDates.reduce(
      (acc: IndicatorData, date: Date | null) => {
        if (!date || isNaN(new Date(date).getTime())) {
          // Skip invalid or null dates
          return acc;
        }

        const dateKey = new Date(date).toLocaleDateString("en-CA");
        const formattedDate = formatDate(new Date(date));
        const dateData = historicalData?.[dateKey];

        if (dateData && dateData.graph_data) {
          const graphData = dateData.graph_data;
          const latestDataArray: number[] = Object.keys(graphData.y_axis || {}).map(
            (key) => graphData.y_axis[key] || 0
          );
          acc[formattedDate] = latestDataArray;
        } else {
          acc[formattedDate] = []; // Fallback to empty array if no data exists
        }

        return acc;
      },
      {} as IndicatorData
    );



    setIndicatorDataToPass(newIndicatorData);
  }, [historicalData, selectedDates]);

  const indicatorData: IndicatorData = indicatorDataToPass;

  const getOrCreateTooltip = (chart: any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector(".chartjs-tooltip");
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.className = "chartjs-tooltip";
      tooltipEl.style.opacity = 0;
      tooltipEl.style.position = "absolute";
      tooltipEl.style.background = "#282C2F";
      tooltipEl.style.borderRadius = "8px";
      tooltipEl.style.color = "white";
      tooltipEl.style.padding = "10px";
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.transition = "opacity 0.3s";

      const table = document.createElement("table");
      table.style.margin = "0px";

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }
    return tooltipEl;
  };

  const externalTooltipHandler = (context: any) => {
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    const tableRoot = tooltipEl.querySelector("table");
    while (tableRoot.firstChild) {
      tableRoot.removeChild(tableRoot.firstChild);
    }

    if (tooltip.body) {
      const tableBody = document.createElement("tbody");

      const label = tooltip.dataPoints[0].dataset.label;
      const tooltipData = [
        {
          "April 16, 2024": 34.71,
          Contract: "Aug",
          "Days to expiration": 124,
        },
      ];

      const currentTooltipData = tooltipData[0];

      Object.entries(currentTooltipData).forEach(([key, value]) => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.innerHTML = `<span style="color:#979F9D; padding-right: 4px">${key}:</span> ${value}`;
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      tableRoot.appendChild(tableBody);
    }

    // Position the tooltip in the center of the hovered point (icon)
    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
    const point = tooltip.dataPoints[0].element; // Get the hovered point element

    // Center the tooltip on the hovered point (icon)
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + point.x - tooltipEl.offsetWidth / 2 + "px";
    tooltipEl.style.top = positionY + point.y - tooltipEl.offsetHeight - 21 + "px";
    tooltipEl.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
    tooltipEl.style.background = theme === "dark" ? "#282C2F" : "#F5F5F5";
    tooltipEl.style.color = theme === "dark" ? "white" : "#000000";
    tooltipEl.style.minWidth = "170px";
    tooltipEl.style.zIndex = "100";

    // Add small arrow at the bottom
    if (!tooltipEl.querySelector(".tooltip-arrow")) {
      const arrow = document.createElement("div");
      arrow.className = "tooltip-arrow";
      arrow.style.position = "absolute";
      arrow.style.width = "0";
      arrow.style.height = "0";
      arrow.style.borderLeft = "15px solid transparent";
      arrow.style.borderRight = "15px solid transparent";
      arrow.style.borderTop = "15px solid " + (theme === "dark" ? "#282C2F" : "#F5F5F5");
      arrow.style.bottom = "-12px";
      arrow.style.left = "calc(50% - 15px)";
      tooltipEl.appendChild(arrow);
    }
  };

  const getColor = (index: number): string => {
    // Use modulo to cycle through SVGs
    return colorArray[index % colorArray.length];
  };
  const svgs = indicatorsBtnsData.map((btn) => btn.Svg);

  const getSvg = (index: number) => {
    // Use modulo to cycle through SVGs
    return svgs[index % svgs.length];
  };

  const dateObjects =
    selectedDates && selectedDates.length > 0
      ? selectedDates
        .filter((date) => date && !isNaN(new Date(date).getTime())) // Filter out invalid dates
        .map((date, index) => ({
          color: getColor(index),
          Svg: getSvg(index),
          text: format(new Date(date), "MMMM d, yyyy"), // Format valid dates
        }))
      : [{ color: "#ccc", Svg: '', text: "No dates selected" }];



  const colorMap: { [key: string]: string } = dateObjects.reduce((acc, obj) => {
    acc[obj.text] = obj.color;
    return acc;
  }, {} as { [key: string]: string });

  const svgMap: { [key: string]: any } = dateObjects.reduce((acc, obj) => {
    acc[obj.text] = obj.Svg;
    return acc;
  }, {} as { [key: string]: any });


  // Extract the x_axis data correctly from the historicalData for the latest selected date
  // const latestDate = selectedDates && selectedDates.length > 0 
  // ? selectedDates
  // .filter((date) => date && !isNaN(new Date(date).getTime()))
  // .slice(-1)[0]
  // .toISOString().split("T")[0]: null;

  const latestDate =
    selectedDates && selectedDates.length > 0
      ? selectedDates
        .filter((date) => date && !isNaN(new Date(date).getTime())) // Filter out invalid dates
        .slice(-1)[0] // Get the last valid date
        ?.toLocaleDateString("en-CA") // Format the date as ISO 8601 (yyyy-MM-dd)
      : null;

  console.log("latest date:", latestDate)
  console.log("histrical date:", historicalData)
  const graphData = latestDate && historicalData?.[latestDate]?.graph_data;

  if (!graphData) {
    console.log("No data available for the selected date");
    // Optionally, you can set empty data or a default value if needed
    // return;
  }

  // Calculate the number of entries in the x_axis and determine the max value for the labels
  const numEntries = Object.keys(graphData?.x_axis || {}).length || 0;

  // Create labels dynamically with intervals of 30 days
  const labels = Array.from({ length: numEntries + 1 }, (_, i) => i * 30);

  console.log("selected dates:", selectedDates)

  const data = {
    labels,
    datasets:
      activeIndicators.length > 0
        ? activeIndicators
          .filter((date) => date && !isNaN(new Date(date).getTime())) // Filter out invalid dates
          .map((date, i: number) => {
            // Ensure the date is properly formatted
            const formattedDate = format(new Date(date), "MMMM d, yyyy");
            // Get the data for the specific date
            const dataForDate = indicatorData[formattedDate] || []; // Fallback to an empty array if no data found

            return {
              label: formattedDate, // Use the formatted date for labeling
              data: dataForDate,
              pointStyle: allSVGS[i] || "circle", // Fallback to a default point style
              backgroundColor: theme === "dark" ? "#282C2F" : "#fff",
              fill: false,
              borderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 4,
              pointBorderColor: colorMap[formattedDate] || "#ccc", // Fallback color
              pointHoverBackgroundColor: colorMap[formattedDate] || "#ccc", // Fallback color
              borderColor: colorMap[formattedDate] || "#ccc", // Fallback border color
            };
          })
        : [
          {
            label: "No data available", // Default label when no data is available
            data: [], // Empty data
            pointStyle: "circle", // Default point style
            backgroundColor: "#f0f0f0", // Light gray background
            fill: false,
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderColor: "#ccc", // Default border color
            pointHoverBackgroundColor: "#ccc", // Default hover color
            borderColor: "#ccc", // Default border color
          },
        ],
  };



  const verticalBarPlugin: Plugin = {
    id: "verticalBars",
    beforeDraw: (chart) => {
      const {
        ctx,
        chartArea: { left, right, top, bottom },
      } = chart;
      ctx.save();

      const barWidth = (right - left) / 8;
      for (let i = 0; i < 4; i++) {
        const barX = left + (i * 2 + 1) * barWidth;
        const gradient = ctx.createLinearGradient(0, top, 0, bottom);
        gradient.addColorStop(0, "rgba(0, 93, 84, 0.2)");
        gradient.addColorStop(0.7, "rgba(0, 93, 84, 0.4)");
        gradient.addColorStop(1, "rgba(0, 93, 84, 0.5)");
        ctx.fillStyle = gradient;
        ctx.fillRect(barX, top, barWidth, bottom - top);
      }

      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "right" as const,
      },
      title: {
        display: false,
        text: "Historical Price",
      },
      tooltip: {
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
      },
      verticalBars: {},
      datalabels: {
        display: (context: any) => {
          const datasetIndex = context.datasetIndex;
          const dataIndex = context.dataIndex;
          const isHoveredPoint =
            hoveredPoint &&
            hoveredPoint.datasetIndex === datasetIndex &&
            hoveredPoint.index === dataIndex;

          if (isHoveredPoint) {
            return false;
          }
          return datasetIndex === activeIndicators.length - 1;
        },
        color: theme === "dark" ? "#D4D4D4" : "#282C2F",
        anchor: "end",
        align: "top",
        font: {
          size: 12,
          family: asap_Condensed.style.fontFamily,
        },
        formatter: (value: number) => value.toFixed(3),
        backgroundColor: theme === "dark" ? "#282C2F" : "#FFFFFF",
        borderRadius: 4,
        padding: 8,
      },
    },

    scales: {
      y: {
        title: {
          display: true,
          text: "Volatility Price",
          font: {
            size: 20,
            family: asap_Condensed.style.fontFamily,
          },
          padding: {
            top: 20,
          },
          color: theme === "dark" ? "#979F9D" : "#555555",
        },
        ticks: {
          maxTicksLimit: 6,  // Set a minimum of 6 labels
          color: theme === "dark" ? "#D4D4D4" : "#555555",
          padding: 20,
          font: {
            size: 16,
            family: asap_Condensed.style.fontFamily,
          },
        },
        grid: {
          display: true,
          color: theme === "dark" ? "#495056" : "#D0D0D0",
        },
        border: {
          display: false,
        },
      },
      x: {
        offset: true,
        title: {
          display: true,
          text: "Days to expiration",
          font: {
            size: 20,
            family: asap_Condensed.style.fontFamily,
          },
          padding: {
            top: 8,
          },
          color: theme === "dark" ? "#979F9D" : "#555555",
        },
        ticks: {
          color: theme === "dark" ? "#D4D4D4" : "#555555",
          padding: 20,
          font: {
            size: 16,
            family: asap_Condensed.style.fontFamily,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
    onHover: handleHover,
    onLeave: handleLeave,
  };

  // const handleDateChange = (direction: string) => {
  //   if (direction === "prev" && dateIndex > 0) {
  //     setSelectedDate(dates[dateIndex - 1]);
  //   } else if (direction === "next" && dateIndex < dates.length - 1) {
  //     setSelectedDate(dates[dateIndex + 1]);
  //   }
  // };

  return (
    <Section>
      <div
        className={`w-full h-full flex justify-between relative items-stretch flex-wrap-reverse dark:bg-lightDark bg-lightbg 
          lg:p-2 rounded-2xl inner-shadow border-2 dark:border-[#3C4045] border-lightBorder`}
      >

        <div
          className={`w-full px-4 flex-grow relative ${isFullscreen ? "lg:w-full" : "lg:w-4/5"
            } flex flex-col`}
        >
          <div className="w-full flex flex-col relative min-h-96 h-full md:overflow-x-visible overflow-x-auto pt-8">
            <div className="w-full min-w-[40rem] min-h-[34rem] flex-grow relative">
              <Line
                data={data}
                options={options as any}
                plugins={[verticalBarPlugin]}
              />
              <div className="relative">
                <Link
                  href="/www.vixspike.com"
                  className="absolute bottom-0.5 right-8 dark:text-[#78817F] text-[#969696]"
                >
                  www.vixspike.com
                </Link>
              </div>
            </div>

            <div className={`w-full lg:px-4 flex flex-col`}>
              <BottomBar
                selectedDate={selectedDates[selectedDates.length - 1]}
                handleSelectedDate={handleSelectedDate}
                setSelectedDates={setSelectedDates}
                handleGetPrices={() => { }}
              />

              {activeTable && (
                <HistoricalPriceTable
                // indicatorData={indicatorData}
                // activeIndicators={activeIndicators}
                // next7Months={next7Months}
                />
              )}
            </div>
          </div>
        </div>

        <div
          className={`mr-2 py-4  ${isFullscreen
            ? `${dateToggle === "one" ? "sm:w-1/2" : "w-full"}`
            : "lg:w-[18%]"
            } ${dateToggle === "one" ? "lg:w-60 w-full" : " flex-row"
            } flex justify-start flex-col`}
        >
          {dateToggle === "one" ? (
            <IndicatorBtn
              //@ts-ignore
              color={
                selectedDates.length > 0 &&
                  selectedDates[0] &&
                  !isNaN(new Date(selectedDates[0]).getTime()) ?
                  colorMap[format(new Date(selectedDates[0]), "MMMM d, yyyy")] :
                  undefined // Fallback to undefined if invalid
              }
              Svg={VixIndex}
              //@ts-ignore
              text={
                selectedDates.length > 0 &&
                  selectedDates[0] &&
                  !isNaN(new Date(selectedDates[0]).getTime()) ?
                  format(new Date(selectedDates[0]), "MMMM d, yyyy") :
                  "No date selected" // Fallback text
              }
              isActive={true}
              setHoveredBtn={(text: string | null) => { }}
            />

          ) : (
            <Indicators
              activeIndicators={activeIndicators}
              selectedDates={
                selectedDates.length > 15
                  ? selectedDates.slice(0, 15)
                  : selectedDates
              }

              setActiveIndicators={setActiveIndicators}
              toggleIndicator={toggleIndicator}
              setHoveredBtn={setHoveredBtn}
              fullScreen={isFullscreen}
              setSelectedDates={setSelectedDates}
              colorMap={colorMap}
              svgMap={svgMap}
            />
          )}
        </div>

      </div>
    </Section>
  );
};

export default Charts;
