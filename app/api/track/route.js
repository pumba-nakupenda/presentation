import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    if (type === 'session_start') {
      const { data: session, error } = await supabase
        .from('prime_sessions')
        .insert({ user_agent: data.user_agent })
        .select('id')
        .single()
      if (error) throw error
      return Response.json({ session_id: session.id })
    }

    if (type === 'session_end') {
      await supabase
        .from('prime_sessions')
        .update({ ended_at: new Date().toISOString(), total_seconds: data.total_seconds })
        .eq('id', data.session_id)
      return Response.json({ ok: true })
    }

    if (type === 'slide_enter') {
      const { data: view, error } = await supabase
        .from('prime_slide_views')
        .insert({ session_id: data.session_id, slide_index: data.slide_index, slide_label: data.slide_label })
        .select('id')
        .single()
      if (error) throw error
      return Response.json({ view_id: view.id })
    }

    if (type === 'slide_leave') {
      await supabase
        .from('prime_slide_views')
        .update({ duration_seconds: data.duration_seconds })
        .eq('id', data.view_id)
      return Response.json({ ok: true })
    }

    return Response.json({ error: 'unknown type' }, { status: 400 })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
