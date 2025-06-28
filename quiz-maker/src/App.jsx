

import LandingPage from './sections/LandingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './sections/Upload';
import Quiz from './sections/Quiz';
import React from 'react';
import { GlobalStateProvider } from './GlobalStateContext';


function App() {
  
  const [isAllowed, setIsAllowed] = React.useState(false);

  return (
    <>
    <GlobalStateProvider>
      <Router>
        <Routes>
          
          <Route path="/home" element={<LandingPage />} />
          <Route path="/quiz_upload" element={<Upload />} />

          <Route path="/quiz" element={<Quiz />} />

        </Routes>
      </Router>
    </GlobalStateProvider>

    </>
  )
}

export default App
