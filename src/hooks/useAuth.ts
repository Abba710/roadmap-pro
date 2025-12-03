import { useCallback, useEffect, useState } from 'react'
import type { User } from '../types/user'
import { supabase } from '@/service/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

/**
 * Hook for managing user authentication state
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Helper function to format Supabase user data to our application User type
  const formatUser = (sessionUser: SupabaseUser): User => {
    const { id, user_metadata } = sessionUser
    return {
      id,
      name: user_metadata['full_name'] || 'Anonymous',
      avatar: user_metadata['avatar_url'] || '',
    }
  }

  useEffect(() => {
    // 1. Check active session immediately upon mounting
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(formatUser(session.user))
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error checking session:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // 2. Subscribe to auth state changes (SignIn, SignOut, Token Refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(formatUser(session.user))

        const intent = localStorage.getItem('authIntent')

        if (intent === 'start') {
          window.location.href = '/app/'
        }

        // очищаем
        localStorage.removeItem('authIntent')
      } else {
        setUser(null)
      }

      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Redirect to the current domain root. Supabase will handle the hash parsing.
          redirectTo: window.location.origin,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      // User state will be updated automatically by onAuthStateChange
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }, [])

  return { user, loading, signInWithGoogle, logout }
}
