import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://hchsijwazhwwzotlzqaj.supabase.co',
  'sb_publishable_YFmRfjLV8AafaGh8yMgSWw_W2oo0bOl'
)

// Вызов входа через Google
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/auth/callback'
    }
  })
  if (error) console.error(error)
  console.log(data)
}
