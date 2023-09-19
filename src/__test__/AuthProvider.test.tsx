import mockApp from '../firebase/mock';
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {  GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { SignInWithGoogle } from '../firebase/api/auth/AuthProviderApi';

jest.mock('firebase/app', () => ({
	initializeApp : () => mockApp,
}));

jest.mock('firebase/auth', () => ({
	Auth : jest.fn(),
	User : jest.fn(),
	GoogleAuthProvider : jest.fn(),
	SignInWithFacebook : jest.fn(),
	SignInWithGithub : jest.fn(),
	SignInWithTwitter : jest.fn(),
	signInWithPopup : jest.fn(),
	getAuth : jest.fn(),
}));

const mockAuth = mockApp.auth

// Create a mock user credential
const mockUserCredential: any = {
  user: null,
  credential: null,
};

describe('SignInWithGoogle', () => {
  beforeEach(() => {
    // Reset the mock function call counters before each test
    jest.clearAllMocks();
  });

  it('should sign in with Google provider successfully', async () => {
    // Mock GoogleAuthProvider and signInWithPopup
    (GoogleAuthProvider as any).mockReturnValue(new GoogleAuthProvider());
    (signInWithPopup as jest.Mock).mockResolvedValue(mockUserCredential);

    // Mock getAuth to return the mock Auth instance
    (getAuth as jest.Mock).mockReturnValue(mockAuth);

    // Call the SignInWithGoogle function
    const result = await SignInWithGoogle();

    // Assert that the sign-in was successful
    expect(result).toEqual(mockUserCredential);

    // Verify that signInWithPopup was called with the correct parameters
    expect(signInWithPopup).toHaveBeenCalledWith(mockAuth, expect.any(GoogleAuthProvider));
  });

  it('should handle sign-in failure', async () => {
    // Mock GoogleAuthProvider and signInWithPopup to throw an error
    (GoogleAuthProvider as any).mockReturnValue(new GoogleAuthProvider());
    (signInWithPopup as jest.Mock).mockRejectedValue(new Error('Sign-in error'));

    // Mock getAuth to return the mock Auth instance
    (getAuth as jest.Mock).mockReturnValue(mockAuth);

    // Call the SignInWithGoogle function
    const result = await SignInWithGoogle();

    // Assert that the sign-in failed and returned null
    expect(result).toBeNull();

    // Verify that signInWithPopup was called with the correct parameters
    expect(signInWithPopup).toHaveBeenCalledWith(mockAuth, expect.any(GoogleAuthProvider));
  });
});
