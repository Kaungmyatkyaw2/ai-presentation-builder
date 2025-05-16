import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  description: string;
  loading?: boolean;
  onClick?: () => void;
  open: boolean;
  handleOpen: () => void;
};

const AlertDialogBox = ({
  children,
  className,
  description,
  loading,
  onClick,
  open,
  handleOpen,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={handleOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            className={className}
            onClick={onClick}
          >
            {loading ? (
              <>
                <Loader className="animate-spin" />
                Loading...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </AlertDialogFooter>{" "}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogBox;
