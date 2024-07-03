"use client";

import paths from "@/src/utils/paths";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SIDEBAR_ITEMS, TSidebarItemProps } from "@/src/config/sidebar-items";
import { DashboardSidebarItem } from "../dashboard-sidebar-item/DashboardSidebarItem";

export const DashboardSideBar = ({
  items = SIDEBAR_ITEMS,
  IS_ADMIN,
}: {
  items: TSidebarItemProps[];
  IS_ADMIN?: boolean;
}) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="absolute right-4 top-4 z-20 flex rounded-lg border-2 bg-[#FAFAFA] p-1 outline-none focus:shadow-none md:hidden"
      >
        <Bars3Icon className="h-8 w-8 text-main_blue" />
        <p className="sr-only">القائمة</p>
      </button>
      <div
        className={`${
          isSidebarOpen ? "" : "hidden"
        } fixed bottom-0 top-0 z-40 h-screen w-2/3 flex-col gap-y-8 overflow-y-auto bg-[#6a8e10] transition-all duration-300 ease-in-out md:sticky md:block md:w-[200px] lg:w-[272px]`}
      >
        <button
          className="absolute left-4 top-4 z-10 text-xl text-white md:hidden"
          onClick={handleSidebar}
        >
          <XMarkIcon className="h-6 w-6 text-white" />
          <p className="sr-only">القائمة</p>
        </button>
        <Link href={IS_ADMIN ? paths.dashboard() : "/"}>
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-20 h-20 mx-auto"
          />
        </Link>
        <div className="mb-8 mt-16 flex w-full flex-col gap-y-9 md:mt-[60px]">
          {items.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <DashboardSidebarItem
                handleSidebar={handleSidebar}
                isActive={isActive}
                key={index}
                {...item}
              />
            );
          })}
        </div>
        <div className="absolute bottom-16 right-1/2 translate-x-1/2 px-7 sm:hidden">
          {/* Add Logout Button or Alert Here */}
        </div>
      </div>
    </>
  );
};
