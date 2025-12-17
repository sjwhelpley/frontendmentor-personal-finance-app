"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
}: {
  item: {
    inactiveIcon: string;
    activeIcon: string;
    url: string;
    label: string;
  };
}) {
  const { activeIcon, inactiveIcon, url, label } = item;
  const pathname = usePathname();

  const isActive = pathname === url;

  const inactiveLabel = "text-[#B3B3B3] text-preset-3";
  const activeLabel = "text-black text-preset-3";

  const inactiveItem = "border-l-4 border-black";
  const activeItem =
    "bg-white rounded-br-[12px] rounded-tr-[12px] border-l-4 border-[#277C78]";

  return (
    <Link href={url}>
      <li
        className={`px-[32px] py-[16px] w-[90%] flex flex-row gap-4 ${
          isActive ? activeItem : inactiveItem
        }`}
      >
        <Image
          src={isActive ? activeIcon : inactiveIcon}
          alt="Icon"
          width="24"
          height="24"
        />
        <p className={isActive ? activeLabel : inactiveLabel}>{label}</p>
      </li>
    </Link>
  );
}

export default function Navigation() {
  return (
    <>
      <nav className="hidden lg:block fixed w-[300px] h-screen bg-black rounded-tr-[12px] rounded-br-[12px]">
        <Image
          src={"/images/logo-large.svg"}
          alt="Logo"
          className="mx-[32px] my-[40px]"
          width="121"
          height="22"
        />
        <ul>
          {links.map((l) => (
            <DesktopNavItem key={l.url} item={l} />
          ))}
        </ul>

        <li className="flex flex-row gap-4 absolute left-[32px] bottom-[100px]">
          <Image
            src={"/images/icon-minimize-menu.svg"}
            alt="Icon"
            width="24"
            height="24"
          />
          <p className="text-[#B3B3B3] text-preset-3">Minimize Menu</p>
        </li>
      </nav>

      <nav className="block lg:hidden"></nav>
    </>
  );
}
