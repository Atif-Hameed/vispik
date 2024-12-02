"use server";

import axios from "axios";
interface GoldProps {
  startDate: string | null;
  endDate: string | null;
  sessionId: string | null;
}

export const GoldAction = async ({
  startDate,
  endDate,
  sessionId,
}: GoldProps) => {
  try {
    const apiURL = process.env.BACKEND_URL;

    console.log("Params: ", { startDate, endDate, sessionId });

    const response = await axios.get(`${apiURL}/download_gold/`, {
      params: {
        start_date: startDate,
        end_date: endDate,
        session_id: sessionId,
      },
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "blob",
    });

    if (response.status === 200) {
      console.log("Successfully fetched goldAction data:", response.data);
      return {
        success: true,
        data: response.data,
      };
    } else {
      console.log("Error fetching goldAction data:", response.data);
      return {
        success: false,
        error: response.data?.error || "Failed to fetch gold data",
      };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error response:", error.response);
      console.log("Axios error message:", error.message);

      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.message ||
          "Something went wrong",
      };
    } else {
      console.log("General error:", error);

      return {
        success: false,
        error: "An unexpected error occurred",
      };
    }
  }
};
