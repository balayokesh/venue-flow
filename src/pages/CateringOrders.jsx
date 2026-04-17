// src/pages/CateringOrders.jsx
import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Divider, 
  Stack,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const CateringOrders = () => {
  const theme = useTheme();
  const accentColor = '#f59e0b'; // Amber for Catering

  const [orders, setOrders] = useState([
    {
      id: "VF-78492",
      seat: "Section C, Row 12, Seat 45",
      items: [
        { name: "Classic Cheeseburger", qty: 1 },
        { name: "Large Pepsi", qty: 2 },
        { name: "Veg Paneer Wrap", qty: 1 }
      ],
      total: 740,
      status: "preparing", // received, preparing, ready, completed
      time: "2 min ago"
    },
    {
      id: "VF-78491",
      seat: "Section B, Row 8, Seat 12",
      items: [
        { name: "Chicken Shawarma", qty: 2 },
        { name: "Cold Coffee", qty: 1 }
      ],
      total: 520,
      status: "received",
      time: "8 min ago"
    },
    {
      id: "VF-78490",
      seat: "Section D, Row 15, Seat 33",
      items: [
        { name: "Veg Burger Combo", qty: 1 }
      ],
      total: 320,
      status: "ready",
      time: "15 min ago"
    }
  ]);

  const updateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    // In a real app, notify the user here
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'received': return { label: 'Received', color: 'info' };
      case 'preparing': return { label: 'Preparing', color: 'warning' };
      case 'ready': return { label: 'Ready for Pickup', color: 'success' };
      case 'completed': return { label: 'Completed', color: 'default' };
      default: return { label: status, color: 'default' };
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>Live Orders</Typography>
          <Typography color="text.secondary">Manage kitchen flow and update pickup status</Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="caption" color="text.secondary" fontWeight={700}>Active Orders</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{orders.length}</Typography>
        </Box>
      </Box>

      {/* Orders List */}
      <Stack spacing={4}>
        {orders.map((order) => {
          const status = getStatusConfig(order.status);
          return (
            <Paper 
              key={order.id}
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 4 }, 
                borderRadius: 6, 
                border: `1px solid ${theme.palette.divider}`,
                transition: 'border-color 0.3s',
                '&:hover': { borderColor: accentColor }
              }}
            >
              <Grid container spacing={4}>
                {/* Order Details */}
                <Grid item xs={12} md={7}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" fontWeight={800} sx={{ color: accentColor, fontFamily: 'monospace' }}>
                      #{order.id}
                    </Typography>
                    <Chip 
                      icon={<AccessTimeIcon sx={{ fontSize: '1rem !important' }} />} 
                      label={order.time} 
                      size="small" 
                      variant="outlined" 
                    />
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                    <LocationOnIcon fontSize="small" color="disabled" />
                    <Typography variant="subtitle1" fontWeight={700}>
                      Seat: <Box component="span" sx={{ color: 'primary.main' }}>{order.seat}</Box>
                    </Typography>
                  </Stack>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={800} sx={{ display: 'block', mb: 1, textTransform: 'uppercase' }}>
                      Order Items
                    </Typography>
                    <Stack spacing={1}>
                      {order.items.map((item, idx) => (
                        <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: alpha(theme.palette.divider, 0.05), p: 1.5, borderRadius: 2 }}>
                          <Typography variant="body1" fontWeight={500}>{item.name}</Typography>
                          <Typography variant="body1" fontWeight={800} color="text.secondary">× {item.qty}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  <Typography variant="h5" fontWeight={800}>
                    Total: ₹{order.total}
                  </Typography>
                </Grid>

                {/* Status & Actions */}
                <Grid item xs={12} md={5}>
                  <Box sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    p: 3,
                    bgcolor: alpha(theme.palette.divider, 0.03),
                    borderRadius: 4,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                  }}>
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={800} sx={{ display: 'block', mb: 1.5, textTransform: 'uppercase' }}>
                        Current Status
                      </Typography>
                      <Chip 
                        label={status.label} 
                        color={status.color} 
                        sx={{ fontWeight: 800, borderRadius: 2, height: 40, px: 2 }} 
                      />
                    </Box>

                    <Stack spacing={2}>
                      {order.status !== 'preparing' && order.status !== 'completed' && (
                        <Button 
                          fullWidth 
                          variant="contained" 
                          color="warning" 
                          startIcon={<RestaurantIcon />}
                          onClick={() => updateStatus(order.id, 'preparing')}
                          sx={{ borderRadius: 3, py: 1.5, fontWeight: 700 }}
                        >
                          Mark as Preparing
                        </Button>
                      )}
                      {order.status !== 'ready' && order.status !== 'completed' && (
                        <Button 
                          fullWidth 
                          variant="contained" 
                          color="success" 
                          startIcon={<CheckCircleIcon />}
                          onClick={() => updateStatus(order.id, 'ready')}
                          sx={{ borderRadius: 3, py: 1.5, fontWeight: 700 }}
                        >
                          Mark as Ready
                        </Button>
                      )}
                      {order.status !== 'completed' && (
                        <Button 
                          fullWidth 
                          variant="outlined" 
                          startIcon={<DoneAllIcon />}
                          onClick={() => updateStatus(order.id, 'completed')}
                          sx={{ borderRadius: 3, py: 1.5, fontWeight: 700 }}
                        >
                          Complete Order
                        </Button>
                      )}
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          );
        })}
      </Stack>

      {orders.length === 0 && (
        <Paper variant="outlined" sx={{ py: 10, textAlign: 'center', borderRadius: 6, borderStyle: 'dashed' }}>
          <DoneAllIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
          <Typography color="text.secondary">No live orders. Incoming orders will appear here.</Typography>
        </Paper>
      )}
    </Container>
  );
};

export default CateringOrders;