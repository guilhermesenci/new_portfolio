import { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { MenuItenstProps, MenuProps } from "./types";
import { Typography } from "@mui/material";

const DropDownMenu = ({ title, options }: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = useCallback(
    (opt: MenuItenstProps) => {
      opt.onClick();
      handleClose();
    },
    [handleClose]
  );

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
        disabled={options.length === 0}
      >
        <Typography>{title}</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.label} onClick={() => handleClick(opt)}>
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropDownMenu;
