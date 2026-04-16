import { createContext, useContext, useState } from 'react';

// ---------------------------------------------------------------------------
// RoleContext — provides the current simulated role across the whole app.
// Roles: 'attendee' | 'admin' | 'catering' | null (not selected yet)
// ---------------------------------------------------------------------------

const RoleContext = createContext(null);

export const ROLES = {
  ATTENDEE: 'attendee',
  ADMIN: 'admin',
  CATERING: 'catering',
};

export const ROLE_LABELS = {
  attendee: 'Attendee',
  admin: 'Admin',
  catering: 'Catering',
};

export function RoleProvider({ children }) {
  const [role, setRole] = useState(null);

  const value = {
    role,
    setRole,
    roleLabel: role ? ROLE_LABELS[role] : 'No Role',
    isAttendee: role === ROLES.ATTENDEE,
    isAdmin: role === ROLES.ADMIN,
    isCatering: role === ROLES.CATERING,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

// Custom hook — use this in every component instead of useContext directly.
export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used inside <RoleProvider>');
  return ctx;
}
