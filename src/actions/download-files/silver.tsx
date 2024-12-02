"use server";

import axios from "axios";

interface SilverProps {
  startDate: string | null;
  endDate: string | null;
  sessionId: string | null;
}

export const SilverAction = async ({
  startDate,
  endDate,
  sessionId,
}: SilverProps) => {
  try {
    const apiURL = process.env.BACKEND_URL;

    const response = await axios.get(`${apiURL}/download_silver/`, {
      params: {
        start_date: startDate,
        end_date: endDate,
        session_id: sessionId,
      },
    });

    console.log(response.data);

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        error: response.data.error || "Failed to fetch silverAction Data",
      };
    }
  } catch (error) {
    console.error("Error fetching silverAction Data:", error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
