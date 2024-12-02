"use client";
import HistricalCharts from "@/components/historical_Prices/chart";
import Header from "@/components/historical_Prices/header";
import Stats from "@/components/home/stats";
import StatHistorical from "@/components/home/stats/StatHistorical";
import { useState } from "react";

export default function Home() {
  const [activeTable, setactiveTable] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [dateToggle, setDateToggle] = useState<"one" | "multiple">("one");
  const [downloadData, setDownloadData] = useState(null);
  const [clearAll, setClearAll] = useState(false)
  const [datesSelected, setDatesSelected] = useState([new Date(2007, 2, 26)]);

  return (
    <div className="min-h-screen">
      <Header
        active={activeTable}
        setActive={setactiveTable}
        fullScreen={fullScreen}
        setDateToggle={setDateToggle}
        dateToggle={dateToggle}
        setFullScreen={setFullScreen}
        downloadData={downloadData}
      />
      <HistricalCharts
        dateToggle={dateToggle}
        activeTable={activeTable}
        fullScreen={fullScreen}
        setDatesSelected={setDatesSelected}
        setDownloadData={setDownloadData}
      />
      <StatHistorical clearAll={clearAll} datesSelected={datesSelected} />
    </div>
  );
}
