import { ThemeToggle } from '@/utils/Themetoggle';
import { useState } from 'react'

export default function Header() {

const [role,setRole]=useState("");

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Finance Dashboard</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Track your financial activity</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Role Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="role" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Role:
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as 'viewer' | 'admin')}
                className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 text-sm font-medium cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
           <ThemeToggle></ThemeToggle>
          </div>
        </div>
      </div>
    </header>
  )
}
