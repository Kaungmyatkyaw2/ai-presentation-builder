"use client";
import { Button } from "@/components/ui/button";
import {
    containerVariants,
    CreatePageCard,
    itemVariants,
} from "@/lib/constants";
import usePromptStore from "@/store/usePromptStore";
import { motion } from "framer-motion";
import RecentPrompts from "../generate-ai/recent-prompts";
import { useEffect } from "react";

type Props = {
  onSelectOption: (option: string) => void;
};

const CreatePage = ({ onSelectOption }: Props) => {
  const { prompts, setPage } = usePromptStore();

  // useEffect(() => {
  //   setPage("create")
  // },[])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-full overflow-hidden"
    >
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-2"
      >
        <h1 className="text-4xl font-bold ">How would you like to started?</h1>
        <p className="dark:text-white/70 text-black/70">Choose your preferred method to begin</p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        className="grid gap-6 md:grid-cols-3"
      >
        {CreatePageCard.map((option) => (
          <motion.div
            key={option.type}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              transition: { duration: 0.1 },
            }}
            className={`rounded-lg ${
              option.highlight
                ? "border-red-400 border"
                : "hover:border-red-400 border"
            }`}
          >
            <motion.div
              className="w-full p-4 flex flex-col gap-y-6 items-start bg-white dark:bg-black rounded-xl"
              whileHover={{
                transition: { duration: 0.1 },
              }}
            >
              <div className="flex flex-col items-start w-full gap-y-3">
                <div>
                  <p className="text-primary text-lg font-semibold">
                    {option.title}
                  </p>
                  <p
                    className={`${
                      option.highlight ? "text-vivid" : "text-primary"
                    } text-4xl font-bold`}
                  >
                    {option.highlightedText}
                  </p>
                </div>
                <p className="dark:text-white/50 text-black/50 text-sm font-normal">
                  {option.description}
                </p>
              </div>
              <motion.div
                className="self-end"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={option.highlight ? "default" : "outline"}
                  className="w-fit rounded-xl font-bold"
                  size={"sm"}
                  onClick={() => onSelectOption(option.type)}
                >
                  {option.highlight ? "Generate" : "Continue"}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

    {prompts.length > 0 &&   <RecentPrompts />}
    </motion.div>
  );
};

export default CreatePage;
