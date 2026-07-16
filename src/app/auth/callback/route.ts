import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect destination
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(new URL(next, request.url))
      } else if (forwardedHost) {
        return NextResponse.redirect(new URL(next, `https://${forwardedHost}`))
      } else {
        return NextResponse.redirect(new URL(next, request.url))
      }
    }
  }

  // return the user to an error page or homepage if it fails
  return NextResponse.redirect(new URL('/login?error=Authentication code exchange failed', request.url))
}
