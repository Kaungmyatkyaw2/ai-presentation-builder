"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  onAddCard: () => void;
};

const AddCardButton = ({ onAddCard }: Props) => {
  const [showGap, setShowGap] = useState(false);

  return (
    <motion.div
      className="w-full relative overflow-hidden"
      initial={{ height: "0.5rem" }}
      animate={{
        height: showGap ? "2rem" : "0.5rem",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      onHoverStart={() => setShowGap(true)}
      onHoverEnd={() => setShowGap(false)}
    >
      <AnimatePresence>
        {showGap && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[40%] h-[1px] bg-black dark:bg-white" />
            <Button
              variant={"outline"}
              size={"sm"}
              className="rounded-full h-8 w-8 p-0 dark:bg-white dark:hover:bg-white hover:bg-black bg-black dark:text-black text-white"
              onClick={onAddCard}
              aria-label="Add new card"
            >
              <Plus className="h-4 w-4 text-black" />
            </Button>
            <div className="w-[40%] h-[1px] bg-black dark:bg-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddCardButton;
