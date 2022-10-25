import { useState } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import './Login.css';

// @ts-ignore
export default function Login() {    
    const { onLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await onLogin({email, password});
    };
    return (
        <div className="login-wrapper container mx-auto">
            <div className="columns-1 p-3">
                <h1 className='text-3xl mb-6'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label>
                            <p>Email</p>
                            <input
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label>
                            <p>Password</p>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>
                    <div className='pt-4 text-center'>
                        <button type="submit" className="btn btn-primary w-full">
                            Submit
                        </button>
                    </div>
                </form>
                <div className='pt-4 text-center'>
                    <a href="/signup" className='btn btn-sm btn-secondary'>Sign Up</a>
                </div>
            </div>
        </div>
    );
}
