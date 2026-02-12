import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './index.css'
import { TanStackProvider } from './providers/ServerStateProvider'

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <TanStackProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TanStackProvider>
  </StrictMode>
)
