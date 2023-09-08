import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Suspense } from 'react'

function App() {

  // TEST 2

  return (
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<></>}>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
  )
}

export default App
