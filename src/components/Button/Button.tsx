import { useTheme } from "Utils";
import { StyledButton } from "./Button.styles";
export type ButtonVariant = "standard" | "outlined";
const Button = ({
  active = false,
  variant = "standard",
  title,
  id,
  onClick,
  children,
}: {
  active: boolean;
  variant: "standard" | "outlined";
  title: string;
  id: string;
  onClick: Function;
  children: any;
}) => {
  const theme = useTheme();

  return (
    <StyledButton
      bgColor={theme.palette?.primary}
      color={theme.palette?.secondary}
      roundness={theme.roundness}
      variant="standard"
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
