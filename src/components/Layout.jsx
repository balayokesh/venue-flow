import Navbar from './Navbar';
import { Box } from '@mui/material';

// ---------------------------------------------------------------------------
// Layout — wraps every page with the sticky Navbar + a full-height shell.
// ---------------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
    </Box>
  );
}
