import { useState } from 'react';
import { Supabase } from '../../api/supabase';

// @ts-ignore
export default function SignUp() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const base = new Supabase();
        const response = await base.signUp({ email: username, password });
        console.log(response);
    };
    return (
        <div className="login-wrapper container mx-auto">
            <div className="columns-1 p-3">
                <h1 className="text-3xl mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span>Username</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span>Password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span>Confirm Password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className='pt-4'>
                        <button type="submit" className='btn btn-primary w-full'>Submit</button>
                    </div>
                </form>
                <div className="pt-4 text-center">
                    <a href="/login" className='btn btn-sm btn-secondary'>Back to login</a>
                </div>
            </div>
        </div>
    );
}
