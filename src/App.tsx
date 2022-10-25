import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import AppTabsComponent from './components/AppTabsComponent';
import { AuthProvider } from './contexts/AuthProvider';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
   
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/app"
                        element={
                            <ProtectedRoute>
                                <AppTabsComponent />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
