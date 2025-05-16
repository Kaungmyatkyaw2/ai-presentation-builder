import React from "react";

type Props = {
  children: React.ReactNode;
};

const PresentationLayout = ({ children }: Props) => {
  return <div className="w-full h-full overflow-x-hidden">{children}</div>;
};

export default PresentationLayout;
