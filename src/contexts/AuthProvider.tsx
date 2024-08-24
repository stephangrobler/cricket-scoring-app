import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../api/supabaseClient';


export interface IAuthProvider {
    session: Session | null;
    user: User | null | undefined;
    onLogin: (arg0: { email: string; password: string }) => Promise<void>;
    onLogout: () => void;
    checkAuth: () => Promise<any>;
}
const AuthContext = createContext<IAuthProvider | null>(null);

// @ts-ignore
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | null | undefined>(null);
    const [session, setSession] = useState<Session | null>(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const session = supabase.auth.session();
        setSession(session);
    
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
    }, []);


    const handleLogin = async (arg0: { email: string; password: string }) => {
        
        const response = await supabase.auth.signIn({ email: arg0.email, password: arg0.password });
        if (!response.error){
            localStorage.setItem('session', JSON.stringify(response));
            setSession(response.session);
            navigate('/app');
        } else {
            console.log(response);
            alert(response.error.message);
        }
    };

    const handleLogout = () => {
        setSession(null);
    };

    const checkAuth = async () => {
         
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setSession(foundUser);
        }
        return session
    };   

    const value: IAuthProvider = {
        session,
        user,
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
