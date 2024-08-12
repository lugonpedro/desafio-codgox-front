import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import SignIn from './pages/SignIn';
import Todo from './pages/Todo';
import { CssBaseline } from '@mui/material';
import { UserProvider } from './contexts/UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <UserProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
