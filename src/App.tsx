import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Suspense, lazy } from 'react'
import RepoIssuesPage from './pages/repo-issues-page/RepoIssuesPage'

const LandingPage = lazy(()=>import("./pages/landing-page/LandingPage"))
const DashboardPage = lazy(()=>import("./pages/dashboard-page/DashboardPage"))
const AuthLayout = lazy(()=>import("./layout/AuthLayout"))
const Layout = lazy(()=>import("./layout/Layout"))

function App() {

	// TEST 2

	return (
		<BrowserRouter>

			<Suspense fallback={<div>...</div>}>
				<Routes>
					<Route path='/' element={<Layout/>}>
						<Route index element={<LandingPage/>}/>
					</Route>
				</Routes>
			</Suspense>
			
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path='user' element={<AuthLayout/>}>
						<Route index element={<RepoIssuesPage/>}/>
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default App
