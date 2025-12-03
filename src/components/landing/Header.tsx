import { useState } from 'react'
import { Sparkles, Menu, X, UserIcon, LogOut } from 'lucide-react'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'
import { scrollToTop } from '@/utils/simpleUtils'
import type { User } from '@/types/user'

interface HeaderProps {
  onGetStarted: () => void
  userData: User | null
  onSignIn: () => void
  onSignOut: () => void
}

type NavItem = { label: string; type: 'link'; href: string }

export function Header({
  onGetStarted,
  userData,
  onSignIn,
  onSignOut,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignIn = async () => {
    localStorage.setItem('authIntent', 'login')
    await onSignIn()
  }

  const navItems: NavItem[] = [
    { label: 'Home', type: 'link', href: '/' },
    { label: 'Pricing', type: 'link', href: '/pricing/' },
    { label: 'Blog', type: 'link', href: '/blog/' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-900 text-xl">RoadmapPro [Beta]</span>
          </NavLink>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? 'text-purple-600 font-semibold'
                      : 'text-slate-600 hover:text-purple-600 transition-colors'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* User Info & Auth Actions */}
            {userData ? (
              <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200">
                {/* User Name & Avatar */}
                <div className="flex items-center gap-2">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-8 h-8 rounded-full border border-slate-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-slate-500" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-slate-700 max-w-[150px] truncate">
                    {userData.name}
                  </span>
                </div>

                {/* Logout Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSignOut}
                  className="text-slate-500 cursor-pointer hover:text-red-600 hover:bg-red-50"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="hidden cursor-pointer md:flex gap-2"
                onClick={handleSignIn}
              >
                <UserIcon className="w-4 h-4" />
                Sign In
              </Button>
            )}

            {/* CTA */}
            <Button
              onClick={onGetStarted}
              size="sm"
              className="hidden md:flex cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Get Started
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-700" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={() => {
                  setMobileMenuOpen(false)
                  scrollToTop()
                }}
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-3 text-slate-600 hover:text-purple-600 hover:bg-slate-50 rounded-lg transition-colors ${
                    isActive ? 'text-purple-600 font-semibold' : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="border-t border-slate-100 my-2 pt-2">
              {userData ? (
                <>
                  <div className="px-4 py-2 flex items-center gap-2 mb-2">
                    {userData.avatar && (
                      <img
                        src={userData.avatar}
                        alt="Avatar"
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span className="text-sm font-semibold text-slate-700">
                      {userData.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      onSignOut()
                    }}
                    className="block w-full text-left px-4 py-3 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4 cursor-pointer inline mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    handleSignIn()
                  }}
                  className="block w-full text-left cursor-pointer px-4 py-3 text-slate-600 hover:text-purple-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <UserIcon className="w-4 h-4 inline mr-2" />
                  Sign In
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
