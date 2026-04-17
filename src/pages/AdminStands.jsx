// src/pages/AdminStands.jsx
import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
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
import StoreIcon from '@mui/icons-material/Store';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { concessionStands } from '../data/stands';

const AdminStands = () => {
  const theme = useTheme();
  const [stands, setStands] = useState(concessionStands);
  const [newStand, setNewStand] = useState({
    name: '',
    location: '',
    estimatedTime: 10
  });
  const [editingStand, setEditingStand] = useState(null);

  const addNewStand = () => {
    if (!newStand.name || !newStand.location) {
      alert("Stand Name and Location are required!");
      return;
    }

    const standToAdd = {
      id: `stand${Date.now()}`,
      ...newStand,
      estimatedTime: parseInt(newStand.estimatedTime)
    };

    setStands([...stands, standToAdd]);
    setNewStand({ name: '', location: '', estimatedTime: 10 });
  };

  const deleteStand = (id) => {
    setStands(stands.filter(stand => stand.id !== id));
  };

  const startEditing = (stand) => {
    setEditingStand(stand);
    setNewStand({
      name: stand.name,
      location: stand.location,
      estimatedTime: stand.estimatedTime
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveEdit = () => {
    if (!editingStand) return;

    setStands(stands.map(stand => 
      stand.id === editingStand.id 
        ? { ...stand, ...newStand, estimatedTime: parseInt(newStand.estimatedTime) }
        : stand
    ));

    setEditingStand(null);
    setNewStand({ name: '', location: '', estimatedTime: 10 });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>Manage Express Pickup Stands</Typography>
        <Typography color="text.secondary">Add, edit or remove dedicated pickup counters for mobile orders</Typography>
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
            {editingStand ? <EditIcon /> : <AddIcon />}
          </Box>
          <Typography variant="h5" fontWeight={700}>
            {editingStand ? "Edit Pickup Stand" : "Add New Pickup Stand"}
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Stand Name"
              value={newStand.name}
              onChange={(e) => setNewStand({ ...newStand, name: e.target.value })}
              placeholder="e.g. Gate A Grill"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Wait Time (min)"
              type="number"
              value={newStand.estimatedTime}
              onChange={(e) => setNewStand({ ...newStand, estimatedTime: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location / Description"
              value={newStand.location}
              onChange={(e) => setNewStand({ ...newStand, location: e.target.value })}
              placeholder="e.g. Near Section C Entrance"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          {editingStand ? (
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
                  setEditingStand(null);
                  setNewStand({ name: '', location: '', estimatedTime: 10 });
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
              onClick={addNewStand}
              sx={{ borderRadius: 3, fontWeight: 700, py: 1.5 }}
            >
              Add New Stand
            </Button>
          )}
        </Box>
      </Paper>

      {/* Current Stands List */}
      <h2 className="text-2xl font-semibold mb-6">Current Express Pickup Stands ({stands.length})</h2>

      <Grid container spacing={3}>
        {stands.map((stand) => (
          <Grid item xs={12} md={6} key={stand.id}>
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: 6, 
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: theme.palette.success.main,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 16px ${alpha(theme.palette.success.main, 0.1)}`
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Box>
                    <Typography variant="h5" fontWeight={800} gutterBottom>{stand.name}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTimeIcon sx={{ fontSize: '1rem', color: 'success.main' }} />
                      <Typography variant="body1" color="success.main" fontWeight={700}>
                        {stand.estimatedTime} min average wait
                      </Typography>
                    </Stack>
                  </Box>
                  <Chip label="Active" color="success" size="small" sx={{ fontWeight: 800 }} />
                </Box>

                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
                  <LocationOnIcon sx={{ fontSize: '1rem', color: 'text.disabled' }} />
                  <Typography color="text.secondary">{stand.location}</Typography>
                </Stack>

                <Divider sx={{ mb: 4 }} />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    fullWidth 
                    variant="soft" 
                    startIcon={<EditIcon />} 
                    onClick={() => startEditing(stand)}
                    sx={{ 
                      borderRadius: 3, 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                      fontWeight: 700,
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="soft" 
                    color="error" 
                    onClick={() => deleteStand(stand.id)}
                    sx={{ 
                      borderRadius: 3, 
                      minWidth: '120px',
                      bgcolor: alpha(theme.palette.error.main, 0.1),
                      color: 'error.main',
                      fontWeight: 700,
                      '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) }
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminStands;