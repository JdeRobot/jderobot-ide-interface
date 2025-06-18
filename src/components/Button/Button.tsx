import { useTheme } from "Utils";
import { StyledButton } from "./Button.styles";
export type ButtonVariant = "standard" | "colored" | "tab";

const Button = ({
  active = false,
  variant = "standard",
  title,
  id,
  onClick,
  children,
}: {
  active: boolean;
  variant: ButtonVariant;
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
      title={title}
      id={id}
      onClick={() => onClick()}
    >
      {children}
    </Button>
  );
};
