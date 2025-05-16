"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Project, User } from "@/generated/prisma";
import { data } from "@/lib/constants";
import { useTheme } from "next-themes";
import React from "react";
import NavFooter from "./nav-footer";
import NavMain from "./nav-main";
import RecentOpen from "./recent-open";

type Props = {
  recentProjects: Project[];
  user: User;
} & React.ComponentProps<typeof Sidebar>;

const AppSidebar = ({ recentProjects, user, ...props }: Props) => {
  const { theme } = useTheme();

  return (
    <Sidebar collapsible="icon" className="max-w-[212px]" {...props}>
      <SidebarHeader className="pt-6 px-2 pb-0">
        <SidebarMenuButton
          size={"lg"}
          className="data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage
                src={theme == "light" ? "/dark-icon.png" : "light-icon.png"}
                alt="'vivid-logo"
                className="aspect-auto scale-90"
              />
            </Avatar>
          </div>
          <span className="truncate text-primary text-3xl font-semibold">
            Divine
          </span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="px-2 mt-10 gap-y-6">
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter prsimaUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
