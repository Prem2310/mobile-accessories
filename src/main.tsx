import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence } from 'framer-motion'
import './index.css'
import App from './App.tsx'
import { AppLoader } from './components/AppLoader'
import { loadCatalog } from './lib/catalogStore'

function Root() {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    loadCatalog()
      .then(() => setState('ready'))
      .catch((err) => {
        console.error('Failed to load catalog', err)
        setState('error')
      })
  }, [])

  if (state === 'error') {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24 }}>
        <div>
          <div style={{ font: '700 18px/1.4 Archivo, sans-serif', color: '#000', marginBottom: 8 }}>Couldn't load the store right now.</div>
          <p style={{ color: '#666' }}>Please refresh the page. If this keeps happening, contact us on WhatsApp.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {state === 'ready' && <App />}
      <AnimatePresence>{state === 'loading' && <AppLoader key="loader" />}</AnimatePresence>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
