import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Page = "create" | "creative-ai" | "create-scratch";

type Prompt = {
  id: string;
  createdAt: string;
  title: string;
  outlines: OutlineCard[] | [];
};

type PromptStore = {
  page: Page;
  setPage: (page: Page) => void;
  prompts: Prompt[] | [];
  addPrompt: (prompt: Prompt) => void;
  removePrompt: (id: string) => void;
};

const usePromptStore = create<PromptStore>()(
  devtools(
    persist(
      (set) => ({
        page: "create",
        prompts: [],
        setPage: (page: Page) => {
          set({ page });
        },
        addPrompt: (prompt: Prompt) => {
          set((state) => ({
            prompts: [...state.prompts, prompt],
          }));
        },
        removePrompt: (id: string) => {
            set((state) => ({
              prompts: state.prompts.filter(p => p.id !== id),
            }));
          },
      }),
      { name: "prompts" }
    )
  )
);

export default usePromptStore;
