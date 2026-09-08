import React, { createContext, useState, useEffect } from 'react'
import { ROLES, authenticateUser } from '../data/roles'

export const RoleContext = createContext(null)

const AUTH_STORAGE_KEY = 'swm_auth_user'

export function RoleProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed?.role && ROLES[parsed.role]) {
          return parsed
        }
      }
    } catch {
      // ignore storage parsing error
    }
    return null
  })

  // Keep localStorage synchronized
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser))
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    } catch {
      // storage unavailable / quota exceeded
    }
  }, [currentUser])

  function login(identifier, password) {
    const user = authenticateUser(identifier, password)
    if (user) {
      setCurrentUser(user)
      return { success: true, user }
    }
    return {
      success: false,
      error: 'Invalid credentials. Please verify your username/email and password.'
    }
  }

  function loginAsRole(roleKey) {
    const target = ROLES[roleKey]
    if (!target) return { success: false, error: 'Invalid role' }

    const user = {
      role: roleKey,
      username: target.demo.username,
      email: target.demo.email,
      name: target.demo.name,
      designation: target.demo.designation,
      title: target.title
    }
    setCurrentUser(user)
    return { success: true, user }
  }

  function logout() {
    setCurrentUser(null)
  }

  function setRole(newRoleKey) {
    if (!ROLES[newRoleKey]) return
    loginAsRole(newRoleKey)
  }

  const role = currentUser?.role || null
  const roleInfo = role ? ROLES[role] : null
  const isAuthenticated = Boolean(currentUser)

  return (
    <RoleContext.Provider
      value={{
        currentUser,
        role,
        roleInfo,
        isAuthenticated,
        login,
        loginAsRole,
        logout,
        setRole
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}

