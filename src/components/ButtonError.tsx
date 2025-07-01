import { Button } from "@mui/material";
import { useState } from "react";

export const BrokenComponent = () => {
  const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error("¡Componente roto! Esto es una simulación de error.");
  }

  return (
    <Button variant="contained" color="error" onClick={() => setCrash(true)}>
      Hacer fallar componente
    </Button>
  );
};
