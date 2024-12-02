"use server";

import axios from "axios";

interface SendMessageProps {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  message: string;
}

export const SendMessageAction = async ({
  firstName,
  lastName,
  email,
  country,
  message,
}: SendMessageProps) => {
  try {
    const response = await axios.post(`${process.env.URL}/api/send-message`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      country: country,
      message: message,
    });

    console.log(response);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: "Error sending message",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      error: "Error sending message",
    };
  }
};
