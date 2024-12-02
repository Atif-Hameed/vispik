"use client"
import { Suspense, useState } from "react";
import Charts from "@/components/home/chart/chart";
import Header from "@/components/home/header";
import Stats from "@/components/home/stats";
import VixTerm from "@/components/home/vixTerm";
import { useFullscreen } from '@/context/FullScreenContext';

export default function Home() {
  const [activeTable, setactiveTable] = useState(false);
  const { isFullscreen, setIsFullscreen } = useFullscreen();
  const [downloadData, setDownloadData] = useState(null)
  const [clearAll, setClearAll] = useState(false)


  return (
    <div>
      <Header
        active={activeTable}
        setActive={setactiveTable}
        fullScreen={isFullscreen}
        setFullScreen={setIsFullscreen}
        downloadData={downloadData}
      />
      <Charts clearAll={clearAll} setClearAll={setClearAll} activeTable={activeTable} fullScreen={isFullscreen} setDownloadData={setDownloadData} />
      <Stats clearAll={clearAll} />
      <Suspense fallback={<div>Loading...</div>}>
        <VixTerm />
      </Suspense>
    </div>
  );
}