"use server";

import axios from "axios";

export async function vixValue() {
  try {
    const apiURL = process.env.BACKEND_URL;
    const response = await axios.get(`${apiURL}/vix-values`);

    const vixValue = response.data;
    return {
      data: vixValue,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching vixValue Data:", error);
    return {
      data: null,
      error: "Failed to fetch vixValue Data",
    };
  }
}
