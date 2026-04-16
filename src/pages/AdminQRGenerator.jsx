// src/pages/AdminQRGenerator.jsx
import { useState } from 'react';
import QRCode from 'qrcode';   // Make sure to install: npm install qrcode
import { useRole } from '../context/RoleContext';

const AdminQRGenerator = () => {
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
              light: '#18181b'
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
            body { font-family: Arial, sans-serif; background: #111; color: white; padding: 20px; }
            .qr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px; }
            .qr-item { background: #1f2937; padding: 20px; border-radius: 12px; text-align: center; }
            .qr-item img { margin: 15px 0; }
          </style>
        </head>
        <body>
          <h1 style="text-align:center; color:#22c55e;">Venue-Flow - Seat QR Codes</h1>
          <div class="qr-grid">
            ${generatedQRs.map(qr => `
              <div class="qr-item">
                <h3>${qr.seat}</h3>
                <img src="${qr.qrCode}" alt="${qr.seat}" />
                <p style="font-size:14px; color:#888;">Scan to order food</p>
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
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">QR Code Generator</h1>
          <p className="text-zinc-400">Generate QR codes for seats to place at each location</p>
        </div>

        {/* Generator Form */}
        <div className="bg-zinc-900 rounded-3xl p-8 mb-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Section</label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value.toUpperCase())}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Row Start</label>
              <input
                type="number"
                value={rowStart}
                onChange={(e) => setRowStart(Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Row End</label>
              <input
                type="number"
                value={rowEnd}
                onChange={(e) => setRowEnd(Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Seats per Row</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={seatStart}
                  onChange={(e) => setSeatStart(Number(e.target.value))}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
                  placeholder="From"
                />
                <input
                  type="number"
                  value={seatEnd}
                  onChange={(e) => setSeatEnd(Number(e.target.value))}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
                  placeholder="To"
                />
              </div>
            </div>
          </div>

          <button
            onClick={generateQRCodes}
            className="mt-8 w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-semibold text-lg transition-colors"
          >
            Generate QR Codes
          </button>
        </div>

        {/* Generated QR Codes */}
        {generatedQRs.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                Generated QR Codes ({generatedQRs.length})
              </h2>
              <button
                onClick={printQRCodes}
                className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                🖨️ Print All QR Codes
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {generatedQRs.map((qr, index) => (
                <div key={index} className="bg-zinc-900 rounded-2xl p-6 text-center">
                  <h3 className="font-mono font-bold text-green-400 mb-4">{qr.seat}</h3>
                  <img 
                    src={qr.qrCode} 
                    alt={qr.seat}
                    className="mx-auto mb-4 rounded-xl shadow-2xl"
                  />
                  <p className="text-xs text-zinc-500 break-all">{qr.url}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminQRGenerator;