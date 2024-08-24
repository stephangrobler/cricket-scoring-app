import './App.css';

import { AuthProvider, useAuth } from './contexts/AuthProvider';
import Sidebar from './components/Sidebar/Sidebar';

function App() {    
   

    return (
        <>
            <AuthProvider>                
                    <Sidebar  />
            </AuthProvider>
        </>
    );
}

export default App;
