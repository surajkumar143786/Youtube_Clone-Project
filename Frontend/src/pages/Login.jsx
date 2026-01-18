import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/auth/login", { email, password });
            login(res.data.user, res.data.token);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <form
                onSubmit={handleLogin}
                className="bg-zinc-900 p-8 rounded-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>

                {error && <p className="text-red-500 mb-3">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-3 py-2 bg-zinc-800 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-3 py-2 bg-zinc-800 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-blue-600 py-2 rounded font-semibold">
                    Sign In
                </button>

                <p className="text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-500">
                        Create account
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
