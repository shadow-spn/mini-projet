import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CitoyensPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.user_metadata?.role !== 'citoyens') {
    redirect('/')
  }

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-4 py-12">
      <div className="relative z-10 w-full max-w-2xl p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">Page Citoyens</h1>
        <p className="mt-4 text-zinc-400">Contenu réservé aux citoyens.</p>
      </div>
    </div>
  )
}
