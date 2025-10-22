// src/utils/formatPhoneNumber.js
import { parsePhoneNumberFromString } from "libphonenumber-js";

export function formatPhoneNumber(number, defaultCountry = "US") {
  if (!number) return "";
  
  try {
    const phoneNumber = parsePhoneNumberFromString(number, defaultCountry);
    if (!phoneNumber) return number; // fallback if parsing fails
    return phoneNumber.formatInternational(); // +1 (417) 448-9482
  } catch (error) {
    console.error("Error formatting phone number:", error);
    return number;
  }
}
