import { updateProjectSellable } from "@/actions/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSlideStore } from "@/store/useSlideStore";
import { Monitor } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const SellTemplate = ({ presentationId }: { presentationId: string }) => {
  const { currentTheme } = useSlideStore();
  const router = useRouter();
  const [salePrice, setSalePrice] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!salePrice) {
      return toast.error("Error", {
        description: "Sale price is required.",
      });
    }

    try {
      setIsLoading(true);

      const res = await updateProjectSellable(
        presentationId,
        Number.parseInt(salePrice)
      );

      if (res.status != 200) {
        toast.error("Error", {
          description: res.error || "Failed to set sellable for the project.",
        });
        return;
      }

      toast.success("Success", {
        description: "Successfully set the project to sell.",
      });
      setSalePrice("");

      router.refresh();
    } catch (error) {
      toast.error("Error", {
        description: "Failed to set sellable for the project.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          style={{ backgroundColor: currentTheme.backgroundColor }}
          variant={"outline"}
          disabled={isLoading}
          className="cursor-pointer"
        >
          <Monitor className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="center" className="w-[300px] p-0">
        <div className="p-4 rounded-lg">
          <h1 className="text-xl font-bold">Sell your template</h1>
          <form onSubmit={handlePublish} className="w-full space-y-2 mt-3">
            <Input
              placeholder="Template price.."
              value={salePrice}
              type="number"
              onChange={(e) => setSalePrice(e.target.value)}
              disabled={isLoading}
              required
            />
            <Button
              type="submit"
              className="w-full cusror-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Publishing...." : "Publish"}
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SellTemplate;
