import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Supabase } from '../api/supabase';


export interface IAuthProvider {
    token: null;
    onLogin: (arg0: { email: string; password: string }) => Promise<void>;
    onLogout: () => void;
    checkAuth: () => Promise<any>;
}
const AuthContext = createContext<IAuthProvider | null>(null);

// @ts-ignore
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setToken(foundUser);
        }
    }, []);
    
    const handleLogin = async (arg0: { email: string; password: string }) => {
        //   const token = await fakeAuth();
        const base = new Supabase();
        const response = await base.signInWithPassword({ email: arg0.email, password: arg0.password });
        localStorage.setItem('user', JSON.stringify(response));
        console.log(response);
        setToken(response);
        navigate('/app');
    };

    const handleLogout = () => {
        setToken(null);
    };

    const checkAuth = async () => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setToken(foundUser);
        }
        return token
    };   

    const value: IAuthProvider = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
        checkAuth
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext) as IAuthProvider;
};

export { AuthProvider, AuthContext, useAuth };
