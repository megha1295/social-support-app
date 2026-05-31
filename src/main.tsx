import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { FormProvider } from './context/FormContext'
import './i18n/config';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <FormProvider>
      <App />
    </FormProvider>
    </BrowserRouter>
  </StrictMode>
)