import {
  HV10,
  HV20,
  HV30,
  High,
  Last,
  Low,
  Open,
  PreviousClose,
  VIX1D,
  VIX3M,
  VIX6M,
  VIX9D,
  VixIndex,
} from "@/svgs/indicatorSvg";

export const indicatorsBtnsData = [
  {
    color: "#BBD4F4",
    Svg: VixIndex,
    text: "VIX Index",
  },
  {
    color: "#93FFB8",
    Svg: Last,
    text: "Last",
  },
  {
    color: "#887BFF",
    Svg: Open,
    text: "Open",
  },
  {
    color: "#8037D0",
    Svg: High,
    text: "High",
  },
  {
    color: "#F1F99F",
    Svg: Low,
    text: "Low",
  },
  {
    color: "#FF0053",
    Svg: PreviousClose,
    text: "Previous Close",
  },
  {
    color: "#FF6698",
    Svg: VIX1D,
    text: "VIX1D Index",
  },
  {
    color: "#FF6600",
    Svg: VIX9D,
    text: "VIX9D Index",
  },
  {
    color: "#CC0099",
    Svg: VIX3M,
    text: "VIX3M Index",
  },
  {
    color: "#00D095",
    Svg: VIX6M,
    text: "VIX6M Index",
  },
  {
    color: "#33CCFF",
    Svg: HV10,
    text: "HV10",
  },

  {
    color: "#FFFF00",
    Svg: HV20,
    text: "HV20",
  },

  {
    color: "#334AFF",
    Svg: HV30,
    text: "HV30",
  },
];
