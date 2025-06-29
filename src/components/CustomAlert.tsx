import { Snackbar, Alert } from "@mui/material";
interface CustomAlertProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  duration?: number;
}
export const CustomAlert = ({
  open,
  onClose,
  message,
  duration = 3000,
  severity = "info",
}: CustomAlertProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      key = 'bottom-right'
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
