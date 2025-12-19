"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useNavigation } from "@/contexts/NavigationContext";

import IconNavOverview from "@/assets/images/icon-nav-overview.svg";
import IconNavTransactions from "@/assets/images/icon-nav-transactions.svg";
import IconNavBudgets from "@/assets/images/icon-nav-budgets.svg";
import IconNavPots from "@/assets/images/icon-nav-pots.svg";
import IconNavRecurringBills from "@/assets/images/icon-nav-recurring-bills.svg";
import LogoSmall from "@/assets/images/logo-small.svg";
import LogoLarge from "@/assets/images/logo-large.svg";
import IconMinimizeMenu from "@/assets/images/icon-minimize-menu.svg";

const links = [
  {
    Icon: IconNavOverview,
    label: "Overview",
    url: "/",
  },
  {
    Icon: IconNavTransactions,
    label: "Transactions",
    url: "/transactions",
  },
  {
    Icon: IconNavBudgets,
    label: "Budgets",
    url: "/budgets",
  },
  {
    Icon: IconNavPots,
    label: "Pots",
    url: "/pots",
  },
  {
    Icon: IconNavRecurringBills,
    label: "Recurring Bills",
    url: "/bills",
  },
];

function DesktopNavItem({
  item,
  isMinimized,
}: {
  item: {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    url: string;
    label: string;
  };
  isMinimized: boolean;
}) {
  const { Icon, url, label } = item;
  const pathname = usePathname();

  const isActive = pathname === url;

  const inactiveLabel = "text-grey-300 text-preset-3";
  const activeLabel = "text-foreground text-preset-3";

  const inactiveItem = "border-l-4 border-foreground";
  const activeItem =
    "bg-background rounded-br-[12px] rounded-tr-[12px] border-l-4 border-secondary-green";

  return (
    <Link href={url}>
      <li
        className={`${
          isMinimized ? "px-0 justify-center w-[90%]" : "px-[32px] w-[90%]"
        } py-[16px] flex flex-row items-center gap-4 ${
          isActive ? activeItem : inactiveItem
        }`}
      >
        <Icon
          className={`flex-shrink-0 ${
            isActive ? "[&_path]:fill-[#277C78]" : "[&_path]:fill-[#b3b3b3]"
          }`}
        />
        {!isMinimized && (
          <p className={isActive ? activeLabel : inactiveLabel}>{label}</p>
        )}
      </li>
    </Link>
  );
}

function MobileNavItem({
  item,
}: {
  item: {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    url: string;
    label: string;
  };
}) {
  const { Icon, url, label } = item;
  const pathname = usePathname();

  const isActive = pathname === url;

  const inactiveItem = "border-b-4 border-foreground";
  const activeItem =
    "bg-background rounded-tl-[12px] rounded-tr-[12px] border-b-4 border-secondary-green";

  return (
    <Link href={url} className="flex-1 h-full">
      <li className={`flex flex-col items-center justify-end gap-1 h-full`}>
        <div
          className={`flex flex-col items-center justify-center gap-1 h-full w-full ${
            isActive ? activeItem : inactiveItem
          }`}
        >
          <Icon
            className={`flex-shrink-0 ${
              isActive ? "[&_path]:fill-[#277C78]" : "[&_path]:fill-[#b3b3b3]"
            }`}
          />
          <p
            className={`hidden md:block text-preset-5-bold ${
              isActive ? "text-secondary-green" : "text-grey-300"
            }`}
          >
            {label}
          </p>
        </div>
      </li>
    </Link>
  );
}

export default function Navigation() {
  const { isMinimized, toggleMinimize } = useNavigation();

  return (
    <>
      <nav
        className={`hidden lg:block fixed h-screen bg-foreground rounded-tr-[12px] rounded-br-[12px] transition-all duration-300 ${
          isMinimized ? "w-[88px]" : "w-[300px]"
        }`}
      >
        {isMinimized ? (
          <LogoSmall
            className="mx-[32px] my-[40px] w-[22px] h-[22px] [&_path]:fill-white"
            aria-label="f logo"
          />
        ) : (
          <LogoLarge
            className="mx-[32px] my-[40px] w-[121px] h-[22px] [&_path]:fill-white"
            aria-label="finance logo"
          />
        )}
        <ul>
          {links.map((l) => (
            <DesktopNavItem key={l.url} item={l} isMinimized={isMinimized} />
          ))}
        </ul>

        <li
          className={`flex flex-row items-center gap-4 absolute bottom-[100px] cursor-pointer ${
            isMinimized ? "left-0 justify-center w-full" : "left-[32px]"
          }`}
          onClick={toggleMinimize}
        >
          <IconMinimizeMenu
            className={`flex-shrink-0 transition-transform duration-300 [&_path]:fill-[#b3b3b3] ${
              isMinimized ? "rotate-180" : ""
            }`}
            aria-label="Minimize Menu"
          />
          {!isMinimized && (
            <p className="text-grey-300 text-preset-3">Minimize Menu</p>
          )}
        </li>
      </nav>

      <nav className="block lg:hidden fixed bottom-0 left-0 right-0 h-[75px] bg-grey-900">
        <ul className="flex flex-row items-center justify-around gap-4 h-full px-[40px] pt-[8px]">
          {links.map((l) => (
            <MobileNavItem key={l.url} item={l} />
          ))}
        </ul>
      </nav>
    </>
  );
}
