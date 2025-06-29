import { Box } from "@mui/material";
interface RegisterUsersProps {
  open: boolean;
  onClose: () => void;
}

export const RegisterUsers = ({ open, onClose }: RegisterUsersProps) => {
    return (
        <Box
            sx={{
                display: open ? "block" : "none",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 24,
                }}
                onClick={(e) => e.stopPropagation()}
            >
            </Box>
        </Box>
    )
}