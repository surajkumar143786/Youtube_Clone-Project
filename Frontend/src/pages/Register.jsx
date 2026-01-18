import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleRegister(e) {
        e.preventDefault();
        try {
            await axiosInstance.post("/auth/register", formData);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <form
                onSubmit={handleRegister}
                className="bg-zinc-900 p-8 rounded-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

                {error && <p className="text-red-500 mb-3">{error}</p>}

                <input
                    name="userName"
                    placeholder="Username"
                    className="w-full mb-4 px-3 py-2 bg-zinc-800 rounded"
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-3 py-2 bg-zinc-800 rounded"
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-3 py-2 bg-zinc-800 rounded"
                    onChange={handleChange}
                />

                <button className="w-full bg-green-600 py-2 rounded font-semibold">
                    Register
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500">
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
