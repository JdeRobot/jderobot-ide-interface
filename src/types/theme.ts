export interface Theme {
  palette: {
    text?: string;
    darkText?: string;
    placeholderText?: string;
    success?: string;
    warning?: string;
    error?: string;
    background: string;
    primary?: string;
    secondary?: string;
    scrollbar?: string;
    border: {
      warning: string;
      error: string;
      info: string;
    };
    progressBar: {
      background: string;
      color: string;
    };
    button: {
      error: string;
      success: string;
      warning: string;
      info: string;
      hoverError: string;
      hoverSuccess: string;
      hoverWarning: string;
      hoverInfo: string;
    };
    selectedGradient: string;
  };
  roundness?: number;
  transitionSpeed?: number;
  monacoTheme?: string;
}
