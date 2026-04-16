import { useNavigate, useLocation } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import {
  AppBar, Toolbar, Typography, Button, Chip, Box, IconButton, Tooltip,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SportsBarIcon from '@mui/icons-material/SportsBar';

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
  const { role, roleLabel } = useRole();

  const isLanding = location.pathname === '/';
  const theme = role ? ROLE_THEME[role] : null;
  const accentColor = theme?.primary ?? '#10b981';

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${accentColor}33`,
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
              background: `linear-gradient(90deg, #fff 0%, ${accentColor} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            Venue-Flow
          </Typography>
        </Box>

        {/* ── Right side ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Current role chip — hidden on landing */}
          {role && !isLanding && (
            <Chip
              label={`${theme?.emoji} ${theme?.label}`}
              size="small"
              sx={{
                bgcolor: `${accentColor}22`,
                color: accentColor,
                border: `1px solid ${accentColor}55`,
                fontWeight: 700,
                fontSize: '0.75rem',
                display: { xs: 'none', sm: 'flex' },
              }}
            />
          )}

          {/* Home icon — smaller screens */}
          {!isLanding && (
            <Tooltip title="Go to home">
              <IconButton
                size="small"
                sx={{ color: 'grey.400', display: { xs: 'flex', sm: 'none' } }}
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
                borderColor: accentColor,
                color: accentColor,
                fontWeight: 700,
                fontSize: '0.8rem',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: `${accentColor}22`,
                  borderColor: accentColor,
                },
              }}
            >
              Switch Role
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
