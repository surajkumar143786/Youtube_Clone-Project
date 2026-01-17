import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../assets/context/AuthContext";

/*
  Login Component
  - Handles user login
  - Updates AuthContext
  - Redirects to home after success
*/
function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { login } = useAuth(); // 👈 MOST IMPORTANT

    // Updates form data
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    // Sends login request to backend
    async function handleLogin(e) {
        e.preventDefault();

        try {
            const data = await loginUser(formData);

            /*
              EXPECTED backend response:
              {
                token: "...",
                user: { username, email, ... }
              }
            */

            // 👇 THIS FIXES EVERYTHING
            login(data); // sets user + token in context

            alert("Login successful");

            // 👇 redirect to videos page
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "login failed");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 border rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Sign In
            </h1>

            <form onSubmit={handleLogin}>
                {/* Email */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-3 px-3 py-2 border rounded-lg outline-none"
                    required
                />

                {/* Password */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mb-4 px-3 py-2 border rounded-lg outline-none"
                    required
                />

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-lg"
                >
                    Sign In
                </button>
            </form>

            {/* Register */}
            <p className="text-sm text-center mt-4">
                Don't have an account?{" "}
                <span
                    onClick={() => navigate("/register")}
                    className="text-blue-600 cursor-pointer"
                >
                    Register
                </span>
            </p>
        </div>
    );
}

export default Login;
