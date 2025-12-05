import { supabase } from '@/service/supabase'
import type { Roadmap } from '@/types/roadmap'

export async function updateData(roadmap: Roadmap) {
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

  const roadmapId = roadmap.id

  if (!roadmapId) {
    console.error('Roadmap must have an id')
    return
  }

  console.log('Updating roadmap:', roadmapId)

  const updatePayload = {
    roadmaps: roadmap,
  }

  // Use ->> for text comparison instead of ->
  const { data, error } = await supabase
    .from('roadmaps')
    .update(updatePayload)
    .eq('user_id', user.id)
    .eq('roadmaps->>id', roadmapId) // Changed: ->> instead of ->
    .select()

  if (error) {
    console.error('Error updating data:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
  } else {
    console.log('Updated:', data)
  }

  return { data, error }
}
