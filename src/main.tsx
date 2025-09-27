/*
 * DynamicDashboardApp
 * Copyright (c) 2025 Saurabh Rajesh Jha
 * 
 * Released under the MIT License.
 * Free to use for non-commercial / non-profit purposes.
 * Commercial use requires separate permission.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.ts'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
