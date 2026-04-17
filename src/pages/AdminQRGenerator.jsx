// src/pages/AdminQRGenerator.jsx
import { useState } from 'react';
import QRCode from 'qrcode';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  Stack,
  Card,
  CardContent,
  alpha,
  useTheme
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PrintIcon from '@mui/icons-material/Print';
import { useRole } from '../context/RoleContext';

const AdminQRGenerator = () => {
  const theme = useTheme();
  const { currentRole } = useRole();

  const [section, setSection] = useState('C');
  const [rowStart, setRowStart] = useState(10);
  const [rowEnd, setRowEnd] = useState(15);
  const [seatStart, setSeatStart] = useState(1);
  const [seatEnd, setSeatEnd] = useState(20);
  const [generatedQRs, setGeneratedQRs] = useState([]);

  const generateQRCodes = async () => {
    const qrs = [];
    
    for (let row = rowStart; row <= rowEnd; row++) {
      for (let seat = seatStart; seat <= seatEnd; seat++) {
        const seatNumber = `Section-${section}-Row-${row}-Seat-${seat}`;
        const url = `${window.location.origin}/attendee/order?seat=${seatNumber}`;

        try {
          const qrDataUrl = await QRCode.toDataURL(url, {
            width: 300,
            margin: 2,
            color: {
              dark: '#22c55e',   // Green
              light: theme.palette.mode === 'dark' ? '#18181b' : '#ffffff'
            }
          });

          qrs.push({
            seat: seatNumber,
            url: url,
            qrCode: qrDataUrl
          });
        } catch (err) {
          console.error("QR Generation failed", err);
        }
      }
    }

    setGeneratedQRs(qrs);
  };

  const printQRCodes = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Venue-Flow QR Codes</title>
          <style>
            body { font-family: 'Inter', sans-serif; background: #fff; color: #000; padding: 40px; }
            .qr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 40px; }
            .qr-item { border: 2px solid #eee; padding: 20px; border-radius: 16px; text-align: center; }
            .qr-item h3 { margin: 0 0 10px 0; font-size: 16px; }
            .qr-item img { width: 100%; border-radius: 8px; }
            .qr-item p { font-size: 10px; color: #666; word-break: break-all; margin-top: 10px; }
          </style>
        </head>
        <body>
          <h1 style="text-align:center; margin-bottom: 40px;">Venue-Flow Seat QR Codes</h1>
          <div class="qr-grid">
            ${generatedQRs.map(qr => `
              <div class="qr-item">
                <h3>${qr.seat}</h3>
                <img src="${qr.qrCode}" alt="${qr.seat}" />
                <p>Scan to Order Food</p>
                <p style="font-size: 8px;">${qr.url}</p>
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>QR Code Generator</Typography>
        <Typography color="text.secondary">Generate and print QR codes for specific seats in the venue</Typography>
      </Box>

      {/* Generator Form */}
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
            <QrCodeIcon />
          </Box>
          <Typography variant="h5" fontWeight={700}>Generation Settings</Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Section"
              value={section}
              onChange={(e) => setSection(e.target.value.toUpperCase())}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Row Start"
              type="number"
              value={rowStart}
              onChange={(e) => setRowStart(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Row End"
              type="number"
              value={rowEnd}
              onChange={(e) => setRowEnd(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                label="Seat Start"
                type="number"
                value={seatStart}
                onChange={(e) => setSeatStart(Number(e.target.value))}
              />
              <TextField
                fullWidth
                label="Seat End"
                type="number"
                value={seatEnd}
                onChange={(e) => setSeatEnd(Number(e.target.value))}
              />
            </Box>
          </Grid>
        </Grid>

        <Button 
          fullWidth
          variant="contained"
          size="large"
          startIcon={<QrCodeIcon />}
          onClick={generateQRCodes}
          sx={{ mt: 4, borderRadius: 3, py: 1.5, fontWeight: 700 }}
        >
          Generate QR Codes
        </Button>
      </Paper>

      {/* Results */}
      {generatedQRs.length > 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h5" fontWeight={800}>
              Generated QR Codes ({generatedQRs.length})
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<PrintIcon />}
              onClick={printQRCodes}
              sx={{ borderRadius: 3, fontWeight: 700 }}
            >
              Print All
            </Button>
          </Box>

          <Grid container spacing={3}>
            {generatedQRs.map((qr, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    borderRadius: 5, 
                    border: `1px solid ${theme.palette.divider}`,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="subtitle2" fontWeight={800} color="primary" sx={{ mb: 2, fontFamily: 'monospace' }}>
                      {qr.seat}
                    </Typography>
                    <Box 
                      component="img" 
                      src={qr.qrCode} 
                      alt={qr.seat} 
                      sx={{ 
                        width: '100%', 
                        maxWidth: 200, 
                        borderRadius: 3, 
                        bgcolor: 'white', 
                        p: 1.5, 
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                      }} 
                    />
                    <Typography 
                      variant="caption" 
                      color="text.disabled" 
                      sx={{ 
                        display: 'block', 
                        wordBreak: 'break-all', 
                        lineHeight: 1.2,
                        fontSize: '0.65rem' 
                      }}
                    >
                      {qr.url}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default AdminQRGenerator;