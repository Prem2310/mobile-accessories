import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'

export interface AdminProfile {
  id: string
  role: 'owner' | 'admin' | 'staff'
  name: string | null
}

interface AdminAuthState {
  loading: boolean
  session: Session | null
  admin: AdminProfile | null
  /** true once we've confirmed the admins table has zero rows — first sign-up becomes owner */
  needsBootstrap: boolean
}

/** Session + admin-row lookup. A Supabase session alone doesn't grant admin access — the admins-table row (checked via RLS) does. */
export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({ loading: true, session: null, admin: null, needsBootstrap: false })

  useEffect(() => {
    let cancelled = false

    async function resolve(session: Session | null) {
      if (!session) {
        // admins is RLS-locked to admins-only, so anon can't count rows directly —
        // admins_exist() is a SECURITY DEFINER RPC that exposes just the boolean.
        const { data: exists } = await supabase.rpc('admins_exist')
        if (!cancelled) setState({ loading: false, session: null, admin: null, needsBootstrap: !exists })
        return
      }
      const { data } = await supabase.from('admins').select('id, role, name').eq('id', session.user.id).maybeSingle()
      if (!cancelled) setState({ loading: false, session, admin: data as AdminProfile | null, needsBootstrap: false })
    }

    supabase.auth.getSession().then(({ data }) => resolve(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => resolve(session))
    return () => {
      cancelled = true
      sub.subscription.unsubscribe()
    }
  }, [])

  return state
}
