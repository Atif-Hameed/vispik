"use server";

import axios from "axios";

const API_KEY = "KLja9hBDKToTywNRVEP9JqFAGqy3Etva";
const BASE_URL =
  "https://sandbox.usbank.com/utilities/holidays/v1/bank-holidays";

export async function getBankHolidays() {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.holidays;
  } catch (error) {
    console.error("Error fetching bank holidays:", error);
    return [];
  }
}
