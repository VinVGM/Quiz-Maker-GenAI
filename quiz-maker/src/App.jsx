

import LandingPage from './sections/LandingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './sections/Upload';


function App() {
  
  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz_upload" element={<Upload/>} />
          <Route path="/loading" element=''/>
        </Routes>
      </Router>
    </>
  )
}

export default App
