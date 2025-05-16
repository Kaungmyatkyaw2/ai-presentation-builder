import { MasterRecursiveComponent } from "@/app/(protected)/presentation/[presentationId]/[_components]/editor/master-recursive-component";
import { Slide, Theme } from "@/lib/types";
import { Image } from "lucide-react";

type Props = {
  slide: Slide;
  theme: Theme;
};

const ThumbnailPreview = ({ slide, theme }: Props) => {
  return (
    <div
      className="w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-alll duration-200 p-2"
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slideBackgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
    >
      {slide ? (
        <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidde">
          <MasterRecursiveComponent
            slideId={slide.id}
            content={slide.content}
            onContentChange={() => {}}
            isPreview={true}
          />
        </div>
      ) : (
        <div className="w-full h-full bg-gray-400 flex justify-center items-center">
          <Image className="w-6 h-6 text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default ThumbnailPreview;
