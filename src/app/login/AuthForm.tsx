'use client'

import React, { useState, useTransition } from 'react'
import { login, signup } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [role, setRole] = useState('citoyens')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      if (isSignUp) {
        const result = await signup(formData)
        if (result?.error) {
          setError(result.error)
        } else if (result?.success) {
          setSuccess(result.success)
          // Reset form fields
          ;(e.target as HTMLFormElement).reset()
        }
      } else {
        const result = await login(formData)
        if (result?.error) {
          setError(result.error)
        }
      }
    })
  }

  return (
    <div className="relative w-full max-w-md p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl transition-all duration-500 overflow-hidden group">
      {/* Decorative gradient glowing blobs */}
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-violet-600/30 blur-3xl group-hover:bg-violet-600/40 transition-all duration-700"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-cyan-600/30 blur-3xl group-hover:bg-cyan-600/40 transition-all duration-700"></div>

      <div className="relative z-10 flex flex-col gap-6">
        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-zinc-400">
            {isSignUp ? 'Sign up to get started' : 'Sign in to access your dashboard'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false)
              setError(null)
              setSuccess(null)
            }}
            disabled={isPending}
            className={`py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
              !isSignUp
                ? 'bg-zinc-800 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true)
              setError(null)
              setSuccess(null)
            }}
            disabled={isPending}
            className={`py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
              isSignUp
                ? 'bg-zinc-800 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Alerts */}
        {error && (
          <div className="p-3 text-sm text-rose-200 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
            <svg className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 text-sm text-emerald-200 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
            <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{success}</span>
          </div>
        )}

        {/* Main form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={isPending}
              placeholder="you@example.com"
              className="w-full h-12 px-4 rounded-2xl bg-zinc-950/50 border border-zinc-800/80 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              disabled={isPending}
              placeholder="••••••••"
              className="w-full h-12 px-4 rounded-2xl bg-zinc-950/50 border border-zinc-800/80 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200"
            />
          </div>

          {isSignUp && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                disabled={isPending}
                className="w-full h-12 px-4 rounded-2xl bg-zinc-950/50 border border-zinc-800/80 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200"
              >
                <option value="citoyens">Citoyens</option>
                <option value="provider">Provider</option>
              </select>
            </div>
          )}

          <Button type="submit" disabled={isPending} className="w-full mt-2 justify-center">
            {isPending ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : isSignUp ? (
              'Create Account'
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
