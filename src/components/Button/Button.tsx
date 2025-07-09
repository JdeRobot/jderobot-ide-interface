import { useTheme } from "Utils";
import { StyledButton } from "./Button.styles";
export type ButtonVariant = "standard" | "colored" | "tab";
export type IconVariant = "fill" | "stroke";

const Button = ({
  active = false,
  isLabel = false,
  variant = "standard",
  iconType,
  title,
  id,
  onClick,
  children,
}: {
  active: boolean;
  isLabel: boolean;
  variant: ButtonVariant;
  iconType: IconVariant;
  title: string;
  id: string;
  onClick: Function;
  children: any;
}) => {
  const theme = useTheme();

  return (
    <StyledButton
      bgColor={theme.palette?.secondary}
      color={theme.palette?.text}
      roundness={theme.roundness}
      variant={variant}
      isLabel={isLabel}
      iconType={iconType}
      title={title}
      id={id}
      active={active}
      onClick={(e: any) => onClick(e)}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

export const MenuButton = ({
  title,
  id,
  onClick,
  children,
}: {
  title: string;
  id: string;
  onClick: Function;
  children: any;
}) => {
  return (
    <Button
      active={false}
      variant="standard"
      iconType="fill"
      isLabel={false}
      title={title}
      id={id}
      onClick={(e: any) => onClick(e)}
    >
      {children}
    </Button>
  );
};

export const MenuButtonStroke = ({
  title,
  id,
  onClick,
  children,
}: {
  title: string;
  id: string;
  onClick: Function;
  children: any;
}) => {
  return (
    <Button
      active={false}
      variant="standard"
      iconType="stroke"
      isLabel={false}
      title={title}
      id={id}
      onClick={(e: any) => onClick(e)}
    >
      {children}
    </Button>
  );
};

export const MenuButtonLabel = ({
  title,
  id,
  onClick,
  children,
}: {
  title: string;
  id: string;
  onClick: Function;
  children: any;
}) => {
  return (
    <Button
      active={false}
      variant="standard"
      iconType="fill"
      isLabel={true}
      title={title}
      id={id}
      onClick={(e: any) => onClick(e)}
    >
      {children}
    </Button>
  );
};
