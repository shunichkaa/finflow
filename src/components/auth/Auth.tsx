import {useState} from 'react';
import {supabase} from '../../lib/supabaseClient.ts';

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const {error} = await supabase.auth.signInWithPassword({email, password});
        if (error) setError(error.message);
        setLoading(false);
    };

    const handleSignup = async () => {
        setLoading(true);
        setError('');
        const {error} = await supabase.auth.signUp({email, password});
        if (error) setError(error.message);
        setLoading(false);
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-3 w-64 mx-auto mt-10">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border p-2 rounded"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white rounded p-2"
            >
                {loading ? 'Вход...' : 'Войти'}
            </button>
            <button
                type="button"
                onClick={handleSignup}
                className="text-sm text-gray-600 underline"
            >
                Зарегистрироваться
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
    );
};