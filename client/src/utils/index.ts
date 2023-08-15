import { BiCodeAlt, BiHomeAlt, BiPencil, BiUserCircle } from "react-icons/bi";
import { routePaths } from ".";
import { externalRoutes } from ".";

const formatAmount = (amount = "", returnInitial = false) => {
  if (!amount) {
    return amount;
  }
  const convertedToDecimalPoint = amount.replace(/\,/g, ".");

  const parsedAmount = parseFloat(convertedToDecimalPoint);
  if (Number.isNaN(Number(amount)) && !Number.isNaN(parsedAmount)) {
    return parsedAmount.toString();
  }
  if (Number.isNaN(parsedAmount)) {
    return "";
  }
  if (parsedAmount < 0) {
    return Math.abs(parsedAmount).toString();
  }
  try {
    if (returnInitial && Number(amount)) {
      return amount;
    }
  } catch {
    return "";
  }

  return Number(parsedAmount).toString();
};

const firstAndLast = (address: string) =>
  `${address.slice(0, 4)}...${address.slice(address.length - 4)}`;

const navigationLinks = [
  { title: "Home", href: routePaths.HOME, Icon: BiHomeAlt },
  {
    title: "Create Campaign",
    href: routePaths.CREATE_CAMPAIGN,
    Icon: BiPencil,
  },
  {
    title: "My Account",
    href: routePaths.ACCOUNT,
    Icon: BiUserCircle,
  },
  { title: "Smart Contract", href: externalRoutes.CONTRACT, Icon: BiCodeAlt },
] as const;

function formatAssetAmount(amount?: string | number): string {
  // Handle undefined
  if (amount === undefined) return "0";

  // Ensure the amount is a number
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  // Check for NaN (in case the string couldn't be converted to a number)
  if (isNaN(numAmount)) return "0";

  const integerPart = Math.floor(numAmount);
  const decimalPartStr = numAmount.toString().split(".")[1] || "";

  // If it's an integer, return as is
  if (numAmount === integerPart) {
    return integerPart.toString();
  }

  // If the integer part has more than 1 digit, trim to 4 decimals
  if (integerPart >= 10) {
    return numAmount.toString().slice(0, integerPart.toString().length + 5);
  }

  // Find the first non-zero decimal and trim up to that many decimals + 3 more
  let firstNonZeroDecimal = 0;
  for (let i = 0; i < decimalPartStr.length; i++) {
    if (decimalPartStr[i] !== "0") {
      firstNonZeroDecimal = i;
      break;
    }
  }

  return numAmount
    .toString()
    .slice(0, integerPart.toString().length + firstNonZeroDecimal + 4);
}

export * from "./routes";
export { firstAndLast, formatAmount, navigationLinks, formatAssetAmount };
