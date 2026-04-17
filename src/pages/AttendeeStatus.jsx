// src/pages/AttendeeStatus.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
  alpha,
  useTheme,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const STEPS = ['Received', 'Preparing', 'Ready for Pickup', 'Completed'];
const STATUS_MAP = {
  'received': 0,
  'preparing': 1,
  'ready': 2,
  'completed': 3
};

const AttendeeStatus = () => {
  const [searchParams] = useSearchParams();
  const theme = useTheme();

  const [seat, setSeat] = useState('');
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('preparing'); // received, preparing, ready, completed

  useEffect(() => {
    const seatParam = searchParams.get('seat');
    setSeat(seatParam || 'Section C, Row 12, Seat 45');

    // Mock order data
    setOrder({
      orderId: "VF-78492",
      seat: seatParam || 'Section C, Row 12, Seat 45',
      items: [
        { name: "Classic Cheeseburger", price: 280, quantity: 1 },
        { name: "Large Pepsi", price: 120, quantity: 2 },
        { name: "Veg Paneer Wrap", price: 220, quantity: 1 }
      ],
      total: 740,
      estimatedTime: 12,
      placedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }, [searchParams]);

  const activeStep = STATUS_MAP[status];

  const simulateStatusChange = () => {
    const sequence = ['received', 'preparing', 'ready', 'completed'];
    const currentIndex = sequence.indexOf(status);
    const nextIndex = (currentIndex + 1) % sequence.length;
    setStatus(sequence[nextIndex]);
  };

  if (!order) return null;

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>Order Status</Typography>
        <Typography color="primary" fontWeight={700}>Seat: {seat}</Typography>
      </Box>

      {/* Status Visualization */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 6,
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.paper, 0.6)
        }}
      >
        <Box sx={{ mb: 6 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box
          sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: status === 'ready' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.primary.main, 0.1),
            textAlign: 'center',
            mb: 4,
            border: `1px dashed ${status === 'ready' ? theme.palette.success.main : theme.palette.primary.main}`
          }}
        >
          <Typography
            variant="h5"
            fontWeight={800}
            color={status === 'ready' ? 'success.main' : 'primary.main'}
            gutterBottom
          >
            {STEPS[activeStep]}
          </Typography>
          {status === 'ready' && (
            <Typography variant="body2" color="success.dark" fontWeight={600}>
              Please proceed to the nearest Express Pickup counter
            </Typography>
          )}
          {status !== 'completed' && status !== 'ready' && (
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
              <AccessTimeIcon fontSize="small" color="primary" />
              <Typography variant="body2" color="primary.dark" fontWeight={600}>
                Est. {order.estimatedTime} mins remaining
              </Typography>
            </Stack>
          )}
        </Box>

        {/* Order Details */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <ReceiptLongIcon color="disabled" />
            <Typography variant="h6" fontWeight={700}>Order #78492</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">Placed at {order.placedTime}</Typography>
        </Box>

        <Stack spacing={2} sx={{ mb: 4 }}>
          {order.items.map((item, idx) => (
            <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography fontWeight={600}>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
              </Box>
              <Typography fontWeight={700}>₹{item.price * item.quantity}</Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight={800}>Total Amount</Typography>
          <Typography variant="h6" fontWeight={900} color="primary">₹{order.total}</Typography>
        </Box>
      </Paper>

      {/* Buttons */}
      <Stack spacing={2}>
        {status === 'ready' && (
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<CheckCircleIcon />}
            sx={{ py: 2, borderRadius: 4, fontWeight: 800, bgcolor: 'success.main', '&:hover': { bgcolor: 'success.dark' } }}
          >
            I've Picked Up My Order
          </Button>
        )}

        <Button
          variant="outlined"
          fullWidth
          onClick={simulateStatusChange}
          sx={{ borderRadius: 4, py: 1.5, borderColor: theme.palette.divider, color: 'text.secondary', textTransform: 'none' }}
        >
          Simulate Status Change (Demo)
        </Button>

        <Button
          component={RouterLink}
          to="/attendee/order"
          variant="text"
          startIcon={<ArrowBackIcon />}
          fullWidth
          sx={{ fontWeight: 700, mt: 2 }}
        >
          Order More Food
        </Button>
      </Stack>
    </Container>
  );
};

export default AttendeeStatus;