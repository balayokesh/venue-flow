// src/pages/AttendeeOrder.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  IconButton, 
  Badge, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Fab,
  useTheme,
  alpha,
  Stack
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { menuData } from '../data/menu';

const AttendeeOrder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [seat, setSeat] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const seatParam = searchParams.get('seat');
    setSeat(seatParam || 'Section C, Row 12, Seat 45');
  }, [searchParams]);

  const addToCart = (item) => {
    setCart([...cart, { ...item, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    
    // In a real app, we'd send the order to the backend here
    setCart([]);
    setIsCartOpen(false);
    navigate(`/attendee/status?seat=${encodeURIComponent(seat)}`);
  };

  return (
    <Box sx={{ pb: 10 }}>
      {/* Hero / Seat Info */}
      <Box 
        sx={{ 
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 4, 
          mb: 4
        }}
      >
        <Container maxWidth="md">
          <Stack direction="row" spacing={2} alignItems="center">
            <Box 
              sx={{ 
                bgcolor: theme.palette.primary.main, 
                color: 'white', 
                borderRadius: 2, 
                p: 1.5,
                display: 'flex'
              }}
            >
              <LocationOnIcon />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                Your Location
              </Typography>
              <Typography variant="h5" fontWeight={800} color="primary">
                {seat}
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>
          Menu
        </Typography>

        <Grid container spacing={3}>
          {menuData.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Card 
                elevation={0}
                sx={{ 
                  borderRadius: 4, 
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={item.image || `https://picsum.photos/id/${item.id + 100}/400/200`}
                  alt={item.name}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" fontWeight={700}>
                      {item.name}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight={800}>
                      ₹{item.price}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {item.description}
                  </Typography>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={() => addToCart(item)}
                    sx={{ borderRadius: 2 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Floating Cart Button (Mobile) */}
      <Fab 
        color="primary" 
        aria-label="cart"
        onClick={() => setIsCartOpen(true)}
        sx={{ 
          position: 'fixed', 
          bottom: 24, 
          right: 24,
          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`
        }}
      >
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </Fab>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 400 }, p: 3 }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5" fontWeight={800}>Your Cart</Typography>
          <IconButton onClick={() => setIsCartOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {cart.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography color="text.secondary">Your cart is empty</Typography>
          </Box>
        ) : (
          <>
            <List sx={{ flex: 1, overflowY: 'auto' }}>
              {cart.map((item) => (
                <ListItem 
                  key={item.cartId}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.cartId)}>
                      <DeleteOutlinedIcon color="error" />
                    </IconButton>
                  }
                  sx={{ 
                    bgcolor: alpha(theme.palette.divider, 0.05),
                    borderRadius: 2,
                    mb: 2
                  }}
                >
                  <ListItemText 
                    primary={item.name} 
                    secondary={`₹${item.price}`}
                    primaryTypographyProps={{ fontWeight: 700 }}
                  />
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ mt: 'auto', pt: 4 }}>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" fontWeight={800}>₹{totalAmount}</Typography>
              </Box>
              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                onClick={handlePlaceOrder}
                sx={{ py: 2, borderRadius: 3, fontWeight: 800 }}
              >
                Place Order
              </Button>
              <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 2 }}>
                Available at nearest Express Pickup counter
              </Typography>
            </Box>
          </>
        )}
      </Drawer>
    </Box>
  );
};

export default AttendeeOrder;