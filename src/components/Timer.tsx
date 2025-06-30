import { useEffect, useState, useRef } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { Auction } from "../interfaces/auctionInterface";

interface AuctionTimerProps {
  auction: Auction;
  onStatusChange: (newStatus: Auction['status']) => void;
}

export const AuctionTimer = ({ auction, onStatusChange }: AuctionTimerProps) => {
  const { startTime, duration, status } = auction;
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout>();

  // Función de cálculo robusta con validación UTC
  const calculateTimeLeft = (): number => {
    const now = Date.now();
    const start = new Date(startTime).getTime();
    const end = start + (duration * 1000);
    
    // Debug esencial
    console.log('Tiempos calculados:', {
      ahora: new Date(now).toISOString(),
      inicio: new Date(start).toISOString(),
      fin: new Date(end).toISOString(),
      segundosRestantes: Math.floor((end - now) / 1000)
    });

    return Math.max(0, Math.floor((end - now) / 1000));
  };

  useEffect(() => {
    if (status !== 'actual') return;

    const initialTimeLeft = calculateTimeLeft();
    setTimeLeft(initialTimeLeft);

    if (initialTimeLeft <= 0) {
      onStatusChange('finished');
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timerRef.current);
          onStatusChange('finished');
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, startTime, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (status !== 'actual') return null;

  return (
    <Box sx={{ 
      width: '100%', 
      px: 2, 
      mt: 1, 
      mb: 2,
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 1,
      py: 1
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <AccessTimeIcon fontSize="small" color="primary" />
        <Typography variant="body2" fontWeight="bold" color="text.primary">
          {formatTime(timeLeft)}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={(timeLeft / duration) * 100}
        color={timeLeft > duration * 0.3 ? 'primary' : 'error'}
        sx={{
          mt: 1,
          height: 8,
          borderRadius: 4,
          width: '90%',
          mx: 'auto',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
          }
        }}
      />
    </Box>
  );
};