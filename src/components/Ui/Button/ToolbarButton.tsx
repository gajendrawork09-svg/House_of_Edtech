"use client";

import { Button, Tooltip } from "antd";
import { ReactNode } from "react";

interface ToolbarButtonProps {
  icon: ReactNode;
  title: string;
  active?: boolean;
  onClick?: () => void;
}

const ToolbarButton = ({
  icon,
  title,
  active = false,
  onClick,
}: ToolbarButtonProps) => {
  return (
    <Tooltip title={title}>
      <Button
        type={active ? "primary" : "text"}
        icon={icon}
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default ToolbarButton;