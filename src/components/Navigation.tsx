"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useNavigation } from "@/contexts/NavigationContext";

const links = [
  {
    inactiveIcon: "/images/icon-nav-overview.svg",
    activeIcon: "/images/icon-nav-overview-active.svg",
    label: "Overview",
    url: "/",
  },
  {
    inactiveIcon: "/images/icon-nav-transactions.svg",
    activeIcon: "/images/icon-nav-overview-active.svg",
    label: "Transactions",
    url: "/transactions",
  },
  {
    inactiveIcon: "/images/icon-nav-budgets.svg",
    activeIcon: "/images/icon-nav-overview-active.svg",
    label: "Budgets",
    url: "/budgets",
  },
  {
    inactiveIcon: "/images/icon-nav-pots.svg",
    activeIcon: "/images/icon-nav-overview-active.svg",
    label: "Pots",
    url: "/pots",
  },
  {
    inactiveIcon: "/images/icon-nav-recurring-bills.svg",
    activeIcon: "/images/icon-nav-overview-active.svg",
    label: "Recurring Bills",
    url: "/bills",
  },
];

function DesktopNavItem({
  item,
  isMinimized,
}: {
  item: {
    inactiveIcon: string;
    activeIcon: string;
    url: string;
    label: string;
  };
  isMinimized: boolean;
}) {
  const { activeIcon, inactiveIcon, url, label } = item;
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
        } py-[16px] flex flex-row gap-4 ${
          isActive ? activeItem : inactiveItem
        }`}
      >
        <Image
          src={isActive ? activeIcon : inactiveIcon}
          alt="Icon"
          width="24"
          height="24"
        />
        {!isMinimized && (
          <p className={isActive ? activeLabel : inactiveLabel}>{label}</p>
        )}
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
          <Image
            src={"/images/logo-small.svg"}
            alt="f logo"
            className="mx-[32px] my-[40px]"
            width="22"
            height="22"
          />
        ) : (
          <Image
            src={"/images/logo-large.svg"}
            alt="finance logo"
            className="mx-[32px] my-[40px]"
            width="121"
            height="22"
          />
        )}
        <ul>
          {links.map((l) => (
            <DesktopNavItem key={l.url} item={l} isMinimized={isMinimized} />
          ))}
        </ul>

        <li
          className={`flex flex-row gap-4 absolute bottom-[100px] cursor-pointer ${
            isMinimized ? "left-0 justify-center w-full" : "left-[32px]"
          }`}
          onClick={toggleMinimize}
        >
          <Image
            src={"/images/icon-minimize-menu.svg"}
            alt="Minimize Menu"
            width="24"
            height="24"
            className={`transition-transform duration-300 ${isMinimized ? "rotate-180" : ""}`}
          />
          {!isMinimized && (
            <p className="text-grey-300 text-preset-3">Minimize Menu</p>
          )}
        </li>
      </nav>

      <nav className="block lg:hidden"></nav>
    </>
  );
}
