import React from "react";
import { useRef, useState } from "react";
import { StyledDropdown } from "./Dropdown.styles";
import { useTheme } from "Utils";
import { MenuButton } from "Components";
import { StyledStatusBarEntry } from "../StatusBar/StatusBar.style";

export const DropdownStatusBar = ({
  id,
  title,
  baseHeight,
  width,
  down,
  setter,
  possibleValues,
  onOpen,
  children,
}: {
  id: string;
  title: string;
  baseHeight: number;
  width: number;
  down: boolean;
  setter: Function;
  possibleValues: any[];
  onOpen: () => void;
  children: any;
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [right, setRight] = useState<any>(width / 2 + 13);
  const dropdown = useRef<HTMLDivElement>(null);

  const changeValue = (e: any, value: any) => {
    e.preventDefault();
    setter(value);
    setOpen(false);
  };

  const closeOpenMenus = (e: any) => {
    if (open && !dropdown.current?.contains(e.target)) {
      setOpen(false);
    }
  };

  const checkPosition = (x: number) => {
    if (x + width / 2 > window.innerWidth) {
      // To the left
      setRight(x);
    } else if (x < width / 2) {
      // To the right
      setRight(x - width);
    } else {
      // In the middle
      setRight(x - width / 2 + 13);
    }
  };

  document.addEventListener("mousedown", closeOpenMenus);

  return (
    <div ref={dropdown}>
      <StyledStatusBarEntry
        id={id}
        title={title}
        onClick={(e: any) => {
          e.preventDefault();
          onOpen();
          checkPosition(e.clientX);
          setOpen(!open);
        }}
        text={theme.palette.text}
      >
        {children}
      </StyledStatusBarEntry>
      {open && possibleValues.length > 0 && (
        <StyledDropdown
          color={theme.palette.text}
          bgColor={theme.palette.primary}
          hoverColor={theme.palette.secondary}
          roundness={theme.roundness}
          width={width}
          height={baseHeight + possibleValues.length * 34}
          left={right}
          down={down}
        >
          {possibleValues.map((name, index) => (
            <button
              key={`Dropdown${index}`}
              onClick={(e: any) => changeValue(e, name)}
            >
              {name}
            </button>
          ))}
        </StyledDropdown>
      )}
    </div>
  );
};

export const DropdownIcon = ({
  id,
  title,
  width,
  setter,
  possibleValues,
  children,
}: {
  id: string;
  title: string;
  width: number;
  down: boolean;
  setter: Function;
  possibleValues: any[];
  children: any;
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [right, setRight] = useState<any>(width / 2 + 13);
  const dropdown = useRef<HTMLDivElement>(null);

  const changeValue = (e: any, value: any) => {
    e.preventDefault();
    setter(value);
    setOpen(false);
  };

  const closeOpenMenus = (e: any) => {
    if (open && !dropdown.current?.contains(e.target)) {
      setOpen(false);
    }
  };

  const checkPosition = (x: number) => {
    if (x + width / 2 > window.innerWidth) {
      // To the left
      setRight(x);
    } else if (x < width / 2) {
      // To the right
      setRight(x - width);
    } else {
      // In the middle
      setRight(x - width / 2 + 13);
    }
  };

  document.addEventListener("mousedown", closeOpenMenus);

  return (
    <div ref={dropdown}>
      <MenuButton
        id={id}
        title={title}
        onClick={(e: any) => {
          checkPosition(e.clientX);
          e.preventDefault();
          setOpen(!open);
        }}
      >
        {children}
      </MenuButton>
      {open && (
        <StyledDropdown
          color={theme.palette.text}
          bgColor={theme.palette.primary}
          hoverColor={theme.palette.secondary}
          roundness={theme.roundness}
          width={width}
          left={right}
        >
          {possibleValues.map((name, index) => (
            <button
              key={`Dropdown${index}`}
              onClick={(e: any) => changeValue(e, name)}
            >
              {name}
            </button>
          ))}
        </StyledDropdown>
      )}
    </div>
  );
};
