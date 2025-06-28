import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { t } from "i18next";

function LoginPage() {
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Card sx={{ boxShadow: 3, maxWidth: 400 }}>
        <CardContent
          sx={{
            padding: 4,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              marginY: 2,
            }}
            variant="h5"
            component="h1"
            gutterBottom
          >
            {t("LoginPage.title")}
          </Typography>
          <form>
            <TextField
              id="input-username-textfield"
              label={t("LoginPage.userName")}
              type="text"
              name="username"
              fullWidth
              sx={{ marginY: 1 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                },
              }}
              variant="standard"
            />
            <TextField
              id="input-password-textfield"
              label={t("LoginPage.password")}
              type="password"
              name="password"
              fullWidth
              variant="standard"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                marginY: 1,
              }}
            />
            <Button
              sx={{
                marginTop: 2,
                width: "100%",
              }}
              variant="contained"
              type="submit"
            >
              {t("LoginPage.submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
