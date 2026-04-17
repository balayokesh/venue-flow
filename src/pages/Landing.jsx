// src/pages/Landing.jsx
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  alpha, 
  useTheme 
} from '@mui/material';

const Landing = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const theme = useTheme();

  const handleRoleSelect = (role) => {
    setRole(role);
    if (role === 'attendee') navigate('/attendee/order');
    if (role === 'admin') navigate('/admin');
    if (role === 'catering') navigate('/catering');
  };

  const roles = [
    {
      id: 'attendee',
      title: 'Attendee Portal',
      description: 'Scan QR at your seat and order food instantly. Enjoy the game without the queues.',
      icon: '👤',
      color: '#10b981',
    },
    {
      id: 'admin',
      title: 'Admin Portal',
      description: 'Manage QR codes, pickup stands, and update the menu items in real-time.',
      icon: '⚙️',
      color: '#3b82f6',
    },
    {
      id: 'catering',
      title: 'Catering Portal',
      description: 'Receive and manage orders efficiently. Keep attendees updated on their order status.',
      icon: '🍔',
      color: '#f59e0b',
    }
  ];

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.mode === 'dark'
          ? `radial-gradient(circle at 20% 20%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 40%), radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 40%)`
          : `radial-gradient(circle at 20% 20%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 40%)`,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '3.5rem', md: '5rem' },
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Venue-Flow
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ maxWidth: '600px', mx: 'auto', fontWeight: 400 }}
          >
            Order food from your seat. Skip the queues. Enjoy the game.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {roles.map((role) => (
            <Grid item xs={12} sm={6} md={4} key={role.id}>
              <Card 
                onClick={() => handleRoleSelect(role.id)}
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: `1px solid ${alpha(role.color, 0.1)}`,
                  background: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(8px)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(role.color, 0.15)}`,
                    borderColor: role.color,
                  }
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ fontSize: '4rem', mb: 3 }}>
                    {role.icon}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                    {role.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {role.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Landing;