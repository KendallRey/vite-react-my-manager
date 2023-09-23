import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Suspense, lazy } from 'react'
import ErrorBoundary from './component/error-boundary/ErrorBoundary'
import ErrorPage from './component/error-page/ErrorPage'

// const ErrorBoundary = lazy(()=>import("./component/error-boundary/ErrorBoundary"))

const LandingPage = lazy(()=>import("./pages/landing-page/LandingPage"))
const DashboardPage = lazy(()=>import("./pages/dashboard-page/DashboardPage"))
const CollectionPage = lazy(()=>import("./pages/collection-page/CollectionPage"))
const UserLayout = lazy(()=>import("./layout/UserLayout"))
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
			
			<Suspense fallback={<div>...</div>}>
					<Routes>
						<Route path='user' element={<UserLayout/>}>
							<Route index element={
								<ErrorBoundary>
									<DashboardPage/>
								</ErrorBoundary>
							}/>
							<Route path=':collection_id' element={
								<ErrorBoundary>
									<CollectionPage/>
								</ErrorBoundary>
							}/>
						</Route>
						<Route path='*' element={
							<ErrorPage code={404} message='Page not found'/>
						}/>
					</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default App
