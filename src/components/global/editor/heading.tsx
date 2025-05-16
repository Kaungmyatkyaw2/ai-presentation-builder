"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface HeadingProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  styles?: React.CSSProperties;
  isPreview?: boolean;
}

const createHeading = (displayName: string, defaultClassName: string) => {
  const Heading = React.forwardRef<HTMLTextAreaElement, HeadingProps>(
    ({ children, className, styles, isPreview = false, ...props }, ref) => {
      const textareaRef = useRef<HTMLTextAreaElement>(null);

      useEffect(() => {
        const textarea = textareaRef.current;

        if (textarea && !isPreview) {
          const adjustHeight = () => {
            textarea.style.height = "0";
            textarea.style.height = `${textarea.scrollHeight}px`;
          };
          textarea?.addEventListener("input", adjustHeight);
          adjustHeight();

          return () => {
            textarea?.removeEventListener("input", adjustHeight);
          };
        }
      }, [isPreview]);

      const previewClssName = isPreview ? "text-xs" : "";
      return (
        <textarea
          className={cn(
            `w-full bg-transparent ${defaultClassName} ${previewClssName} font-normal text-gray-900 placeholder:text-gray-300 focus:outline-none resize-none overflow-hidden leading-tight`,
            className
          )}
          style={{
            padding: 0,
            margin: 0,
            color: "inherit",
            boxSizing: "content-box",
            lineHeight: "1.2em",
            minHeight: "1.2em",
            ...styles,
          }}
          ref={(el) => {
            (textareaRef.current as HTMLTextAreaElement | null) = el;
            if (typeof ref == "function") {
              ref(el);
            } else if (ref) {
              ref.current = el;
            }
          }}
          readOnly={isPreview}
          {...props}
        ></textarea>
      );
    }
  );

  Heading.displayName = displayName;
  return Heading;
};

const Heading1 = createHeading("Heading1", "text-4xl");
const Heading2 = createHeading("Heading1", "text-3xl");
const Heading3 = createHeading("Heading1", "text-2xl");
const Heading4 = createHeading("Heading1", "text-xl");
const Title = createHeading("Heading1", "text-5xl");

export { Heading1, Heading2, Heading3, Heading4, Title };
