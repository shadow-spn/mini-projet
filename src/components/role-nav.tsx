import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function RoleNav() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const role = user.user_metadata?.role ?? 'citoyens'
  const navItems = [
    { href: '/', label: 'Home' },
    ...(role === 'provider' ? [{ href: '/provider', label: 'Provider' }] : []),
    ...(role === 'citoyens' ? [{ href: '/citoyens', label: 'Citoyens' }] : []),
  ]

  return (
    <nav className="w-full border-b border-white/10 bg-[#070707]/90 px-6 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
