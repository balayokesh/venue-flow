import { useNavigate, useLocation } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { useColorMode } from '../context/ThemeContext';
import {
  AppBar, Toolbar, Typography, Button, Chip, Box, IconButton, Tooltip, useTheme
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// ---------------------------------------------------------------------------
// Navbar — appears on every page. Shows current role + Switch Role button.
// ---------------------------------------------------------------------------

// Per-role colour accents so each portal feels distinct.
const ROLE_THEME = {
  attendee: { primary: '#10b981', label: 'Attendee Portal', emoji: '🎟️' },
  admin:    { primary: '#3b82f6', label: 'Admin Portal',    emoji: '🛠️' },
  catering: { primary: '#f59e0b', label: 'Catering Portal', emoji: '👨‍🍳' },
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useRole();
  const { mode, toggleColorMode } = useColorMode();
  const theme = useTheme();

  const isLanding = location.pathname === '/';
  const roleStyles = role ? ROLE_THEME[role] : null;
  const accentColor = roleStyles?.primary ?? theme.palette.primary.main;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: theme.palette.mode === 'dark' 
          ? 'rgba(15, 23, 42, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>

        {/* ── Logo ── */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <SportsBarIcon sx={{ color: accentColor, fontSize: 28 }} />
          <Typography
            variant="h6"
            fontWeight={800}
            sx={{
              background: `linear-gradient(90deg, ${theme.palette.text.primary} 0%, ${accentColor} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            Venue-Flow
          </Typography>
        </Box>

        {/* ── Right side ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
          
          {/* Theme Toggle */}
          <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton onClick={toggleColorMode} color="inherit" size="small">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          {/* Current role chip — hidden on mobile and landing */}
          {role && !isLanding && (
            <Chip
              label={`${roleStyles?.emoji} ${roleStyles?.label}`}
              size="small"
              sx={{
                bgcolor: `${accentColor}15`,
                color: accentColor,
                border: `1px solid ${accentColor}30`,
                fontWeight: 700,
                fontSize: '0.75rem',
                display: { xs: 'none', md: 'flex' },
              }}
            />
          )}

          {/* Home icon — smaller screens */}
          {!isLanding && (
            <Tooltip title="Go to home">
              <IconButton
                size="small"
                sx={{ color: 'text.secondary', display: { xs: 'flex', sm: 'none' } }}
                onClick={() => navigate('/')}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Switch Role button — hidden on landing */}
          {!isLanding && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<SwapHorizIcon />}
              onClick={() => navigate('/')}
              sx={{
                borderColor: { xs: 'transparent', sm: accentColor },
                color: accentColor,
                fontWeight: 700,
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                textTransform: 'none',
                borderRadius: 2,
                minWidth: { xs: 'auto', sm: 'auto' },
                px: { xs: 1, sm: 2 },
                '&:hover': {
                  bgcolor: `${accentColor}10`,
                  borderColor: accentColor,
                },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Switch Role</Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Switch</Box>
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
