import { useTheme } from "Utils";
import { StyledButton } from "./Button.styles";
export type ButtonVariant = "standard" | "colored" | "tab";
export type IconVariant = "fill" | "stroke";

const Button = ({
  active = false,
  variant = "standard",
  iconType,
  title,
  id,
  onClick,
  children,
}: {
  active: boolean;
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
      iconType={iconType}
      title={title}
      id={id}
      active={active}
      onClick={() => onClick()}
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
      title={title}
      id={id}
      onClick={() => onClick()}
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
      title={title}
      id={id}
      onClick={() => onClick()}
    >
      {children}
    </Button>
  );
};
