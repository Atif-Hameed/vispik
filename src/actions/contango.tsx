"use server";

import axios from "axios";

export const getContangoStats = async () => {
  try {
    const apiURL = process.env.BACKEND_URL;
    const response = await axios.get(`${apiURL}/cotango-difference`);
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: "Failed to fetch contango stats. Please try again later.",
    };
  }
};
