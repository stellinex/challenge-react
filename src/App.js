import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Tamboon from './Tamboon'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    height: 100vh;
    letter-spacing: 0.5px;
    font-family: 'DM Sans', sans-serif;
  }

  button {
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
  }
`

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Tamboon />
    </QueryClientProvider>
  )
}

export default App
