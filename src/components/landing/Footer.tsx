import { Sparkles } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { scrollToTop } from '@/utils/simpleUtils'

/**
 * Footer component
 */
export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xl">RoadmapPro</span>
            </div>
            <p className="text-slate-400 max-w-md">
              Build beautiful roadmaps and track your progress with our
              intuitive platform. Perfect for teams of all sizes.
            </p>
          </div>

          {/* Contacts - добавлено */}
          <div className="col-span-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              {/* Заголовок контактов того же размера и стиля, что и RoadmapPro */}
              <span className="text-white text-xl">Contacts</span>
            </div>

            <ul className="text-slate-400 space-y-2">
              <li>
                <a
                  href="mailto:Abba4game@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  Abba4game@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/saifer714"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Telegram: @saifer714
                </a>
              </li>
              <li>
                <a
                  href="https://www.reddit.com/user/Sad-Bed-3125/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Reddit: Sad-Bed-3125
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/blog/"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500">
          <p>&copy; 2025 RoadmapPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
