import { useState } from 'react'
import { Sparkles, Menu, X, User } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import type { PlanType } from '../../types/subscription'
import { NavLink } from 'react-router-dom'
import { scrollToTop } from '@/utils/simpleUtils'

interface HeaderProps {
  currentPlan: PlanType
  onGetStarted: () => void
}

type NavItem = { label: string; type: 'link'; href: string }

export function Header({ currentPlan, onGetStarted }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            {/* Plan badge */}
            <Badge
              variant="outline"
              className={
                currentPlan === 'free'
                  ? 'hidden md:inline-flex bg-slate-50 text-slate-700 border-slate-300'
                  : 'hidden md:inline-flex bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-purple-300'
              }
            >
              {currentPlan === 'free' ? 'Free Plan' : 'Pro Plan'}
            </Badge>

            {/* User menu */}
            <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
              <User className="w-4 h-4" />
              Sign In
            </Button>

            {/* CTA */}
            <Button
              onClick={onGetStarted}
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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

            <NavLink
              to="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-3 text-slate-600 hover:text-purple-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <User className="w-4 h-4 inline mr-2" />
              Sign In
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}
