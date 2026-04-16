// ---------------------------------------------------------------------------
// demoOrders.js — Pre-seeded demo orders for Venue-Flow
// Statuses: 'pending' | 'preparing' | 'ready' | 'delivered'
// ---------------------------------------------------------------------------

export const demoOrders = [
  {
    id: 'ORD-1001',
    seat: 'A14',
    section: 'Section A',
    standId: 'S1',
    standName: 'Main Grill',
    items: [
      { name: 'Stadium Classic Burger', qty: 2, price: 12.50 },
      { name: 'Garlic Parmesan Fries', qty: 1, price: 6.00 },
      { name: 'Soda Fountain', qty: 2, price: 5.50 },
    ],
    total: 42.00,
    status: 'ready',
    placedAt: '2025-07-12T14:22:00Z',
    updatedAt: '2025-07-12T14:35:00Z',
    estimatedMinutes: 0,
  },
  {
    id: 'ORD-1002',
    seat: 'B07',
    section: 'Section B',
    standId: 'S2',
    standName: 'Snack Shack',
    items: [
      { name: 'Nacho Supreme', qty: 1, price: 10.50 },
      { name: 'Large Popcorn', qty: 1, price: 7.50 },
      { name: 'Bottled Water', qty: 2, price: 4.50 },
    ],
    total: 27.00,
    status: 'preparing',
    placedAt: '2025-07-12T14:28:00Z',
    updatedAt: '2025-07-12T14:30:00Z',
    estimatedMinutes: 5,
  },
  {
    id: 'ORD-1003',
    seat: 'C22',
    section: 'Section C',
    standId: 'S3',
    standName: 'Taco Town',
    items: [
      { name: 'Street Tacos (3pc)', qty: 2, price: 11.00 },
      { name: 'Soda Fountain', qty: 1, price: 5.50 },
    ],
    total: 27.50,
    status: 'pending',
    placedAt: '2025-07-12T14:32:00Z',
    updatedAt: '2025-07-12T14:32:00Z',
    estimatedMinutes: 12,
  },
  {
    id: 'ORD-1004',
    seat: 'D05',
    section: 'Section D',
    standId: 'S1',
    standName: 'Main Grill',
    items: [
      { name: 'Chicken Tenders & Fries', qty: 1, price: 13.50 },
      { name: 'Draft Beer (S)16oz', qty: 2, price: 14.00 },
    ],
    total: 41.50,
    status: 'delivering',
    placedAt: '2025-07-12T14:15:00Z',
    updatedAt: '2025-07-12T14:38:00Z',
    estimatedMinutes: 2,
  },
  {
    id: 'ORD-1005',
    seat: 'A33',
    section: 'Section A',
    standId: 'S5',
    standName: 'Sweet Spot',
    items: [
      { name: 'Ice Cream Sandwich', qty: 3, price: 5.00 },
      { name: 'Churro', qty: 2, price: 4.50 },
    ],
    total: 24.00,
    status: 'delivered',
    placedAt: '2025-07-12T14:00:00Z',
    updatedAt: '2025-07-12T14:18:00Z',
    estimatedMinutes: 0,
  },
  {
    id: 'ORD-1006',
    seat: 'B19',
    section: 'Section B',
    standId: 'S2',
    standName: 'Snack Shack',
    items: [
      { name: 'Pretzel with Cheese', qty: 2, price: 6.50 },
      { name: 'Coffee', qty: 1, price: 4.00 },
    ],
    total: 17.00,
    status: 'pending',
    placedAt: '2025-07-12T14:38:00Z',
    updatedAt: '2025-07-12T14:38:00Z',
    estimatedMinutes: 5,
  },
];

// Status display helpers
export const STATUS_CONFIG = {
  pending:    { label: 'Order Received',  color: '#f59e0b', bgColor: '#fef3c7', step: 0 },
  preparing:  { label: 'Preparing',        color: '#3b82f6', bgColor: '#dbeafe', step: 1 },
  ready:      { label: 'Ready for Pickup', color: '#10b981', bgColor: '#d1fae5', step: 2 },
  delivering: { label: 'On the Way!',      color: '#8b5cf6', bgColor: '#ede9fe', step: 3 },
  delivered:  { label: 'Delivered',        color: '#6b7280', bgColor: '#f3f4f6', step: 4 },
};
