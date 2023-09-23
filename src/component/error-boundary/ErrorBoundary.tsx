import { ReactNode, createContext, useState } from 'react';

type ErrorBoundaryContextType = {
    error : Error | null
    setError : (message : string)=>void
}

export const ErrorBoundaryContext  = createContext<ErrorBoundaryContextType>({
	error : null,
    setError : ()=>{},
})
type ErrorBoundaryType = {
    children : ReactNode
}

const ErrorBoundary = ({ children } : ErrorBoundaryType) => {

  const [_error, _setError] = useState<Error | null>(null)

  const setError = (message :string | null) => {
    if(message)
        _setError(new Error(message))
    else
        _setError(null)
  }

  if (_error) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <p>{_error.message}</p>
      </div>
    )
  }

  return (
    <ErrorBoundaryContext.Provider
        value={{
            error : _error,
            setError
            }}>
        {children}
    </ErrorBoundaryContext.Provider>
  )
}

export default ErrorBoundary;
