import AuthForm from './AuthForm'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const supabase = await createClient()
  
  // Verify if user is already logged in, if so redirect to home
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    redirect('/')
  }

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center bg-[#0a0a0a] px-4 py-12 overflow-hidden">
      {/* Background grid design */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      <AuthForm />
    </div>
  )
}
