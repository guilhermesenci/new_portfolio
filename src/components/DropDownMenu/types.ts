import { ReactElement } from "react";

export interface MenuProps {
  title: string | ReactElement;
  options: MenuItenstProps[];
}

export interface MenuItenstProps {
  label: string;
  onClick: () => void;
}
