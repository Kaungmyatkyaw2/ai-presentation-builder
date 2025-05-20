"use client";

import { deleteProject, recoverProject } from "@/actions/project";
import { Button } from "@/components/ui/button";
import { itemVariants, themes } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import AlertDialogBox from "../alert-dialog";
import ThumbnailPreview from "./thumbnail-preview";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDeleted?: boolean;
  isSellable?: boolean;
  slideData: JsonValue;
  themeName: string;
  forSold?: boolean;
};

const ProjectCard = ({
  projectId,
  title,
  createdAt,
  themeName,
  isDeleted,
  slideData,
  isSellable,
  forSold,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setSlides, project } = useSlideStore();

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project not found",
      });
      return;
    }

    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        toast.error("Oppse!", {
          description: res.error || "Something went wrong!",
        });
        return;
      }
      setOpen(false);
      router.refresh();
      toast.success("Success", {
        description: "Project recovered successfully",
      });
    } catch (error) {
      toast.error("Oppse!", {
        description: "Something went wrong! Please contact support.",
      });
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project not found",
      });
      return;
    }

    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200) {
        toast.error("Oppse!", {
          description: res.error || "Something went wrong!",
        });
        return;
      }
      setOpen(false);
      router.refresh();
      toast.success("Success", {
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast.error("Oppse!", {
        description: "Something went wrong! Please contact support.",
      });
    }
  };

  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDeleted && "hover:bg-muted/50"
      }`}
      variants={itemVariants}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        <ThumbnailPreview
          theme={themes.find((theme) => themeName == theme?.name) || themes[0]}
          slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        />
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-white/90 line-clamp-1">
            {title} This is the title
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>
            {forSold ? (
              <Button
                size={"sm"}
                variant={"ghost"}
                className="bg-muted dark:bg-muted"
                disabled={loading}
              >
                Buy
              </Button>
            ) : isDeleted ? (
              <AlertDialogBox
                description="This will recover your project and restore your data."
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                loading={loading}
                open={open}
                handleOpen={() => setOpen(!open)}
                onClick={handleRecover}
              >
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="bg-muted dark:bg-muted"
                  disabled={loading}
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="This will recover your project and restore your data."
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                loading={loading}
                open={open}
                handleOpen={() => setOpen(!open)}
                onClick={handleDelete}
              >
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="bg-muted dark:bg-muted"
                  disabled={loading}
                >
                  Delete
                </Button>
              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
