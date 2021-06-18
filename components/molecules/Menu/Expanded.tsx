import { ReactNode, useState, useRef, useEffect, KeyboardEvent } from "react";
import clsx from "clsx";
import { Link } from ".";
import { Item } from "./Item";
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import { VirtualElement } from "@popperjs/core";
import Collapse from "@material-ui/core/Collapse";

type MenuProps = {
  name: string;
  open: boolean;
  anchorEl?: VirtualElement;
  onClose: (event: MouseEvent | TouchEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  children: ReactNode;
  className?: string;
};
function Menu({
  name,
  anchorEl,
  open,
  onClose,
  onKeyDown,
  children,
  className,
}: MenuProps) {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      role={undefined}
      transition
      disablePortal
      placement="bottom"
      className="w-full"
      keepMounted
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper className={className}>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList id={name} autoFocusItem={open} onKeyDown={onKeyDown}>
                {children}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}

type ExpandedProps = {
  label: string;
  icon: ReactNode;
  items: Link[];
  className: string;
};
export function Expanded({ label, icon, items, className }: ExpandedProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full xl:w-auto">
        <button
          ref={anchorRef}
          className={clsx(
            className,
            "lg:border-b-4",
            open ? "lg:border-gold-light" : "lg:border-transparent",
            open && "lg:bg-green-darkest lg:text-gold-light"
          )}
          aria-haspopup="true"
          aria-expanded={open ? "true" : "false"}
          aria-controls={label}
          onClick={handleToggle}
        >
          <span className="w-8" aria-hidden>
            {icon}
          </span>

          <span>{label}</span>
        </button>

        <Collapse in={open}>
          <ul role="menu" id={label} aria-label={label} className="lg:hidden">
            {items.map((item) => (
              <li key={item.label}>
                <Item
                  className="pl-24 lg:pl-0 lg:text-black lg:hover:bg-white mx-auto"
                  {...item}
                />
              </li>
            ))}
          </ul>
        </Collapse>

        <Menu
          name={label}
          anchorEl={anchorRef?.current || undefined}
          open={open}
          onClose={handleClose}
          onKeyDown={handleListKeyDown}
          className={clsx("hidden lg:block", !open && "lg:hidden")}
        >
          {items.map((item) => (
            <MenuItem key={item.label}>
              <Item
                className="lg:text-black lg:hover:bg-white  mx-auto"
                {...item}
              />
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}
