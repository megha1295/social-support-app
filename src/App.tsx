import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import FormWizard from './components/form/FormWizard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/apply" element={<FormWizard />} />
    </Routes>
  )
}

export default App