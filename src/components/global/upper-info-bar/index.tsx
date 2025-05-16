import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "@prisma/client";
import { Upload } from "lucide-react";
import ThemeSwitcher from "../mode-toggle";
import NewProjectButton from "./new-project-button";
import SearchBar from "./upper-info-searchbar";

type Props = {
  user: User;
};

const UpperInfobar = ({ user }: Props) => {
  return (
    <header className="gap-2 sticky top-0 z-[10] flex shrink-0 flex-wrap items-center bg-background p-4 justify-between">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4 max-h-4" />

      <div className="max-w-[95%] w-full flex items-center justify-between flex-wrap gap-4">
        <SearchBar />

        <div className="flex flex-wrap gap-4 items-center justify-end">
          <ThemeSwitcher />

          <Button className="font-semibold cursor-pointer   hover:bg-muted dark:bg-accent bg-muted text-black/70 dark:text-white/95 rounded-lg">
            <Upload />
            Import
          </Button>
          <NewProjectButton user={user} />
        </div>
      </div>
    </header>
  );
};

export default UpperInfobar;
