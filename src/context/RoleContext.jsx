import React, { createContext, useState } from 'react'
import { ROLES } from '../data/roles'

export const RoleContext = createContext(null)

export function RoleProvider({ children }) {
  const [role, setRole] = useState('admin')
  return (
    <RoleContext.Provider value={{ role, setRole, roleInfo: ROLES[role] }}>
      {children}
    </RoleContext.Provider>
  )
}
