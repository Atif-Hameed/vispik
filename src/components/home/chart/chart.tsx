"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Line } from "react-chartjs-2";
import Indicators from "./indicators";
import VolatilityTable from "./table";
import { useTheme } from "next-themes";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { darkColors, lightColors } from "./colorData";
import Link from "next/link";
import * as ReactDOMServer from "react-dom/server";
import { useFullscreen } from "@/context/FullScreenContext";
import { svgsDark, svgsLight } from "./svgsData";
import { Asap_Condensed } from "next/font/google";
import * as XLSX from "xlsx";
import { vixValue } from "@/actions/vixValue";
import { REVALIDATE_TIME } from "@/constants";
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
  Chart,
} from "chart.js";

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

const initialIndicators = ["VIX Index", "Last"];

interface HeaderProps {
  activeTable: boolean;
  fullScreen: boolean;
  setDownloadData: any;
  // toggleClearAll: any
  clearAll: any,
  setClearAll: any
}

interface IndicatorData {
  [key: string]: number[];
}

interface VixData {
  symbol: any;
  expiration(expiration: any): unknown;
  last_price: number;
  open: number;
  low: number;
  high: number;
  close: number;
}

interface IndicatorData {
  "VIX Index": number[];
  Last: number[];
  Open: number[];
  High: number[];
  Low: number[];
  "Previous Close": number[];
  "VIX1D Index": number[];
  "VIX9D Index": number[];
  "VIX3M Index": number[];
  "VIX6M Index": number[];
  HV10: number[];
  HV20: number[];
  HV30: number[];
}

const asap_Condensed = Asap_Condensed({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const Charts: React.FC<HeaderProps> = ({ activeTable, setDownloadData, clearAll, setClearAll }) => {
  const { isFullscreen } = useFullscreen();
  const chartRef = useRef<Chart<"line">>(null);
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkColors : lightColors;
  const [activeIndicators, setActiveIndicators] =
    useState<string[]>(initialIndicators);
  const [hoveredLine, setHoveredLine] = useState<any>("");
  const [hoveredBtn, setHoveredBtn] = useState<any>("");
  const [currentHovered, setCurrentHovered] = useState<any>("");
  const [currentHoveredValue, setCurrentHoveredValue] = useState<any>("");
  const [hoveredPoint, setHoveredPoint] = useState<{
    datasetIndex: number;
    index: number;
  } | null>(null);

  // Function to handle hover on the chart
  const handleHover = (event: ChartEvent, chartElement: ActiveElement[]) => {
    if (chartElement.length > 0) {
      const element = chartElement[0];
      const datasetIndex = element.datasetIndex;
      const pointIndex = element.index;

      // Set hovered point and line details
      setHoveredPoint({ datasetIndex, index: pointIndex });

      const hoveredLineLabel = chartRef.current?.data.datasets[datasetIndex].label;
      setHoveredLine(hoveredLineLabel);

      // Optional: Get hovered data labels
      const hoveredLabel =
        //@ts-ignore
        chartElement[0]?.element?.$datalabels[0]?.$context?.dataset?.label;
      setCurrentHovered(hoveredLabel);
      //@ts-ignore
      setCurrentHoveredValue(chartElement[0]?.element?.$context.raw);
    } else {
      // Reset hover state when no elements are hovered over
      handleLeave();
    }
  };

  // Function to handle mouse leaving the chart
  const handleLeave = () => {
    // Clear hover states
    setHoveredPoint(null);
    setHoveredLine(null);
  };

  // Function to handle when mouse is moved within chart area
  const handleMouseMove = (event: any) => {
    //@ts-ignore
    const chart = chartRef.current?.chartInstance;
    if (!chart) return;

    // Get elements under the mouse
    const elements = chart.getElementsAtEventForMode(event, 'y', { intersect: false }, true);

    // If no elements are found, reset the hover state
    if (!elements || elements.length === 0) {
      handleLeave();
    }
  };

  // UseEffect to add event listeners
  useEffect(() => {
    const canvas = chartRef.current?.canvas;

    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleLeave);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleLeave);
      }
    };
  }, []);



  const [vixValueData, setVixValueData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  let validEntries = 7;

  const getVixValueData = async () => {
    //@ts-ignore
    const { data, error } = await vixValue();

    if (error) {
      setError(error);
    } else {
      setVixValueData(data);
    }
  };

  useEffect(() => {
    getVixValueData();
    const intervalId = setInterval(() => {
      getVixValueData();
    }, REVALIDATE_TIME);

    // Cleanup the interval
    return () => clearInterval(intervalId);
  }, []);

  // const getNext7Months = (): string[] => {
  //   const months = [];

  //   // Check if current_month is provided and valid, otherwise use the current date

  //   let startingDate = new Date();
  //   //@ts-ignore
  //   if (vixValueData?.current_month) {
  //     // Attempt to create a date from a month name by adding a default year and using the first day of the month
  //     const currentYear = new Date().getFullYear(); // Using the current year or any other logic
  //     startingDate = new Date(
  //       //@ts-ignore
  //       `${currentYear}-${vixValueData.current_month}-01`
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


  const getNextMonths = (): string[] => {
    const months = [];

    // total entries
    //@ts-ignore
    const totalEntries = vixValueData?.vix_latest_data?.length;


    // skip first and last 6 entries
    //@ts-ignore
    const middleEntries = vixValueData?.vix_latest_data?.slice(1, totalEntries - 6);

    // symbols for months
    // const Symbols = ["VX/X4", "VX/Z4", "VX/F5", "VX/G5", "VX/H5", "VX/J5", "VX/K5", "VX/M5", "VX/N5"];

    // track if sequence is valid
    let validSequence = true;

    // Validate the sequence
    // for (let i = 0; i < middleEntries.length; i++) {
    //   if (middleEntries[i].symbol !== Symbols[i]) {
    //     // If sequence is broken or missing 
    //     validSequence = i < 7;
    //     break;
    //   }
    // }

    // If sequence is not valid, limit to 7 months
    // const validEntriesCount = validSequence ? middleEntries.length : 7;
    const validEntriesCount = middleEntries?.length;
    validEntries = middleEntries?.length;

    // Check if current_month is provided and valid, otherwise use the current date
    let startingDate = new Date();
    //@ts-ignore
    if (vixValueData?.current_month) {
      // Attempt to create a date from a month name by adding a default year and using the first day of the month
      const currentYear = new Date().getFullYear(); // Using the current year
      startingDate = new Date(
        //@ts-ignore
        `${currentYear}-${vixValueData.current_month}-01`
      );
    }

    // Generate month names based on valid sequence
    for (let i = 0; i < validEntriesCount; i++) {
      // Create a new Date object for each month
      const date = new Date(
        startingDate.getFullYear(),
        startingDate.getMonth() + i
      );
      const monthName = date.toLocaleString("default", { month: "short" });
      months.push(monthName);
    }

    return months;
  };


  const nextMonths = getNextMonths();

  const allVixIndex: VixData[] =
    //@ts-ignore
    vixValueData?.vix_latest_data?.slice(0, validEntries) || [];

  //@ts-ignore
  const vixIndex: VixData[] = vixValueData?.vix_latest_data?.slice(1, validEntries + 1) || [];
  //@ts-ignore
  const vixToolkitIndex: VixData[] = vixValueData?.vix_latest_data || [];
  const firstLastPrice: number =
    parseFloat(allVixIndex[0]?.last_price?.toFixed(3)) || 0;

  const vixLastPrices: number[] = Array(validEntries).fill(firstLastPrice);
  const lastValues: number[] = vixIndex.map((item) =>
    parseFloat(item?.last_price?.toFixed(3))
  );
  const openValues: number[] = vixIndex.map((item) =>
    parseFloat(item?.open?.toFixed(3))
  );
  const lowValues: number[] = vixIndex.map((item) =>
    parseFloat(item?.low?.toFixed(3))
  );
  const highValues: number[] = vixIndex.map((item) =>
    parseFloat(item?.high?.toFixed(3))
  );
  const preCloseValues: number[] = vixIndex.map((item) =>
    parseFloat(item?.close?.toFixed(3))
  );

  //@ts-ignore
  const VIX_Obj = vixValueData?.vix_latest_data?.slice(validEntries + 1, vixValueData?.vix_latest_data?.length) || [];
  const VIX1D_lastprice: number =
    parseFloat(VIX_Obj[1]?.last_price.toFixed(3)) || 0;
  const VIX1D: number[] = Array(validEntries).fill(VIX1D_lastprice);

  const VIX9D_lastprice: number =
    parseFloat(VIX_Obj[0]?.last_price.toFixed(3)) || 0;
  const VIX9D: number[] = Array(validEntries).fill(VIX9D_lastprice);

  const VIX3M_lastprice: number =
    parseFloat(VIX_Obj[2]?.last_price.toFixed(3)) || 0;
  const VIX3M: number[] = Array(validEntries).fill(VIX3M_lastprice);

  const VIX6M_lastprice: number =
    parseFloat(VIX_Obj[3]?.last_price.toFixed(3)) || 0;
  const VIX6M: number[] = Array(validEntries).fill(VIX6M_lastprice);

  //@ts-ignore
  const hvIndex = vixValueData?.snp_data;

  const hvObj =
    Array.isArray(hvIndex) && hvIndex.length > 0
      ? hvIndex[0]?.fields || {}
      : { hv10: 0, hv20: 0, hv30: 0 };

  const HV10: number[] = Array(validEntries).fill(parseFloat(hvObj.hv10.toFixed(3)) || 0);
  const HV20: number[] = Array(validEntries).fill(parseFloat(hvObj.hv20.toFixed(3)) || 0);
  const HV30: number[] = Array(validEntries).fill(parseFloat(hvObj.hv30.toFixed(3)) || 0);


  // console.log("point:", hoveredPoint)


  const indicatorData: IndicatorData = {
    "VIX Index": vixLastPrices,
    Last: lastValues,
    // Open: [15.0, 14.5, 16.0, 13.0, 19.0, 17.5, 14.0],
    Open: openValues,
    High: highValues,
    Low: lowValues,
    "Previous Close": preCloseValues,
    "VIX1D Index": VIX1D,
    "VIX9D Index": VIX9D,
    "VIX3M Index": VIX3M,
    "VIX6M Index": VIX6M,
    HV10: HV10,
    HV20: HV20,
    HV30: HV30,
  };

  const handleDownload = () => {
    const formattedData: { [key: string]: number | string }[] = [];
    const headers = ["Date", "Time", ...Object.keys(indicatorData)];
    const numberOfRows = indicatorData[headers[2]].length;
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    for (let i = 0; i < numberOfRows; i++) {
      const row: { [key: string]: number | string } = {};
      row["Date"] = currentDate;
      row["Time"] = currentTime;
      headers.slice(2).forEach((header) => {
        row[header] = indicatorData[header][i];
      });
      formattedData.push(row);
    }
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };

  useEffect(() => {
    setDownloadData(() => handleDownload);
  }, [setDownloadData]);

  const createImageFromSvg = (
    SvgComponent: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & { ishoverd: boolean } & {
        fadeIcon?: boolean;
      }
    >,
    ishoverd: boolean,
    fadeIcon?: boolean
  ): HTMLImageElement | null => {
    if (typeof window === "undefined") {
      return null;
    }

    const svgString = ReactDOMServer.renderToString(
      <SvgComponent ishoverd={ishoverd} fadeIcon={fadeIcon} />
    );
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = document.createElement("img");
    img.src = url;
    return img;
  };

  const createSvgImages = (svgs: {
    [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }) => {
    const svgImages: {
      [key: string]: {
        normal: HTMLImageElement | null;
        hover: HTMLImageElement | null;
        fadeIcon: HTMLImageElement | null;
      };
    } = {};
    Object.keys(svgs).forEach((key) => {
      svgImages[key] = {
        normal: createImageFromSvg(svgs[key], false),
        hover: createImageFromSvg(svgs[key], true),
        fadeIcon: createImageFromSvg(svgs[key], false, true),
      };
    });
    return svgImages;
  };

  const svgs: { [key: string]: any } = theme === "dark" ? svgsDark : svgsLight;
  const svgImages = useMemo(() => createSvgImages(svgs), [svgs]);

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

      let monthIndex = tooltip.dataPoints[0].dataIndex;

      const calculateChange = (last: number, preClose: number): string => {
        const change = (last / preClose - 1) * 100;
        return `${change >= 0 ? "+" : ""}${change.toFixed(3)}%`;
      };

      const calculateDaysUntilExpiration = (
        expiration: string | null
      ): string => {
        if (!expiration) return "";
        const currentDate = new Date();
        const expirationDate = new Date(expiration);
        const diffTime = Math.abs(
          expirationDate.getTime() - currentDate.getTime()
        );
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${expirationDate.toLocaleDateString()} in ${diffDays} days`;
      };

      let currentMonthIndex = 0;

      const isHoveredSpecial = ['Last', 'Open', 'High', 'Low', 'Previous Close'].includes(currentHovered);
      const vixIndex = vixToolkitIndex.find(item => item.symbol === 'VIX');
      const Vix9D = vixToolkitIndex.find(item => item.symbol === 'VIX9D');
      const Vix1D = vixToolkitIndex.find(item => item.symbol === 'VIX1D');
      const Vix3M = vixToolkitIndex.find(item => item.symbol === 'VIX3M');
      const Vix6M = vixToolkitIndex.find(item => item.symbol === 'VIX6M');
      const Vix30D = vixToolkitIndex.find(item => item.symbol === 'VIX30D');
      const Vix90D = vixToolkitIndex.find(item => item.symbol === 'VIX90D');
      //@ts-ignore
      // Set the data to map over, using slice(1, 10) if the condition is true, otherwise use the full array.
      const dataToMap = isHoveredSpecial ? vixToolkitIndex.slice(1, vixValueData?.vix_latest_data?.length) : vixToolkitIndex;

      const tooltipData = dataToMap.map((item, index) => {
        const expiresOn = calculateDaysUntilExpiration(item.expiration as any);
        const currentMonth = nextMonths[currentMonthIndex];
        currentMonthIndex = (currentMonthIndex + 1) % nextMonths.length;

        const excludedIndicators = ["VIX Index", "VIX1D Index", "VIX9D Index", "VIX3M Index", "VIX6M Index", "HV10", "HV20", "HV30"];


        // Check if currentHovered is 'VIX' and use the first element with symbol 'VIX'
        const currentItem = currentHovered == 'VIX Index' ? vixIndex : currentHovered == 'VIX1D Index' ? Vix1D : currentHovered == 'VIX9D Index' ? Vix9D : currentHovered == 'VIX3M Index' ? Vix3M : Vix6M;
        // console.log("item:", currentItem)

        return {
          [currentHovered]: currentHovered === 'Last'
            ? item?.last_price?.toFixed(3) // Ensure 3 decimal places
            : currentHovered === 'Open'
              ? item?.open?.toFixed(3)
              : currentHovered === 'High'
                ? item?.high?.toFixed(3)
                : currentHovered === 'Low'
                  ? item?.low?.toFixed(3)
                  : currentHovered === 'Previous Close'
                    ? item?.close?.toFixed(3)
                    : currentHovered === 'HV10'
                      ? currentHoveredValue?.toFixed(3)
                      : currentHovered === 'HV20'
                        ? currentHoveredValue?.toFixed(3)
                        : currentHovered === 'HV30'
                          ? currentHoveredValue?.toFixed(3)
                          //@ts-ignore
                          : currentItem?.last_price?.toFixed(3),

          // Conditionally include last field
          ...(currentHovered === 'Last' ? { Change: calculateChange(item.last_price, item.close) } : {}),


          // Conditionally include Volume field when currentHovered is 'Last'
          ...(currentHovered === 'Last' ? {
            //@ts-ignore
            Volume: item?.volume?.toLocaleString(undefined, { maximumFractionDigits: 0 })
          } : {}),

          // Conditionally include Contract and Expires on fields
          ...(excludedIndicators.includes(currentHovered) ? {} : {
            Contract: currentMonth,
            ...(expiresOn && { "Expires on": expiresOn }),
          }),
        };
      });


      const currentTooltipData = tooltipData[monthIndex];


      Object.entries(currentTooltipData).forEach(([key, value]) => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        if (key === "Change") {
          const changeString = value.toString();
          const changeValue = parseFloat(changeString.replace("%", ""));
          const changeColor = changeValue < 0 ? "#ff3f59" : "#00FEB5";
          td.innerHTML = `<span style="color:#979F9D; padding-right: 2px; font-size:12px">${key}:</span> <span style="color: ${changeColor}; font-size:12px">${value}</span>`;
        } else {
          td.innerHTML = `<span style="color:#979F9D; padding-right: 2px; font-size:12px">${key}:</span> <span style="font-size:12px">${value}</span>`;
        }

        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      tableRoot.appendChild(tableBody);
    }

    // Calculate available space
    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
    const tooltipWidth = tooltipEl.offsetWidth;
    const tooltipHeight = tooltipEl.offsetHeight;

    const chartHeight = chart.height;
    const caretY = tooltip.caretY;
    const chartWidth = chart.width;

    const spaceAbove = caretY;
    const spaceBelow = chartHeight - caretY;

    let tooltipY = positionY + caretY - tooltipHeight - 20; // Default tooltip position (above)
    let arrowPosition = "bottom"; // Default arrow position is at the bottom of the tooltip

    // If there's not enough space above, position the tooltip below the caret
    if (spaceAbove < tooltipHeight + 20) {
      tooltipY = positionY + caretY + 20; // Adjust to place tooltip below
      arrowPosition = "top"; // Change the arrow to point at the top of the tooltip
    }

    // Set tooltip position
    const centerX = positionX + tooltip.caretX - tooltipWidth / 2;
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = centerX + "px";
    tooltipEl.style.top = tooltipY + "px";
    tooltipEl.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
    tooltipEl.style.background = theme === "dark" ? "#282C2F" : "#F5F5F5";
    tooltipEl.style.color = theme === "dark" ? "white" : "#000000";
    tooltipEl.style.zIndex = "99999999";
    tooltipEl.style.minWidth = "120px";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.pointerEvents = "none";



    // Add or update the small arrow at the top or bottom of the tooltip
    let arrow = tooltipEl.querySelector(".tooltip-arrow");
    if (!arrow) {
      arrow = document.createElement("div");
      arrow.className = "tooltip-arrow";
      arrow.style.position = "absolute";
      arrow.style.width = "0";
      arrow.style.height = "0";
      arrow.style.borderLeft = "15px solid transparent";
      arrow.style.borderRight = "15px solid transparent";

      tooltipEl.appendChild(arrow);
    }

    // Remove any previous arrow styles before adding new ones
    arrow.style.borderTop = "none";
    arrow.style.borderBottom = "none";
    arrow.style.top = "unset";
    arrow.style.bottom = "unset";

    // Adjust arrow style based on tooltip position
    if (arrowPosition === "top") {
      // Tooltip is below caret, arrow points up
      arrow.style.borderTop = `15px solid ${theme === "dark" ? "#282C2F" : "#F5F5F5"}`;
      arrow.style.bottom = `98%`; // Position arrow at the bottom of the tooltip (points up)
      arrow.style.rotate = `180deg`;

    } else {
      // Tooltip is above caret, arrow points down
      arrow.style.borderBottom = `15px solid ${theme === "dark" ? "#282C2F" : "#F5F5F5"}`;
      arrow.style.top = `98%`; // Position arrow at the top of the tooltip (points down)
    }

    arrow.style.left = "calc(50% - 15px)"; // Center the arrow

    // Adjust for the last tooltip to the right
    if (tooltip.dataPoints[0].dataIndex === chart.data.labels.length - 1) {
      tooltipEl.style.left = `${chartWidth - tooltipWidth - 10}px`; // Align right
      arrow.style.display = "none"; // Hide arrow for the last tooltip
    } else {
      // Ensure the arrow is displayed for other tooltips
      arrow.style.display = "block";
    }

  };

  const data = {
    labels: nextMonths,
    datasets: activeIndicators.map(
      (indicator: string, datasetIndex: number) => {
        const isSameValue = indicatorData[indicator].every(
          (value: number) => value === indicatorData[indicator][0]
        );

        return {
          label: indicator,
          data: indicatorData[indicator],
          borderColor:
            hoveredBtn && hoveredBtn === indicator
              ? colors[indicator]
              : hoveredBtn
                ? colors[indicator] + "50"
                : hoveredPoint && hoveredPoint.datasetIndex === datasetIndex
                  ? colors[indicator]
                  : hoveredPoint
                    ? colors[indicator] + "50"
                    : colors[indicator],


          // pointStyle: indicatorData[indicator].map((_, pointIndex: number) => {
          //   const movingSymbolIndicators = [
          //     "VIX Index",
          //     "VIX3M Index",
          //     "VIX9D Index",
          //     "VIX6M Index",
          //     "VIX1D Index",
          //     "HV10",
          //     "HV20",
          //     "HV30",
          //   ];

          //   // Check if the current hovered line is in the movingSymbolIndicators
          //   const shouldMoveSymbol = movingSymbolIndicators.includes(hoveredLine);

          //   // Check if the point is hovered
          //   const isHoveredPoint =
          //     hoveredPoint && hoveredPoint.datasetIndex === datasetIndex && hoveredPoint.index === pointIndex;

          //   // If the symbol is supposed to move with the hover and the point is hovered
          //   if (shouldMoveSymbol && isHoveredPoint) {
          //     return svgImages[indicator]?.hover || "circle"; // Move symbol with hover
          //   }

          //   // Logic for non-moving symbols (avoid placing at the start or end unless hovered)
          //   if (shouldMoveSymbol && pointIndex === 0) {
          //     return "line"; // No symbol at the start
          //   }

          //   if (shouldMoveSymbol && pointIndex === indicatorData[indicator].length - 1) {
          //     return "line"; // No symbol at the end
          //   }

          //   // Original logic for normal symbols (not moving ones)
          //   return isSameValue
          //     ? pointIndex === indicatorData[indicator].length - 1 // Avoid placing symbol at the end for moving symbols
          //       ? "line" // Avoid symbol at the end for moving symbols
          //       : hoveredPoint
          //         ? "line" // Symbol follows the hover position on the line
          //         : "line"
          //     : hoveredPoint && hoveredPoint.datasetIndex === datasetIndex
          //       ? pointIndex === hoveredPoint.index
          //         ? svgImages[indicator]?.hover || "circle" // Show hover symbol when hovered
          //         : svgImages[indicator]?.fadeIcon || "circle" // Show faded icon for other points
          //       : hoveredPoint
          //         ? svgImages[indicator]?.fadeIcon || "circle" // Show faded icon for other points
          //         : svgImages[indicator]?.normal || "circle"; // Normal symbol for points
          // }),



          pointStyle: indicatorData[indicator].map((_, pointIndex: number) =>
            isSameValue
              ? pointIndex === indicatorData[indicator].length - 1
                ? hoveredPoint?.datasetIndex === datasetIndex
                  ? svgImages[indicator]?.hover || "circle"
                  : hoveredPoint
                    ? svgImages[indicator]?.fadeIcon || "circle"
                    : svgImages[indicator]?.normal || "circle"
                : hoveredPoint
                  ? "line"
                  : "line"
              : hoveredPoint && hoveredPoint.datasetIndex === datasetIndex
                ? pointIndex === hoveredPoint.index
                  ? svgImages[indicator]?.hover || "circle"
                  : svgImages[indicator]?.fadeIcon || "circle"
                : hoveredPoint
                  ? svgImages[indicator]?.fadeIcon || "circle"
                  : svgImages[indicator]?.normal || "circle"
          ),



          backgroundColor: theme === "dark" ? "#282C2F" : "#e5e5e5",
          pointBorderColor: colors[indicator],
          borderDash:
            indicator === "VIX Index"
              ? [10, 2]
              : indicator === "VIX1D Index"
                ? [8, 2]
                : indicator === "VIX9D Index"
                  ? [6, 2]
                  : indicator === "VIX3M Index"
                    ? [4, 2]
                    : indicator === "VIX6M Index"
                      ? [2, 2]
                      : indicator === "HV10"
                        ? [12, 2]
                        : indicator === "HV20"
                          ? [14, 2]
                          : indicator === "HV30"
                            ? [16, 2]
                            : undefined,
          pointHoverRadius: 10,
          pointHoverBorderWidth: 2,
          pointHoverBorderColor: colors[indicator] || "#000000",
          pointHoverBackgroundColor: colors[indicator] || "#000000",
        };
      }
    ),
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.update();
    }
  }, []);




  const indicatorsWithStraightLine = [
    'vix index', 'vix1d index', 'vix9d index', 'vix3m index',
    'vix6m index', 'hv10', 'hv20', 'hv30'
  ];

  // console.log("hovered:", currentHovered)

  const targetIndicators = [
    'VIX Index',
    'VIX3M Index',
    'VIX9D Index',
    'VIX6M Index',
    'VIX1D Index',
    'HV10',
    'HV20',
    'HV30'
  ];

  const interactionMode =
    targetIndicators.includes(currentHovered) && activeIndicators.includes(currentHovered)
      ? "y"
      : "point";

  // console.log("hhovered line:", hoveredLine)

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
        text: "Volatility Price",
      },
      tooltip: {
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
      },
      datalabels: {
        display: (context: any) => {
          const datasetIndex = context.datasetIndex;
          const dataIndex = context.dataIndex;

          const isHoveredDataset =
            hoveredPoint && hoveredPoint.datasetIndex === datasetIndex;

          const isHoveredPoint =
            hoveredPoint &&
            hoveredPoint.datasetIndex === datasetIndex &&
            hoveredPoint.index === dataIndex;

          const isLastPoint =
            context.dataIndex === context.dataset.data.length - 1;
          const isSameValue =
            context.dataset.data.length === 1 ||
            context.dataset.data.every(
              (value: number) => value === context.dataset.data[0]
            );

          if (
            isSameValue &&
            hoveredBtn &&
            hoveredBtn === context.dataset.label
          ) {
            return isLastPoint;
          }
          if (hoveredBtn && hoveredBtn === context.dataset.label) {
            return true;
          }
          if (isSameValue) {
            if (hoveredPoint && hoveredPoint.datasetIndex === datasetIndex) {
              return isLastPoint && isHoveredPoint;
            }
            return activeIndicators.length <= 2 && isLastPoint;
          }
          if (isHoveredPoint) {
            return false;
          }
          if (isHoveredDataset) {
            return true;
          }

          return (
            activeIndicators.length <= 2 &&
            (hoveredPoint
              ? hoveredPoint.datasetIndex === datasetIndex
              : true) &&
            (!isSameValue || isLastPoint)
          );
        },
        color: theme === "dark" ? "#D4D4D4" : "#282C2F",
        anchor: (context: any) => {
          const isSameValue =
            context.dataset.data.length === 1 ||
            context.dataset.data.every(
              (value: number) => value === context.dataset.data[0]
            );
          return isSameValue ? "middle" : "end";
        },
        align: (context: any) => {
          const isSameValue =
            context.dataset.data.length === 1 ||
            context.dataset.data.every(
              (value: number) => value === context.dataset.data[0]
            );
          return isSameValue ? "right" : "top";
        },
        font: {
          size: 12,
          family: asap_Condensed.style.fontFamily,
        },
        formatter: (value: number) => value.toFixed(3),
        backgroundColor: theme === "dark" ? "#282C2F" : "#FFFFFF",
        borderRadius: 4,
        padding: 8,
        offset: (context: any) => {
          const isSameValue =
            context.dataset.data.length === 1 ||
            context.dataset.data.every(
              (value: number) => value === context.dataset.data[0]
            );
          return isSameValue ? 10 : 4;
        },
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
          maxTicksLimit: 8,
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
          text: "Future Months",
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


    interaction: {
      // mode: "point",
      mode: interactionMode,
      intersect: false,
    },

    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
    onHover: handleHover,
    onLeave: handleLeave,
  };




  const toggleIndicator = (indicator: string) => {
    setActiveIndicators((prev) =>
      prev.includes(indicator)
        ? prev.filter((item) => item !== indicator)
        : [...prev, indicator]
    );
  };

  // console.log("active:", activeIndicators)

  return (
    <section
      className={`w-full ${isFullscreen ? "" : "xl:px-32 lg:px-16 md:px-20 px-5"
        }`}
    >
      <div
        className={`inner-shadow border-2 dark:border-[#3C4045]  border-lightBorder w-full h-full flex 
        lg:flex-row flex-col-reverse dark:bg-lightDark bg-lightbg p-2 rounded-2xl 
        ${isFullscreen &&
          "xl:px-32 lg:px-16 md:px-20 px-5 justify-between items-stretch flex-wrap-reverse overflow-hidden"
          }`}
      >
        <div
          className={`w-full px-4 pt-8 pb-2 flex-grow ${isFullscreen ? "lg:w-full" : "lg:w-3/4"
            } flex flex-col`}
        >
          <div
            className={`w-full flex relative min-h-96 h-full xxl:h-full lg:overflow-hidden overflow-x-auto 
            ${theme === "dark" ? "customScrollbar" : "customScrollbarLight"}`}
          >
            <div className="w-full min-w-[40rem] flex ">
              <Line
                data={data}
                options={options as any}
                ref={chartRef}
                className="min-w-[40rem]"
              />
              {!activeTable && (
                <div className="relative">
                  <Link
                    href="/www.vixspike.com"
                    className="absolute bottom-0.5 right-8 dark:text-[#78817F] text-[#969696]"
                  >
                    www.vixspike.com
                  </Link>
                </div>
              )}
            </div>
          </div>

          {activeTable && (
            <div className="flex-grow">
              <VolatilityTable
                indicatorData={indicatorData}
                activeIndicators={activeIndicators}
                nextMonths={nextMonths}
              />
            </div>
          )}
        </div>

        <div
          className={`w-full mr-2 min-w-48  flex justify-end flex-col
          ${isFullscreen
              ? "lg:w-full"
              : "lg:w-[18%] lg:sticky relative lg:top-16 z-10 h-full"
            }`}
        >
          <Indicators
            activeIndicators={activeIndicators}
            toggleIndicator={toggleIndicator}
            fullScreen={isFullscreen}
            setActiveIndicators={setActiveIndicators}
            selectedLine={hoveredLine}
            setHoveredBtn={setHoveredBtn}
            // toggleClearAll={toggleClearAll}
            clearAll={clearAll}
            setClearAll={setClearAll}
          />
        </div>
      </div>
    </section>
  );
};

export default Charts;
