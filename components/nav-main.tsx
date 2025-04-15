"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const pathName = usePathname();
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel></SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => (
          <Link key={item.title} href={item.url}>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={cn(
                  pathName.startsWith(item.url) && "bg-accent text-primary"
                )}
                tooltip={item.title}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
