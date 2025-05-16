import { cn } from '@/lib/utils';
import { useSlideStore } from '@/store/useSlideStore';

type Props = {
  items: string[];
  onItemClick: (id: string) => void;
  className?: string;
};

const TableOfContents = ({ items, onItemClick, className }: Props) => {
  const { currentTheme } = useSlideStore();
  return (
    <nav
      className={cn("space-y-2", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, idx) => (
        <div className={cn("cursor-pointer hover:underline")}>{item}</div>
      ))}
    </nav>
  );
};

export default TableOfContents;
