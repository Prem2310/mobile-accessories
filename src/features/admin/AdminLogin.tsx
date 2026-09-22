import { useState } from 'react'
import { Button } from '../../components/ds/Button'
import { Input } from '../../components/ds/Input'
import { supabase } from '../../lib/supabase'

export function AdminLogin({ needsBootstrap }: { needsBootstrap: boolean }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      if (needsBootstrap) {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
        if (signUpError) throw signUpError
        if (!data.session || !data.user) {
          throw new Error(
            'Account created, but this Supabase project requires email confirmation. Check your inbox for a confirmation link, then sign in — or ask a developer to disable "Confirm email" in Supabase Auth settings and finish setup for you.',
          )
        }
        const { error: adminError } = await supabase.from('admins').insert({ id: data.user.id, role: 'owner', name: 'Owner' })
        if (adminError) throw adminError
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--surface-page)', padding: 'var(--sp-6)' }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 380, background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: 'var(--sp-8)', display: 'grid', gap: 'var(--sp-4)' }}>
        <div>
          <div style={{ font: '800 22px/1 var(--font-display)', color: 'var(--navy-800)' }}>
            ISTUFF Admin
          </div>
          <p style={{ marginTop: 8, color: 'var(--text-muted)' }}>
            {needsBootstrap ? 'No admin account exists yet — create the owner account.' : 'Sign in to manage the store.'}
          </p>
        </div>
        <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@istuff.in" />
        <Input label="Password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
        {error && <p style={{ color: 'var(--red-600)', font: 'var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)' }}>{error}</p>}
        <Button type="submit" disabled={busy} fullWidth>
          {busy ? 'Please wait…' : needsBootstrap ? 'Create owner account' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}
