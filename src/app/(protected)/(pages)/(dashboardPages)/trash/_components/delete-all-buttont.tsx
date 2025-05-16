"use client";

import { deleteAllProjects } from "@/actions/project";
import AlertDialogBox from "@/components/global/alert-dialog";
import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  Projects: Project[];
};

const DeleteAllButton = ({ Projects }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDeleteAllProjects = async () => {
    setLoading(true);

    if (!Projects || Projects.length === 0) {
      setLoading(false);
      toast.error("Error", {
        description: "No Project Found",
      });
      setOpen(false);
      return;
    }

    try {
      const res = await deleteAllProjects(
        Projects.map((project) => project.id)
      );

      if (res.status !== 200) {
        throw new Error("Failed to delete all projects.");
      }
      toast.success("Success", {
        description: "Successfully deleted all projects",
      });


      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Failed to delete all projects",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialogBox
      description="This action cannot be undone. This will permanetly delete all your projects and remove your data from our servers."
      className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover-bg-red-700"
      onClick={handleDeleteAllProjects}
      loading={loading}
      handleOpen={() => setOpen(!open)}
      open={open}
    >
      <Button
        size={"lg"}
        className="bg-accent dark:bg-accent hover:bg-accent/70 rounded-lg  text-primary font-semibold "
      >
        <Trash className="size-4 mr-2" /> Delete All
      </Button>
    </AlertDialogBox>
  );
};

export default DeleteAllButton;
