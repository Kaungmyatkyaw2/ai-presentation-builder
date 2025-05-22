import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "@/generated/prisma/client";
import { upgradeSubscription } from "@/lib/stripe";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const NavFooter = ({ prsimaUser }: { prsimaUser: User }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleUpgrading = async () => {
    setLoading(true);

    try {
      await upgradeSubscription();
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong. Please try later.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-y-6 items-center group-data-[collapsible=icon]:hidden">
          {!prsimaUser.subscription && (
            <div className="flex flex-col items-start p-2 pb-3 gap-4 bg-muted/45 rounded-lg">
              <div className="flex flex-col items-start gap-1">
                <p className="text-base font-bold">
                  Get <span className="text-vivid">Creative AI</span>
                </p>
                <span className="text-sm dark:text-gray-500">
                  Unlock all features including AI and more
                </span>
              </div>
              <div className="w-full bg-vivid-gradient p-[1px] rounded-full">
                <Button
                  className="w-full border-red-300 border cursor-pointer bg-sidebar hover:bg-muted/60 text-primary rounded-full font-bold"
                  variant={"default"}
                  size={"lg"}
                  onClick={handleUpgrading}
                >
                  {loading ? "Upgrading..." : "Upgrade"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SidebarMenuItem>
      <SignedIn>
        <SidebarMenuButton
          size={"lg"}
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <UserButton />{" "}
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden ">
            {" "}
            <span className="truncate font-semibold">{user?.fullName}</span>
            <span className="truncate text-gray-500 text-sm">
              {user?.emailAddresses[0]?.emailAddress}
            </span>
          </div>
        </SidebarMenuButton>
      </SignedIn>
    </SidebarMenu>
  );
};

export default NavFooter;
