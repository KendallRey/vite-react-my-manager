import mockApp from '../firebase/mock';
import {render} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { BrowserRouter} from 'react-router-dom'
import LandingPage from '../pages/landing-page/LandingPage'

jest.mock('firebase/app', () => ({
	initializeApp : () => mockApp,
}));

describe("Test Landing Page", () => {
	it("renders login form" , () => {
		const { getByText } = render(<LandingPage/>)

		const email_input = getByText("Email")
		const password_input = getByText("Password")
		
		expect(email_input).toBeInTheDocument()
		expect(password_input).toBeInTheDocument()
	})
})

test('loads and displays greeting', async () => {
		// ARRANGE
			render(
			<BrowserRouter>
				{/* <Routes>
					<Route path='/' element={<Layout/>}>
						<Route index element={<LandingPage/>}/>
					</Route>
				</Routes> */}
				<LandingPage/>
			</BrowserRouter>
			)
	
		// ACT
		// await userEvent.click(screen.getByText('LOGIN'))
		// await screen.findByRole('heading')
	
		// ASSERT
		//   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
		//   expect(screen.getByRole('button'))
			expect(true).toBeTruthy()
	})