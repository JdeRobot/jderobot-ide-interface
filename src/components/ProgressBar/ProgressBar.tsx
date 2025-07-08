import { useTheme } from "Utils";
import { StyledProgressBar } from "./ProgressBar.style";

const ProgressBar = ({ completed }: { completed: number }) => {
  const theme = useTheme();

  return (
    <StyledProgressBar
      text={theme.palette.text}
      color={theme.palette.progressBar.color}
      bgColor={theme.palette.progressBar.background}
      progress={completed}
    >
      <div>
        <span>{`${completed.toFixed(2)}%`}</span>
      </div>
    </StyledProgressBar>
  );
};

export default ProgressBar;
