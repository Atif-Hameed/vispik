"use server";

import axios from "axios";

export const StripePaymentAction = async ({ type }: { type: string }) => {
  if (!type) return { success: false, message: "Invalid type" };

  try {
    const planType = type.toLowerCase();

    const response = await axios.get(
      `${process.env.BACKEND_URL}/payment?type=${planType}`
    );

    if (response.status === 200) {
      return {
        success: true,
        redirectUrl: `${process.env.BACKEND_URL}/payment?type=${planType}`,
      };
    } else {
      return { success: false, message: "Something went wrong" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error occurred during payment" };
  }
};
