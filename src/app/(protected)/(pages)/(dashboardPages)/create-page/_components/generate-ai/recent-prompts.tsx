import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { containerVariants, itemVariants } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import useCreativeAIStore from "@/store/useCreativeAIStore";
import usePromptStore from "@/store/usePromptStore";
import { motion } from "framer-motion";
import { toast } from "sonner";

const RecentPrompts = () => {
  const { prompts, setPage } = usePromptStore();
  const { addMultipleOutlines, setCurrentAiPrompt } = useCreativeAIStore();

  const handleEdit = (id: string) => {
    const prompt = prompts.find((prompt) => prompt.id === id);
    if (prompt) {
      setPage("creative-ai");
      addMultipleOutlines(prompt?.outlines);
      setCurrentAiPrompt(prompt?.title);
    } else {
      toast.error("Error", {
        description: "Prompt not found!",
      });
    }
  };

  return (
    <motion.div variants={containerVariants} className="space-y-4 !mt-20">
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-semibold text-center"
      >
        Your Recent Prompts
      </motion.h2>
      <motion.div
        variants={containerVariants}
        className="space-y-2 w-full lg:max-w-[80%] mx-auto"
      >
        {prompts.map((prompt) => (
          <motion.div key={prompt.id} variants={itemVariants}>
            <Card className="p-4 flex flex-row items-center justify-between hover:bg-accent/50 transition-color duration-300">
              <div className="max-w-[70%]">
                <h3 className="font-semibold text-xl line-clamp-1">
                  {prompt?.title}
                </h3>
                <p className="font-semibold text-sm text-muted-foreground">
                  {timeAgo(prompt?.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-vivid">Creative AI</span>
                <Button
                  variant={"default"}
                  size={"sm"}
                  className="rounded-xl bg-accent dark:hover:bg-gray-700 hover:bg-gray-200 dark:text-white text-black"
                  onClick={() => handleEdit(prompt.id)}
                >
                  Edit
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecentPrompts;
