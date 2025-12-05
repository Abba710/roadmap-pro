import { supabase } from '@/service/supabase'
import type { Roadmap } from '@/types/roadmap'

export async function getAllRoadmaps() {
  // Получаем текущую сессию
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

  // Получаем все roadmaps текущего пользователя
  const { data, error } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false }) // Сортировка по дате создания (новые первые)

  if (error) {
    console.error('Error fetching roadmaps:', error)
    return { data: null, error }
  }

  // Извлекаем roadmaps из JSONB поля
  const roadmaps: Roadmap[] = data?.map((row) => row.roadmaps) || []

  console.log('Fetched roadmaps:', roadmaps)

  return { data: roadmaps, error: null }
}
