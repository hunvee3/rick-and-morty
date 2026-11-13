import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import CharacterList from './features/characters/components/CharactersList'

const queryClient = new QueryClient()

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: { palette: { primary: { main: '#3f8f29' } } },
    dark: { palette: { primary: { main: '#97ce4c' } } },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CharacterList />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
