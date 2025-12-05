import { supabase } from '@/service/supabase'
import type { Roadmap } from '@/types/roadmap'
export async function insertData(roadmap: Roadmap) {
  // get active session
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    console.error('Error fetching user:', userError)
    return
  }

  if (!user) {
    console.error('No user logged in')
    return
  }

  console.log('Current user ID:', user.id) // added for debugging

  const insertPayload = {
    user_id: user.id,
    roadmaps: roadmap,
  }

  console.log('Insert payload:', insertPayload) // and this

  const { data, error } = await supabase
    .from('roadmaps')
    .insert(insertPayload)
    .select()

  if (error) {
    console.error('Error inserting data:', error)
  } else {
    console.log('Inserted:', data)
  }
}
