import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  children: ReactNode;
}

export const MetaItem = ({ icon, children }: Props) => {
  return (
    <span className="flex items-center gap-1.5 text-gray-600">
      {icon}
      {children}
    </span>
  );
};
