// src/pages/AdminDashboard.jsx
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Link, 
  Divider, 
  Stack,
  alpha,
  useTheme
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import QrCodeIcon from '@mui/icons-material/QrCode';
import StoreIcon from '@mui/icons-material/Store';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AdminDashboard = () => {
  const theme = useTheme();

  const stats = [
    {
      title: "Total Orders Today",
      value: "142",
      change: "+18%",
      color: theme.palette.success.main,
    },
    {
      title: "Active Orders",
      value: "37",
      change: "In Progress",
      color: theme.palette.warning.main,
    },
    {
      title: "QR Codes Generated",
      value: "248",
      change: "This Week",
      color: theme.palette.info.main,
    },
    {
      title: "Avg. Order Value",
      value: "₹680",
      change: "+12%",
      color: theme.palette.success.main,
    }
  ];

  const quickActions = [
    {
      title: "QR Code Generator",
      desc: "Generate and print QR codes for seats",
      icon: <QrCodeIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
      link: "/admin/qr-generator"
    },
    {
      title: "Manage Pickup Stands",
      desc: "Add, edit or remove Express Pickup counters",
      icon: <StoreIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.main,
      link: "/admin/stands"
    },
    {
      title: "Manage Menu",
      desc: "Update food items and pricing",
      icon: <RestaurantMenuIcon sx={{ fontSize: 40 }} />,
      color: "#a855f7", // Purple
      link: "/admin/menu"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom fontWeight={800}>
          Admin Dashboard
        </Typography>
        <Typography color="text.secondary">
          Welcome back, Venue Organizer
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 8 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 4, 
                border: `1px solid ${theme.palette.divider}`,
                background: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {stat.title}
              </Typography>
              <Typography variant="h4" fontWeight={700} sx={{ my: 1 }}>
                {stat.value}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <TrendingUpIcon sx={{ fontSize: 16, color: stat.color }} />
                <Typography variant="caption" sx={{ color: stat.color, fontWeight: 700 }}>
                  {stat.change}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 4 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={4}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                component={RouterLink}
                to={action.link}
                elevation={0}
                sx={{
                  p: 4,
                  display: 'block',
                  textDecoration: 'none',
                  borderRadius: 6,
                  transition: 'all 0.3s ease',
                  border: `1px solid ${theme.palette.divider}`,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 24px ${alpha(action.color, 0.1)}`,
                    borderColor: action.color,
                  }
                }}
              >
                <Box sx={{ color: action.color, mb: 3 }}>
                  {action.icon}
                </Box>
                <Typography variant="h6" color="text.primary" fontWeight={700} gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recent Activity */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5" fontWeight={700}>
            Recent Activity
          </Typography>
          <Button 
            component={RouterLink} 
            to="/catering/orders" 
            endIcon={<ArrowForwardIcon />}
            sx={{ fontWeight: 700 }}
          >
            View All
          </Button>
        </Box>

        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 6, 
            overflow: 'hidden',
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: alpha(theme.palette.background.paper, 0.3)
          }}
        >
          <Box sx={{ p: 4 }}>
            <Stack divider={<Divider sx={{ my: 2 }} />} spacing={3}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>Order #VF-78492 placed</Typography>
                  <Typography variant="body2" color="text.secondary">Seat C-12-45 • 3 items • ₹740</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'warning.main', whiteSpace: 'nowrap' }}>Just now</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>QR Codes generated for Section D</Typography>
                  <Typography variant="body2" color="text.secondary">Rows 8–14 • 84 QR codes</Typography>
                </Box>
                <Typography variant="caption" color="text.disabled" sx={{ whiteSpace: 'nowrap' }}>2 hours ago</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>Stand A wait time updated</Typography>
                  <Typography variant="body2" color="text.secondary">Now showing 8 minutes</Typography>
                </Box>
                <Typography variant="caption" color="text.disabled" sx={{ whiteSpace: 'nowrap' }}>Yesterday</Typography>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminDashboard;