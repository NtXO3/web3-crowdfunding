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

export * from "./routes";
export { firstAndLast, formatAmount, navigationLinks };
