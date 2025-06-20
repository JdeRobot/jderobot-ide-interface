import { useTheme } from "Utils";
import { StyledModalCardsEntry } from "./ProgressBar.style";

const ProgressBar = ({ completed }: { completed: number }) => {
  const theme = useTheme();

  return (
    <StyledModalCardsEntry
      text={theme.palette.text}
      color={theme.palette.progressBar.color}
      bgColor={theme.palette.progressBar.background}
      progress={completed}
    >
      <div>
        <span>{`${completed.toFixed(2)}%`}</span>
      </div>
    </StyledModalCardsEntry>
  );
};

export default ProgressBar;
