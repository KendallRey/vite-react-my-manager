import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Suspense, lazy } from 'react'

const LandingPage = lazy(()=>import("./pages/landing-page/LandingPage"))

function App() {

  // TEST 2

  return (
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<LandingPage/>}>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
  )
}

export default App
