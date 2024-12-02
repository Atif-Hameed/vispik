"use server";

import axios from "axios";

export const BronzeRealTime = async ({ date }: { date: string }) => {
  try {
    const apiURL = process.env.BACKEND_URL;

    const response = await axios.get(
      `${apiURL}/download_bronze_2/?date=${date}`,
      {
        headers: {
          Accept: "application/json, text/plain",
        },
        responseType: "text",
      }
    );

    const contentType = response.headers["content-type"];

    if (contentType.includes("application/json")) {
      const jsonData = JSON.parse(response.data);

      return {
        data: null,
        error: jsonData.error || "Failed to fetch data",
      };
    } else if (contentType.includes("text/csv")) {
      return {
        data: response.data,
        error: null,
      };
    } else {
      return {
        data: null,
        error: "Unsupported content type",
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      data: null,
      error: "Failed to fetch data",
    };
  }
};
