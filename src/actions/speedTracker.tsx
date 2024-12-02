"use server";

import axios from "axios";

export async function speedTracker() {
  try {
    const apiURL = process.env.BACKEND_URL;
    const response = await axios.get(`${apiURL}/speed-index`);

    let parsedData = response.data;

    if (typeof parsedData === "string") {
      try {
        parsedData = JSON.parse(parsedData);
      } catch (error) {
        console.error("Error parsing JSON response:", error);
        return {
          data: null,
          error: "Failed to parse JSON response",
        };
      }
    }

    const formattedData = transformAPIData(parsedData);

    return {
      data: formattedData,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching speedTracker Data:", error);
    return {
      data: null,
      error: "Failed to fetch speedtracker Data",
    };
  }
}

const transformAPIData = (data: any) => {
  const labels = ["m1", "m2", "m3", "m4", "m5", "m6"];

  const mapValuesToLabels = (values: any[]) => {
    return labels.map((label, index) => ({
      label,
      value: parseFloat(values[index] ?? "0").toFixed(4),
    }));
  };

  return {
    last_value: mapValuesToLabels(data.last_values),
    daily_return: mapValuesToLabels(data.daily_returns),
    vix_covariance: mapValuesToLabels(data.vix_covariance),
    snp_covariance: mapValuesToLabels(data.snp_covariance),
    speed_vs_vix_index: mapValuesToLabels(data.speed_values),
    speed_vs_vix_median: mapValuesToLabels(data.speed_median),
    speed_vs_vix_percentile: mapValuesToLabels(data.speed_percentile),
    reversion_intensity: mapValuesToLabels(data.reversion_intensity),
    reversion_intensity_median: mapValuesToLabels(
      data.reversion_intensity_median
    ),
    reversion_intensity_percentile: mapValuesToLabels(
      data.reversion_intensity_percentile
    ),
    carry_intensity: mapValuesToLabels(data.carry),
    carry_median: mapValuesToLabels(data.carry_median),
    carry_percentile: mapValuesToLabels(data.carry_percentile),
    current_month: data.current_month,
    date: data.date,
  };
};
