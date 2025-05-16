import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useSlideStore } from "@/store/useSlideStore";
import { useEffect, useState } from "react";
import DraggableSlidePreview from "./draggable-slide-preview";

type Props = {};

const LayoutPreview = ({}: Props) => {
  const { getOrderedSlides, reorderSlides } = useSlideStore();
  const slides = getOrderedSlides();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== undefined) {
      setLoading(false);
    }
  }, []);

  const moveSlide = (dragIdx: number, hoverIdx: number) => {
    reorderSlides(dragIdx, hoverIdx);
  };

  return (
    <div className="w-72 h-full fixed left-0 top-20 border-r overflow-y-auto">
      <ScrollArea className="w-full h-full" suppressHydrationWarning>
        {loading ? (
          <div className="w-full px-4 flex flex-col space-y-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <div className="p-4 pb-32 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium dark:text-gray-100 text-gray-500">
                SLIDES
              </h2>
              <span
                className="text-xs dark:text-gray-200 text-gray-400"
                suppressHydrationWarning
              >
                {slides.length} slides
              </span>
            </div>
            {slides.map((slide, index) => (
              <DraggableSlidePreview
                key={slide.id || index}
                slide={slide}
                index={index}
                moveSlide={moveSlide}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LayoutPreview;
