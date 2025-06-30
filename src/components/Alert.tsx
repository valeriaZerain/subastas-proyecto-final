import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertDialogProps {
  open: boolean;
  handleCloseOk: () => void;
  handleCloseCancel: () => void;
  title: string;
  description: string;
  ok: string;
  cancel: string;
}

export const AlertDialog = ({
  open,
  handleCloseOk,
  handleCloseCancel,
  title,
  description,
  ok,
  cancel,
}: AlertDialogProps) => {
  return (
    <Dialog open={open} onClose={handleCloseCancel}>
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseCancel} color="error">{cancel}</Button>
        <Button onClick={handleCloseOk} autoFocus>
          {ok}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
