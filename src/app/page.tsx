import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signout } from '@/app/auth/actions'

export default async function Home() {
  const supabase = await createClient()
  
  // Fetch logged in user details using safe server-side getUser call
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-4 py-12">
      {/* Abstract mesh background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-2xl p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl flex flex-col gap-8 transition-all duration-300">
        
        {/* Connection status tag */}
        <div className="flex flex-col gap-2 items-center sm:items-start">
          <div className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 self-center sm:self-start">
            Secure Connection Active
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center sm:text-left bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent mt-2">
            Supabase Auth Dashboard
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base text-center sm:text-left">
            You are securely authenticated using server-side cookies.
          </p>
        </div>

        {/* User Card */}
        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-800 pb-3">
            Authenticated Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Email Address</span>
              <span className="text-white font-medium break-all">{user.email}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">User ID</span>
              <span className="text-zinc-300 font-mono break-all text-xs">{user.id}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Last Sign In</span>
              <span className="text-zinc-300 font-medium">
                {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Provider</span>
              <span className="text-zinc-300 font-medium capitalize">{user.app_metadata.provider || 'Email'}</span>
            </div>
          </div>
        </div>

        {/* Architecture Info Section */}
        <div className="p-4 rounded-xl bg-violet-950/10 border border-violet-500/10 flex gap-3 text-sm text-violet-300">
          <svg className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-semibold text-violet-200">How it works</p>
            <p className="text-zinc-400 mt-1">
              Next.js 16's custom proxy interceptor (<code className="text-violet-350 font-mono">src/proxy.ts</code>) handles JWT session refreshing. Server actions (<code className="text-violet-350 font-mono">src/app/auth/actions.ts</code>) process sign-ins and sign-outs securely on the server.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <form action={signout} className="w-full">
          <button
            type="submit"
            className="w-full h-12 rounded-2xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 hover:border-zinc-700 text-zinc-300 font-semibold transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out Session
          </button>
        </form>
      </main>
    </div>
  )
}
