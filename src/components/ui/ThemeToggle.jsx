import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle({ size = 'md', showLabel = false, className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  const isSmall = size === 'sm'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="text-xs font-semibold select-none hidden sm:inline-flex items-center gap-1 font-mono">
          {isDark ? (
            <span className="text-sky-400">Night</span>
          ) : (
            <span className="text-amber-600">Day</span>
          )}
        </span>
      )}

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to Day (White) Mode' : 'Switch to Night (Black) Mode'}
        title={isDark ? 'Switch to Day Mode (Pure White)' : 'Switch to Night Mode (Deep Black)'}
        className={`relative inline-flex items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-civic-teal/50 cursor-pointer select-none ${
          isSmall ? 'w-14 h-7 p-0.5' : 'w-16 h-8 p-1'
        } ${
          isDark
            ? 'bg-neutral-900 border border-neutral-700 shadow-inner'
            : 'bg-amber-100 border border-amber-300 shadow-xs'
        }`}
      >
        {/* Track Icons */}
        <span className="absolute left-1.5 flex items-center justify-center text-amber-500 pointer-events-none transition-opacity duration-200">
          <Sun size={isSmall ? 12 : 14} />
        </span>
        <span className="absolute right-1.5 flex items-center justify-center text-sky-400 pointer-events-none transition-opacity duration-200">
          <Moon size={isSmall ? 12 : 14} />
        </span>

        {/* Sliding Knob */}
        <span
          className={`inline-block rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${
            isSmall ? 'w-6 h-6' : 'w-6 h-6'
          } ${
            isDark
              ? `${isSmall ? 'translate-x-7' : 'translate-x-8'} bg-black border border-neutral-700 text-sky-300`
              : 'translate-x-0 bg-white border border-amber-200 text-amber-500'
          }`}
        >
          {isDark ? (
            <Moon size={isSmall ? 11 : 13} className="text-sky-300" />
          ) : (
            <Sun size={isSmall ? 12 : 14} className="text-amber-500" />
          )}
        </span>
      </button>
    </div>
  )
}
