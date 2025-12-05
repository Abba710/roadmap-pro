import { supabase } from '@/service/supabase'
import type { Roadmap } from '@/types/roadmap'

export async function getAllRoadmaps() {
  // Get the current session
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    console.error('Error fetching user:', userError)
    return { data: null, error: userError }
  }

  if (!user) {
    console.error('No user logged in')
    return { data: null, error: new Error('No user logged in') }
  }

  // Get all roadmaps for the current user
  const { data, error } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false }) // Sort by creation date (newest first)

  if (error) {
    console.error('Error fetching roadmaps:', error)
    return { data: null, error }
  }

  // Extract roadmaps from the JSONB field
  const roadmaps: Roadmap[] = data?.map((row) => row.roadmaps) || []

  console.log('Fetched roadmaps:', roadmaps)

  return { data: roadmaps, error: null }
}
