// src/pages/AdminMenu.jsx
import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  MenuItem, 
  IconButton, 
  Card, 
  CardContent, 
  Stack,
  Chip,
  Divider,
  alpha,
  useTheme
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { menuData } from '../data/menu';
import { concessionStands } from '../data/stands';

const AdminMenu = () => {
  const theme = useTheme();
  const [menuItems, setMenuItems] = useState(menuData);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: 'Meals',
    description: '',
    standId: concessionStands[0]?.id || 'stand1'
  });
  const [editingItem, setEditingItem] = useState(null);

  const addNewItem = () => {
    if (!newItem.name || !newItem.price) {
      alert("Name and Price are required!");
      return;
    }

    const itemToAdd = {
      id: Date.now(),
      ...newItem,
      price: parseInt(newItem.price)
    };

    setMenuItems([...menuItems, itemToAdd]);
    setNewItem({
      name: '',
      price: '',
      category: 'Meals',
      description: '',
      standId: concessionStands[0]?.id || 'stand1'
    });
  };

  const deleteItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description || '',
      standId: item.standId
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveEdit = () => {
    if (!editingItem) return;

    setMenuItems(menuItems.map(item => 
      item.id === editingItem.id 
        ? { ...item, ...newItem, price: parseInt(newItem.price) }
        : item
    ));

    setEditingItem(null);
    setNewItem({
      name: '',
      price: '',
      category: 'Meals',
      description: '',
      standId: concessionStands[0]?.id || 'stand1'
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>Manage Menu</Typography>
        <Typography color="text.secondary">Add, edit or remove food items available for attendees</Typography>
      </Box>

      {/* Add / Edit Form */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 8, 
          borderRadius: 6, 
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.paper, 0.6)
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Box sx={{ p: 1, bgcolor: 'primary.main', borderRadius: 2, color: 'primary.contrastText' }}>
            {editingItem ? <EditIcon /> : <AddIcon />}
          </Box>
          <Typography variant="h5" fontWeight={700}>
            {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="e.g. Chicken Burger"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Price (₹)"
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              placeholder="280"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Category"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            >
              {['Meals', 'Drinks', 'Snacks', 'Combos'].map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Assign to Stand"
              value={newItem.standId}
              onChange={(e) => setNewItem({ ...newItem, standId: e.target.value })}
            >
              {concessionStands.map(stand => (
                <MenuItem key={stand.id} value={stand.id}>{stand.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              placeholder="Brief description of the item"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          {editingItem ? (
            <>
              <Button 
                variant="contained" 
                size="large" 
                fullWidth 
                onClick={saveEdit}
                sx={{ borderRadius: 3, fontWeight: 700, py: 1.5 }}
              >
                Save Changes
              </Button>
              <Button 
                variant="outlined" 
                size="large" 
                fullWidth 
                onClick={() => {
                  setEditingItem(null);
                  setNewItem({ name: '', price: '', category: 'Meals', description: '', standId: concessionStands[0]?.id || 'stand1' });
                }}
                sx={{ borderRadius: 3, fontWeight: 700, py: 1.5 }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button 
              variant="contained" 
              size="large" 
              fullWidth 
              startIcon={<AddIcon />}
              onClick={addNewItem}
              sx={{ borderRadius: 3, fontWeight: 700, py: 1.5 }}
            >
              Add to Menu
            </Button>
          )}
        </Box>
      </Paper>

      {/* Current Menu Items */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight={700}>
          Current Menu Items ({menuItems.length})
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card 
              elevation={0} 
              sx={{ 
                height: '100%', 
                borderRadius: 5, 
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.1)}`
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" fontWeight={800} gutterBottom>{item.name}</Typography>
                    <Typography variant="h5" color="primary.main" fontWeight={900}>₹{item.price}</Typography>
                  </Box>
                  <Chip label={item.category} size="small" sx={{ fontWeight: 700 }} />
                </Box>

                {item.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '3em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                  </Typography>
                )}

                <Divider sx={{ my: 2 }} />
                
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                  <RestaurantMenuIcon sx={{ fontSize: '1rem', color: 'text.disabled' }} />
                  <Typography fontSize="0.75rem" color="text.secondary" fontWeight={600}>
                    Stand: {concessionStands.find(s => s.id === item.standId)?.name || 'Unknown'}
                  </Typography>
                </Stack>

                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Button 
                    fullWidth 
                    variant="soft" 
                    startIcon={<EditIcon />} 
                    onClick={() => startEditing(item)}
                    sx={{ 
                      borderRadius: 2.5, 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                      fontWeight: 700,
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                    }}
                  >
                    Edit
                  </Button>
                  <IconButton 
                    color="error" 
                    onClick={() => deleteItem(item.id)}
                    sx={{ 
                      borderRadius: 2.5, 
                      bgcolor: alpha(theme.palette.error.main, 0.1),
                      '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) }
                    }}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminMenu;