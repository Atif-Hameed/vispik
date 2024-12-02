"use server";

import axios from "axios";
import { format } from "date-fns";

export const HistoricalData = async (date: Date) => {
  try {
    const apiURL = process.env.BACKEND_URL;

    const formattedDate = format(new Date(date), "yyyy-MM-dd");

    console.log(formattedDate)

    const response = await axios.post(
      `${apiURL}/get-historical-data/`,
      {
        dates: [formattedDate],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    return {
      data: data,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return {
      data: null,
      error: "Failed to fetch historical data",
    };
  }
};
