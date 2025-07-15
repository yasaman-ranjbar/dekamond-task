import { ValidationResult } from "@/type";

export const validateIranianPhoneNumber = (
  phoneNumber: string
): ValidationResult => {
  const cleanedNumber = phoneNumber.replace(/[\s\-\(\)]/g, "");

  // Check if input contains only characters (no digits at all)
  if (!/\d/.test(cleanedNumber)) {
    return {
      isValid: false,
      error: "شماره تلفن باید شامل اعداد باشد",
    };
  }

  // Check validation for iran phone number
  if (cleanedNumber.startsWith("+98")) {
    if (cleanedNumber.length !== 13) {
      return {
        isValid: false,
        error: "شماره تلفن باید 13 رقم باشد",
      };
    }

    // Check if the rest are digits (after +98)
    const digits = cleanedNumber.slice(3);
    if (!/^\d+$/.test(digits)) {
      return {
        isValid: false,
        error: "شماره تلفن فقط می‌تواند شامل اعداد باشد",
      };
    }

    // Check if it starts with +989 (Iranian mobile format)
    if (!cleanedNumber.startsWith("+989")) {
      return {
        isValid: false,
        error: "بعد از 98+ شماره موبایل با 9 باید شروع شود",
      };
    }

    return { isValid: true };
  }

  // Check for domestic format 
  if (cleanedNumber.startsWith("09")) {
    if (cleanedNumber.length !== 11) {
      return {
        isValid: false,
        error: "شماره موبایل باید 11 رقم باشد",
      };
    }

    // Check if all characters are digits
    if (!/^\d+$/.test(cleanedNumber)) {
      return {
        isValid: false,
        error: "شماره تلفن فقط می‌تواند شامل اعداد باشد",
      };
    }

    // Validate specific mobile operators in Iran
    const validPrefixes = ["091", "092", "093"];
    const prefix = cleanedNumber.slice(0, 3);

    if (!validPrefixes.includes(prefix)) {
      return {
        isValid: false,
        error: "پیش‌ شماره موبایل معتبر نیست",
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    error: "شماره موبایل باید با 09 یا 98+ شروع شود",
  };
};
