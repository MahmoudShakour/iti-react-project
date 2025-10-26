import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NoteProvider } from './context/NoteContext';
import { TodoProvider } from './context/TodoContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserDetail from './components/UserDetail';

const queryClient = new QueryClient();

function AppRoutes() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <NoteProvider>
                    <TodoProvider>
                        <Router>
                            <AppRoutes />
                        </Router>
                    </TodoProvider>
                </NoteProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;