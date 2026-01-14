import { useState } from "react";
import { loginUser } from "../services/authService";

/*Login Component -- Displays login form UI*/
function Login() {
    //// Stores login form data
    const [formData,setFormData] = useState({
        email: "",
        password:"",
    })
    //Updates form data when user types
    function handleChange(e){
        setFormData({
            ...formData,[e.target.name]:e.target.value
        })
    }
    //Sends login request to backend -- Stores JWT token on success
    async function handleLogin(){
        try{
            const data = await loginUser(formData)
            // Save token in localStorage
            localStorage.setItem("token",data.token)
            alert("login successful")
        }catch(err){
            alert(err.response?.data?.message || "login failed")
        }
    }
    
    return (
        <div className="max-w-md mx-auto mt-10 border rounded-lg p-6">

            <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>

            {/* Email Input */}
            <input
                type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}  className="w-full mb-3 px-3 py-2 border rounded-lg outline-none"/>

            {/* Password Input */}
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded-lg outline-none"/>

            {/* Sign In Button */}
            <button onClick={handleLogin} className="w-full py-2 bg-blue-600 text-white rounded-lg">Sign In</button>

            {/* Register Redirect */}
            <p className="text-sm text-center mt-4">Don't have an account?{" "}
                <span className="text-blue-600 cursor-pointer">Register</span>
            </p>

        </div>
    );
}

export default Login;
