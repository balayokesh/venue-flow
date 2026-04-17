// src/pages/CateringDashboard.jsx
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Divider, 
  Stack,
  alpha,
  useTheme
} from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const CateringDashboard = () => {
  const theme = useTheme();
  const accentColor = '#f59e0b'; // Amber for Catering

  const stats = [
    {
      title: "Pending Orders",
      value: "24",
      icon: <AccessTimeIcon />,
      color: theme.palette.warning.main,
    },
    {
      title: "Ready for Pickup",
      value: "12",
      icon: <CheckCircleIcon />,
      color: theme.palette.success.main,
    },
    {
      title: "Orders Today",
      value: "87",
      icon: <BarChartIcon />,
      color: theme.palette.info.main,
    },
    {
      title: "Avg. Prep Time",
      value: "11 min",
      icon: <RestaurantIcon />,
      color: "#a855f7", // Purple
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom fontWeight={800}>
          Catering Dashboard
        </Typography>
        <Typography color="text.secondary">
          Kitchen & Express Pickup Management
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 8 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 4, 
                border: `1px solid ${theme.palette.divider}`,
                background: alpha(stat.color, 0.05),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
              <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                {stat.title}
              </Typography>
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
          <Grid item xs={12} md={6}>
            <Paper
              component={RouterLink}
              to="/catering/orders"
              elevation={0}
              sx={{
                p: 4,
                display: 'block',
                textDecoration: 'none',
                borderRadius: 6,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 24px ${alpha(accentColor, 0.15)}`,
                  borderColor: accentColor,
                }
              }}
            >
              <Stack direction="row" spacing={3} alignItems="center">
                <Box sx={{ p: 2, bgcolor: alpha(accentColor, 0.1), borderRadius: 3, color: accentColor }}>
                  <ReceiptLongIcon sx={{ fontSize: 40 }} />
                </Box>
                <Box>
                  <Typography variant="h5" color="text.primary" fontWeight={700} gutterBottom>
                    View All Orders
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Manage incoming orders and update status
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 6,
                border: `1px solid ${theme.palette.divider}`,
                background: alpha(theme.palette.background.paper, 0.4)
              }}
            >
              <Stack direction="row" spacing={3} alignItems="center">
                <Box sx={{ p: 2, bgcolor: alpha(theme.palette.success.main, 0.1), borderRadius: 3, color: 'success.main' }}>
                  <RestaurantIcon sx={{ fontSize: 40 }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    Stand Status
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    All stands functional • Avg. wait: <Box component="span" sx={{ color: 'success.main', fontWeight: 700 }}>9 mins</Box>
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Recent Orders Preview */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5" fontWeight={700}>Recent Orders</Typography>
          <Button 
            component={RouterLink} 
            to="/catering/orders" 
            endIcon={<ArrowForwardIcon />}
            sx={{ color: accentColor, fontWeight: 700 }}
          >
            View All
          </Button>
        </Box>

        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 6, 
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'hidden'
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack divider={<Divider />} spacing={0}>
              {[
                { id: "VF-78492", seat: "Section-C-Row-12-Seat-45", status: "Preparing", color: theme.palette.warning.main },
                { id: "VF-78491", seat: "Section-B-Row-8-Seat-12", status: "Ready", color: theme.palette.success.main },
                { id: "VF-78490", seat: "Section-D-Row-15-Seat-33", status: "Received", color: theme.palette.info.main },
              ].map((order, i) => (
                <Box key={i} sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>Order #{order.id}</Typography>
                    <Typography variant="body2" color="text.secondary">Seat: {order.seat}</Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      px: 2, py: 0.5, borderRadius: 2, 
                      bgcolor: alpha(order.color, 0.1), 
                      color: order.color,
                      fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase'
                    }}
                  >
                    {order.status}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CateringDashboard;